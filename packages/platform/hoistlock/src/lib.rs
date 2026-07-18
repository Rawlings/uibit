use std::collections::{HashMap, HashSet};
use std::path::{Path, PathBuf};
use std::fs;
use serde::{Deserialize, Serialize};

use oxc_allocator::Allocator;
use oxc_parser::Parser;
use oxc_span::SourceType;
use oxc_ast::ast::{
  ImportDeclaration, ImportExpression, ExportAllDeclaration, ExportNamedDeclaration,
  ModuleExportName
};
use oxc_ast::Visit;
use oxc_resolver::{Resolver, ResolveOptions, TsconfigOptions, TsconfigReferences};

use napi_derive::napi;

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
#[napi(object)]
pub struct HoistlockConfig {
  pub entry: String,
  pub tsconfig: Option<String>,
  pub exclude: Option<Vec<String>>,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct ImportedSymbol {
  pub name: String,
}

#[derive(Debug, Clone)]
pub struct StaticImport {
  pub specifier: String,
  pub resolved_path: Option<PathBuf>,
  pub symbols: Vec<ImportedSymbol>,
  pub is_reexport: bool,
}

#[derive(Debug, Clone)]
pub struct DynamicImport {
  pub specifier: String,
  pub resolved_path: Option<PathBuf>,
}

#[derive(Debug, Clone)]
pub struct ParsedFile {
  pub path: PathBuf,
  pub static_imports: Vec<StaticImport>,
  pub dynamic_imports: Vec<DynamicImport>,
  pub is_barrel: bool,
  pub defined_exports: HashSet<String>,
}

// AST Visitor to collect imports and exports
struct ImportExportCollector {
  static_imports: Vec<StaticImport>,
  dynamic_imports: Vec<DynamicImport>,
  defined_exports: HashSet<String>,
}

impl<'a> Visit<'a> for ImportExportCollector {
  fn visit_import_declaration(&mut self, decl: &ImportDeclaration<'a>) {
    let specifier = decl.source.value.to_string();
    let mut symbols = Vec::new();
    if let Some(specifiers) = &decl.specifiers {
      for spec in specifiers {
        match spec {
          oxc_ast::ast::ImportDeclarationSpecifier::ImportSpecifier(s) => {
            let name = match &s.imported {
              ModuleExportName::Identifier(id) => id.name.to_string(),
              ModuleExportName::StringLiteral(sl) => sl.value.to_string(),
            };
            symbols.push(ImportedSymbol { name });
          }
          oxc_ast::ast::ImportDeclarationSpecifier::ImportDefaultSpecifier(_) => {
            symbols.push(ImportedSymbol { name: "default".to_string() });
          }
          oxc_ast::ast::ImportDeclarationSpecifier::ImportNamespaceSpecifier(_) => {
            symbols.push(ImportedSymbol { name: "*".to_string() });
          }
        }
      }
    }
    self.static_imports.push(StaticImport {
      specifier,
      resolved_path: None,
      symbols,
      is_reexport: false,
    });
  }

  fn visit_export_all_declaration(&mut self, decl: &ExportAllDeclaration<'a>) {
    let specifier = decl.source.value.to_string();
    self.static_imports.push(StaticImport {
      specifier,
      resolved_path: None,
      symbols: vec![ImportedSymbol { name: "*".to_string() }],
      is_reexport: true,
    });
  }

