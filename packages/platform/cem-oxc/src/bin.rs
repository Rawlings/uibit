use std::env;
use std::fs;
use std::path::Path;
use glob::glob;
use serde_json::{json, Value};

mod create;
mod features;
mod utils;

fn main() {
  let args: Vec<String> = env::args().collect();

  let mut globs = Vec::new();
  let mut exclude = Vec::new();
  let mut outdir = ".".to_string();
  let mut quiet = false;

  let mut i = 1;
  while i < args.len() {
    match args[i].as_str() {
      "--globs" => {
        if i + 1 < args.len() {
          globs.push(args[i + 1].clone());
          i += 2;
        } else {
          i += 1;
        }
      }
      "--exclude" => {
        if i + 1 < args.len() {
          exclude.push(args[i + 1].clone());
          i += 2;
        } else {
          i += 1;
        }
      }
      "--outdir" => {
        if i + 1 < args.len() {
          outdir = args[i + 1].clone();
          i += 2;
        } else {
          i += 1;
        }
      }
      "--quiet" => {
        quiet = true;
        i += 1;
      }
      _ => {
        i += 1;
      }
    }
  }

  if globs.is_empty() {
    globs.push("**/*.{js,ts}".to_string());
  }
  if exclude.is_empty() {
    exclude.push("**/node_modules/**".to_string());
    exclude.push("**/dist/**".to_string());
    exclude.push("**/build/**".to_string());
  }

  let mut matched_files = Vec::new();
  for pattern in &globs {
    if let Ok(entries) = glob(pattern) {
      for entry in entries {
        if let Ok(path) = entry {
          if path.is_file() {
            let path_str = path.to_string_lossy().to_string();
            // Check if matches any exclude pattern
            let is_excluded = exclude.iter().any(|ex| {
              let ex_pattern = ex.replace("**/", "").replace("/**", "");
              path_str.contains(&ex_pattern)
            });
            if !is_excluded {
              matched_files.push(path);
            }
          }
        }
      }
    }
  }

  matched_files.sort();
  matched_files.dedup();

  let mut modules = Vec::new();

  for file_path in matched_files {
    if let Ok(source) = fs::read_to_string(&file_path) {
      let path_str = file_path.to_string_lossy().replace('\\', "/");
      let declarations_str = create::analyze_source(&source, &path_str);
      let declarations: Value = serde_json::from_str(&declarations_str).unwrap_or(json!([]));

      let mut exports = Vec::new();
      if let Some(arr) = declarations.as_array() {
        for decl in arr {
          if let Some(name) = decl.get("name").and_then(|n| n.as_str()) {
            exports.push(json!({
              "kind": "js",
              "name": name,
              "declaration": {
                "name": name,
                "module": format!("./{}", path_str)
              }
            }));

            if let Some(tag_name) = decl.get("tag_name").and_then(|t| t.as_str()) {
              exports.push(json!({
                "kind": "custom-element-definition",
                "name": tag_name,
                "declaration": {
                  "name": name,
                  "module": format!("./{}", path_str)
                }
              }));
            }
          }
        }
      }

      modules.push(json!({
        "kind": "javascript-module",
        "path": path_str,
        "declarations": declarations,
        "exports": exports,
      }));
    }
  }

  let manifest = json!({
    "schemaVersion": "1.0.0",
    "readme": "",
    "modules": modules,
  });

  let output_dir = Path::new(&outdir);
  if !output_dir.exists() {
    let _ = fs::create_dir_all(output_dir);
  }

  let output_path = output_dir.join("custom-elements.json");
  if let Ok(json_str) = serde_json::to_string_pretty(&manifest) {
    if fs::write(&output_path, json_str).is_ok() {
      if !quiet {
        println!("[cem-oxc] Created Custom Elements Manifest in {}", output_path.to_string_lossy());
      }
    }
  }
}
