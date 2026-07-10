import fs from 'fs';
import path from 'path';
import { parseSync } from 'oxc-parser';

/**
 * Scans the src directory of a component, parses its TypeScript source files into ASTs
 * using oxc-parser, and extracts the names of all exported types (interfaces, type aliases, enums, classes).
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
          const ast = parseSync(entry.name, content);

          for (const node of (ast.program.body || [])) {
            if (node.type === 'ExportNamedDeclaration') {
              if (node.declaration) {
                const decl = node.declaration as any;
                if (decl.id && typeof decl.id.name === 'string') {
                  exportedTypes.add(decl.id.name);
                }
              }
              if (node.specifiers) {
                for (const specifier of node.specifiers) {
                  const spec = specifier as any;
                  if (spec.exported && typeof spec.exported.name === 'string') {
                    exportedTypes.add(spec.exported.name);
                  }
                }
              }
            } else if (node.type === 'ExportDefaultDeclaration') {
              const decl = node.declaration as any;
              if (decl && decl.id && typeof decl.id.name === 'string') {
                exportedTypes.add(decl.id.name);
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