  fn visit_export_named_declaration(&mut self, decl: &ExportNamedDeclaration<'a>) {
    if let Some(source) = &decl.source {
      let specifier = source.value.to_string();
      let mut symbols = Vec::new();
      for spec in &decl.specifiers {
        // `spec.local` is the name as it exists in the *source* module;
        // `spec.exported` is the public name callers actually import (they
        // can differ: `export { a as b } from './x'`). trace_symbol_source
        // matches against the publicly-requested name, so that's what needs
        // to be recorded here — using `local` made renamed re-exports
        // untraceable, silently breaking hoisting-leak detection for them.
        let name = match &spec.exported {
          ModuleExportName::Identifier(id) => id.name.to_string(),
          ModuleExportName::StringLiteral(sl) => sl.value.to_string(),
        };
        symbols.push(ImportedSymbol { name });
      }
      self.static_imports.push(StaticImport {
        specifier,
        resolved_path: None,
        symbols,
        is_reexport: true,
      });
    } else {
      // Local exports (e.g. `export { a as b }`) — same distinction as above:
      // `defined_exports` must hold the public name, not the local binding.
      for spec in &decl.specifiers {
        let name = match &spec.exported {
          ModuleExportName::Identifier(id) => id.name.to_string(),
          ModuleExportName::StringLiteral(sl) => sl.value.to_string(),
        };
        self.defined_exports.insert(name);
      }
      if let Some(decl_stmt) = &decl.declaration {
        // Collect defined names from declarations
        // Simple heuristic for common declaration names
        match decl_stmt {
          oxc_ast::ast::Declaration::VariableDeclaration(vd) => {
            for decl in &vd.declarations {
              if let oxc_ast::ast::BindingPatternKind::BindingIdentifier(bi) = &decl.id.kind {
                self.defined_exports.insert(bi.name.to_string());
              }
            }
          }
          oxc_ast::ast::Declaration::FunctionDeclaration(fd) => {
            if let Some(id) = &fd.id {
              self.defined_exports.insert(id.name.to_string());
            }
          }
          oxc_ast::ast::Declaration::ClassDeclaration(cd) => {
            if let Some(id) = &cd.id {
              self.defined_exports.insert(id.name.to_string());
            }
          }
          _ => {}
        }
      }
    }
  }

  fn visit_import_expression(&mut self, expr: &ImportExpression<'a>) {
    if let oxc_ast::ast::Expression::StringLiteral(sl) = &expr.source {
      self.dynamic_imports.push(DynamicImport {
        specifier: sl.value.to_string(),
        resolved_path: None,
      });
    }
  }
}

// Module Graph Tracing engine
pub struct GraphBuilder {
  resolver: Resolver,
  pub files: HashMap<PathBuf, ParsedFile>,
  exclude_patterns: Vec<String>,
}

impl GraphBuilder {
  pub fn new(tsconfig_path: Option<&str>, exclude: Option<Vec<String>>) -> Self {
    let mut options = ResolveOptions {
      extensions: vec![
        ".ts".to_string(),
        ".tsx".to_string(),
        ".js".to_string(),
        ".jsx".to_string(),
        ".json".to_string(),
      ],
      ..ResolveOptions::default()
    };

    if let Some(tsconfig) = tsconfig_path {
      options.tsconfig = Some(TsconfigOptions {
        config_file: PathBuf::from(tsconfig),
        references: TsconfigReferences::Disabled,
      });
    }

    let resolver = Resolver::new(options);

    Self {
      resolver,
      files: HashMap::new(),
      exclude_patterns: exclude.unwrap_or_default(),
    }
  }

  pub fn is_excluded(&self, path: &Path) -> bool {
    let path_str = path.to_string_lossy();
    for pattern in &self.exclude_patterns {
      let parts: Vec<&str> = pattern.split('*').filter(|s| !s.is_empty()).collect();
      let mut current_idx = 0;
      let mut matched = true;
      for part in parts {
        let clean_part = part.trim_start_matches('/').trim_end_matches('/');
        if clean_part.is_empty() {
          continue;
        }
        if let Some(idx) = path_str[current_idx..].find(clean_part) {
          current_idx += idx + clean_part.len();
        } else {
          matched = false;
          break;
        }
      }
      if matched {
        return true;
      }
    }
    false
  }

  // Parse a file and recursively analyze its imports
  pub fn analyze_file(&mut self, file_path: &Path) {
    self.analyze_file_at_depth(file_path, 0);
  }

  // A long linear import chain (tens of thousands of auto-generated files
  // each importing the next, or a similarly deep dependency chain in
  // node_modules) recurses through ordinary Rust function calls with no
  // depth limit, growing the native stack unbounded and crashing the
  // process with a stack overflow — an abrupt abort, not a catchable error.
  // Import cycles are already handled safely (a file is registered in
  // `self.files` before recursing into its imports, so a cycle just stops),
  // but a long *non-cyclic* chain isn't. This cap only matters for
  // pathologically deep chains; any real project's import graph is nowhere
  // near it.
  const MAX_ANALYZE_DEPTH: usize = 512;

