import fs from 'node:fs';
import path from 'node:path';
import swc from '@swc/core';

/**
 * Scans the src directory of a component, parses its TypeScript source files into ASTs
 * using @swc/core, and extracts the names of all exported types (interfaces, type aliases, enums, classes).
 */
export function resolveExportedTypes(srcDirPath: string): Set<string> {
  const exportedTypes = new Set<string>();

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (
        entry.isFile() &&
        entry.name.endsWith('.ts') &&
        !entry.name.endsWith('.d.ts') &&
        !entry.name.endsWith('.test.ts')
      ) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const ast = swc.parseSync(content, {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
            comments: false,
            target: 'es2022',
          });

          for (const node of ast.body || []) {
            if (node.type === 'ExportDeclaration') {
              const decl = node.declaration;
              if (decl) {
                if (
                  decl.type === 'ClassDeclaration' ||
                  decl.type === 'FunctionDeclaration'
                ) {
                  if (
                    decl.identifier &&
                    typeof decl.identifier.value === 'string'
                  ) {
                    exportedTypes.add(decl.identifier.value);
                  }
                } else if (
                  decl.type === 'TsInterfaceDeclaration' ||
                  decl.type === 'TsTypeAliasDeclaration' ||
                  decl.type === 'TsEnumDeclaration'
                ) {
                  if (decl.id && typeof decl.id.value === 'string') {
                    exportedTypes.add(decl.id.value);
                  }
                }
              }
            } else if (node.type === 'ExportNamedDeclaration') {
              if (node.specifiers) {
                for (const specifier of node.specifiers) {
                  if (specifier.type === 'ExportSpecifier') {
                    const name =
                      specifier.exported?.value || specifier.orig.value;
                    if (typeof name === 'string') {
                      exportedTypes.add(name);
                    }
                  }
                }
              }
            } else if (node.type === 'ExportDefaultDeclaration') {
              const decl = (node as any).decl;
              if (decl) {
                if (
                  decl.type === 'ClassDeclaration' ||
                  decl.type === 'FunctionDeclaration'
                ) {
                  if (
                    decl.identifier &&
                    typeof decl.identifier.value === 'string'
                  ) {
                    exportedTypes.add(decl.identifier.value);
                  }
                } else if (decl.id && typeof decl.id.value === 'string') {
                  exportedTypes.add(decl.id.value);
                }
              }
            }
          }
        } catch (e) {
          console.warn(`Warning: failed to parse ${entry.name}:`, e);
        }
      }
    }
  }

  scanDir(srcDirPath);
  return exportedTypes;
}

/**
 * Scans the src directory, parses TypeScript source files, and extracts the actual
 * default initializer strings for class properties directly from the AST.
 */
export function resolveSourceDefaults(
  srcDirPath: string,
): Record<string, Record<string, string>> {
  const allDefaults: Record<string, Record<string, string>> = {};

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (
        entry.isFile() &&
        entry.name.endsWith('.ts') &&
        !entry.name.endsWith('.d.ts') &&
        !entry.name.endsWith('.test.ts')
      ) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const ast = swc.parseSync(content, {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
            comments: false,
            target: 'es2022',
          });

          for (const node of ast.body || []) {
            let classDecl = null;
            if (node.type === 'ClassDeclaration') {
              classDecl = node;
            } else if (
              node.type === 'ExportDeclaration' &&
              node.declaration?.type === 'ClassDeclaration'
            ) {
              classDecl = node.declaration;
            } else if (
              node.type === 'ExportDefaultDeclaration' &&
              ((node as any).decl?.type === 'ClassExpression' ||
                (node as any).decl?.type === 'ClassDeclaration')
            ) {
              classDecl = (node as any).decl;
            }

            if (classDecl && (classDecl as any).identifier?.value) {
              const className = (classDecl as any).identifier.value;
              const defaults: Record<string, string> = {};

              for (const member of classDecl.body || []) {
                if (member.type === 'ClassProperty' && member.value) {
                  const propName = (member.key as any)?.value;
                  if (propName) {
                    const tempModule = {
                      type: 'Module',
                      span: { start: 0, end: 0 },
                      body: [
                        {
                          type: 'ExpressionStatement',
                          span: { start: 0, end: 0 },
                          expression: member.value,
                        },
                      ],
                      interpreter: null,
                    };
                    const printed = swc
                      .printSync(tempModule as any, { minify: false })
                      .code.trim();
                    const defaultValue = printed.endsWith(';')
                      ? printed.slice(0, -1).trim()
                      : printed;
                    defaults[propName] = defaultValue;
                  }
                }
              }
              allDefaults[className] = defaults;
            }
          }
        } catch (_e) {
          // Ignore parse errors on individual files
        }
      }
    }
  }

  scanDir(srcDirPath);
  return allDefaults;
}