  fn analyze_file_at_depth(&mut self, file_path: &Path, depth: usize) {
    if depth > Self::MAX_ANALYZE_DEPTH {
      return;
    }

    let canonical_path = match fs::canonicalize(file_path) {
      Ok(p) => p,
      Err(_) => file_path.to_path_buf(),
    };

    if self.files.contains_key(&canonical_path) || self.is_excluded(&canonical_path) {
      return;
    }

    // Resolution can land on something other than a regular file (a named
    // pipe, a device file, reached via a symlink) — `read_to_string` on a
    // FIFO blocks indefinitely waiting for a writer, and on a device like
    // `/dev/zero` can read unboundedly. Skip anything that isn't a plain file.
    match fs::metadata(&canonical_path) {
      Ok(meta) if meta.is_file() => {}
      _ => return,
    }

    let source_code = match fs::read_to_string(&canonical_path) {
      Ok(code) => code,
      Err(_) => return,
    };

    let allocator = Allocator::default();
    let source_type = SourceType::from_path(&canonical_path).unwrap_or_default();
    let parser = Parser::new(&allocator, &source_code, source_type);
    let parsed = parser.parse();

    let mut collector = ImportExportCollector {
      static_imports: Vec::new(),
      dynamic_imports: Vec::new(),
      defined_exports: HashSet::new(),
    };

    collector.visit_program(&parsed.program);

    let parent_dir = canonical_path.parent().unwrap_or_else(|| Path::new("."));

    // Resolve static imports
    let mut resolved_static_imports = Vec::new();
    for mut imp in collector.static_imports {
      if let Ok(res) = self.resolver.resolve(parent_dir, &imp.specifier) {
        let path = res.path().to_path_buf();
        imp.resolved_path = Some(path.clone());
        resolved_static_imports.push(imp);
      }
    }

    // Resolve dynamic imports
    let mut resolved_dynamic_imports = Vec::new();
    for mut imp in collector.dynamic_imports {
      if let Ok(res) = self.resolver.resolve(parent_dir, &imp.specifier) {
        let path = res.path().to_path_buf();
        imp.resolved_path = Some(path.clone());
        resolved_dynamic_imports.push(imp);
      }
    }

    // Heuristic: file is a barrel file if it consists entirely of re-exports
    let is_barrel = resolved_static_imports.iter().any(|imp| imp.is_reexport)
      && collector.defined_exports.is_empty();

    let parsed_file = ParsedFile {
      path: canonical_path.clone(),
      static_imports: resolved_static_imports,
      dynamic_imports: resolved_dynamic_imports,
      is_barrel,
      defined_exports: collector.defined_exports,
    };

    self.files.insert(canonical_path, parsed_file.clone());

    // Recursively parse resolved imports
    for imp in &parsed_file.static_imports {
      if let Some(ref path) = imp.resolved_path {
        self.analyze_file_at_depth(path, depth + 1);
      }
    }

    for imp in &parsed_file.dynamic_imports {
      if let Some(ref path) = imp.resolved_path {
        self.analyze_file_at_depth(path, depth + 1);
      }
    }
  }

  // Trace the actual source of a symbol starting from a file (resolving barrel files)
  pub fn trace_symbol_source(&self, start_file: &Path, symbol: &str) -> (PathBuf, String) {
    let mut current_file = start_file.to_path_buf();
    let current_symbol = symbol.to_string();
    let mut visited = HashSet::new();

    while visited.insert((current_file.clone(), current_symbol.clone())) {
      if let Some(file) = self.files.get(&current_file) {
        // If it's defined directly here, we found the source!
        if file.defined_exports.contains(&current_symbol) {
          return (current_file, current_symbol);
        }

        // Trace through re-exports
        let mut resolved_next = false;
        for imp in &file.static_imports {
          if imp.is_reexport {
            if let Some(ref next_path) = imp.resolved_path {
              // Exact match or wildcard re-export
              if imp.symbols.iter().any(|s| s.name == current_symbol) || imp.symbols.iter().any(|s| s.name == "*") {
                current_file = next_path.clone();
                resolved_next = true;
                break;
              }
            }
          }
        }

        if !resolved_next {
          break;
        }
      } else {
        break;
      }
    }

    (current_file, current_symbol)
  }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
#[napi(object)]
pub struct LeakDiagnostic {
  pub file_path: String,
  pub import_path: String,
  pub dynamic_chunk_entry: String,
  pub symbol: String,
}



fn find_package_root(entry_path: &Path) -> Option<PathBuf> {
  let mut current = if entry_path.is_dir() {
    entry_path.to_path_buf()
  } else {
    entry_path.parent()?.to_path_buf()
  };

  loop {
    if current.join("package.json").exists() {
      return Some(current);
    }
    if !current.pop() {
      break;
    }
  }
  None
}

#[napi]
pub fn check_hoisting(config: HoistlockConfig) -> Vec<LeakDiagnostic> {
  let entry_path = Path::new(&config.entry);
  if !entry_path.exists() {
    return Vec::new();
  }

  let mut builder = GraphBuilder::new(config.tsconfig.as_deref(), config.exclude.clone());
  builder.analyze_file(entry_path);

  let canonical_entry = match fs::canonicalize(entry_path) {
    Ok(p) => p,
    Err(_) => entry_path.to_path_buf(),
  };

  let package_root = find_package_root(&canonical_entry);
  let mut dependency_files = HashSet::new();

  // Phase 1: Core Shell Calculation & Main Application Tracing (M)
  // Stops at dynamic import() boundaries, collects Chunk Entry Points,
  // and dynamically identifies Core Routing Files (files containing dynamic imports).
  let mut main_bundle_files = HashSet::new();
  let mut main_bundle_symbols: HashMap<PathBuf, HashSet<String>> = HashMap::new();
  let mut chunk_entry_points = HashSet::new();

  let mut static_edges: HashMap<PathBuf, HashSet<PathBuf>> = HashMap::new();
  let mut reverse_edges: HashMap<PathBuf, HashSet<PathBuf>> = HashMap::new();
  let mut routing_files = HashSet::new();

  let mut queue = vec![canonical_entry.clone()];
  let mut visited = HashSet::new();

  while let Some(current) = queue.pop() {
    if builder.is_excluded(&current) {
      continue;
    }
    if !visited.insert(current.clone()) {
      continue;
    }
    main_bundle_files.insert(current.clone());

    if let Some(file) = builder.files.get(&current) {
      if !file.dynamic_imports.is_empty() {
        routing_files.insert(current.clone());
      }

      // Track all dynamic imports as Chunk Entry Points but do not follow them in Main Application Graph
      for imp in &file.dynamic_imports {
        if let Some(ref path) = imp.resolved_path {
          chunk_entry_points.insert(path.clone());
        }
      }

      for imp in &file.static_imports {
        if let Some(ref path) = imp.resolved_path {
          if imp.is_reexport {
            continue;
          }

          let is_dependency = if let Some(ref root) = package_root {
            !path.starts_with(root) && !imp.specifier.starts_with('.')
          } else {
            false
          };
          if is_dependency {
            dependency_files.insert(path.clone());
          }

          static_edges.entry(current.clone()).or_default().insert(path.clone());
          reverse_edges.entry(path.clone()).or_default().insert(current.clone());

          // Trace symbols to resolve barrel files
          for sym in &imp.symbols {
            let (source_file, source_sym) = builder.trace_symbol_source(path, &sym.name);
            if is_dependency {
              dependency_files.insert(source_file.clone());
            }
            main_bundle_symbols
              .entry(source_file.clone())
              .or_default()
              .insert(source_sym);
            main_bundle_files.insert(source_file.clone());
            queue.push(source_file);
          }
          queue.push(path.clone());
        }
      }
    }
  }

  // Backwards traversal from routing_files to find the Core Baseline Shell
  let mut core_baseline_shell = HashSet::new();
  let mut backward_queue: Vec<PathBuf> = routing_files.into_iter().collect();
  let mut backward_visited = HashSet::new();

  while let Some(current) = backward_queue.pop() {
    if !backward_visited.insert(current.clone()) {
      continue;
    }
    if main_bundle_files.contains(&current) {
      core_baseline_shell.insert(current.clone());
    }
    if let Some(parents) = reverse_edges.get(&current) {
      for parent in parents {
        backward_queue.push(parent.clone());
      }
    }
  }

  // Collect Core Baseline Files and Symbols (only third-party package dependencies)
  let mut core_baseline_files = HashSet::new();
  let mut core_baseline_symbols: HashMap<PathBuf, HashSet<String>> = HashMap::new();

  for core_file in &core_baseline_shell {
    if let Some(file) = builder.files.get(core_file) {
      for imp in &file.static_imports {
        if let Some(ref path) = imp.resolved_path {
          if imp.is_reexport {
            continue;
          }
          let is_dependency = dependency_files.contains(path);
          if is_dependency {
            core_baseline_files.insert(path.clone());
            for sym in &imp.symbols {
              let (source_file, source_sym) = builder.trace_symbol_source(path, &sym.name);
              core_baseline_symbols
                .entry(source_file)
                .or_default()
                .insert(source_sym);
            }
          }
        }
      }
    }
  }

  // Phase 2: Dynamic Chunk Discovery (C)
  let mut dynamic_territories: HashMap<PathBuf, PathBuf> = HashMap::new(); // SourceFile -> ChunkEntry
  let mut dynamic_symbols: HashMap<PathBuf, HashMap<String, PathBuf>> = HashMap::new(); // SourceFile -> Symbol -> ChunkEntry

  for chunk_entry in &chunk_entry_points {
    let mut chunk_queue = vec![chunk_entry.clone()];
    let mut chunk_visited = HashSet::new();

    while let Some(current) = chunk_queue.pop() {
      if builder.is_excluded(&current) {
        continue;
      }
      if !chunk_visited.insert(current.clone()) {
        continue;
      }

      if let Some(file) = builder.files.get(&current) {
        dynamic_territories.insert(current.clone(), chunk_entry.clone());

        for imp in &file.static_imports {
          if let Some(ref path) = imp.resolved_path {
            if imp.is_reexport {
              continue;
            }
            let is_dependency = if let Some(ref root) = package_root {
              !path.starts_with(root) && !imp.specifier.starts_with('.')
            } else {
              false
            };
            if is_dependency {
              dependency_files.insert(path.clone());
            }
            for sym in &imp.symbols {
              let (source_file, source_sym) = builder.trace_symbol_source(path, &sym.name);
              if is_dependency {
                dependency_files.insert(source_file.clone());
              }
              dynamic_symbols
                .entry(source_file.clone())
                .or_default()
                .insert(source_sym, chunk_entry.clone());
              dynamic_territories.insert(source_file.clone(), chunk_entry.clone());
              chunk_queue.push(source_file);
            }
            chunk_queue.push(path.clone());
          }
        }
      }
    }
  }

  // Phase 3: Intersection Audit
  let mut diagnostics = Vec::new();

  // Audit local files for file-level intersection (excluding Core Baseline files)
  for file_path in &main_bundle_files {
    if file_path == &canonical_entry || builder.is_excluded(file_path) {
      continue;
    }
    let is_barrel = builder.files.get(file_path).map(|f| f.is_barrel).unwrap_or(false);
    if is_barrel {
      continue;
    }
    let is_dependency = dependency_files.contains(file_path);
    if !is_dependency {
      if let Some(chunk_entry) = dynamic_territories.get(file_path) {
        // Skip files that belong to the Core Baseline Shell
        if core_baseline_files.contains(file_path) {
          continue;
        }
        let parents = reverse_edges.get(file_path);
        let parent_info = if let Some(parent_set) = parents {
          parent_set.iter()
            .map(|p| p.to_string_lossy().to_string())
            .collect::<Vec<String>>()
            .join(", ")
        } else {
          "static import".to_string()
        };
        diagnostics.push(LeakDiagnostic {
          file_path: file_path.to_string_lossy().to_string(),
          import_path: parent_info,
          dynamic_chunk_entry: chunk_entry.to_string_lossy().to_string(),
          symbol: "*".to_string(),
        });
      }
    }
  }

  // Audit third-party packages for symbol-level intersection
  for (file_path, symbols) in &main_bundle_symbols {
    let is_dependency = dependency_files.contains(file_path);
    if builder.is_excluded(file_path) && !is_dependency {
      continue;
    }
    if is_dependency {
      // If the entire package entry file is already part of the core baseline shell, skip symbol audits
      if core_baseline_files.contains(file_path) {
        continue;
      }
      if let Some(chunk_syms) = dynamic_symbols.get(file_path) {
        for sym in symbols {
          if let Some(chunk_entry) = chunk_syms.get(sym) {
            // Skip symbols that belong to the Core Baseline Shell
            if let Some(baseline_syms) = core_baseline_symbols.get(file_path) {
              if baseline_syms.contains(sym) {
                continue;
              }
            }
            let parents = reverse_edges.get(file_path);
            let parent_info = if let Some(parent_set) = parents {
              parent_set.iter()
                .map(|p| p.to_string_lossy().to_string())
                .collect::<Vec<String>>()
                .join(", ")
            } else {
              "static import".to_string()
            };
            diagnostics.push(LeakDiagnostic {
              file_path: file_path.to_string_lossy().to_string(),
              import_path: parent_info,
              dynamic_chunk_entry: chunk_entry.to_string_lossy().to_string(),
              symbol: sym.clone(),
            });
          }
        }
      }
    }
  }

  diagnostics
}
