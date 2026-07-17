import fs from 'node:fs';
import { relative } from 'node:path';
import { analyzeSource } from './index.js';

export function create({ files = [], plugins = [], context = {} }) {
  const customElementsManifest = {
    schemaVersion: '1.0.0',
    readme: '',
    modules: [],
  };

  const dev = context.dev || false;

  // 1. Initialize Plugins
  plugins.forEach(plugin => {
    if (plugin.initialize) {
      try {
        plugin.initialize({ ts: null, customElementsManifest, context });
      } catch (e) {
        if (dev) console.error(`Error in plugin ${plugin.name} initialize:`, e);
      }
    }
  });

  // 2. Parse all files using Rust core
  files.forEach(filePath => {
    const relativePath = relative(process.cwd(), filePath);
    if (dev) {
      console.log(`[cem-oxc] Parsing ${relativePath}`);
    }

    try {
      const source = fs.readFileSync(filePath, 'utf8');
      const declarations = JSON.parse(analyzeSource(source, filePath));

      const moduleDoc = {
        kind: 'javascript-module',
        path: relativePath,
        declarations: declarations,
        exports: [],
      };

      // Auto-populate exports for exported custom elements/classes
      declarations.forEach(decl => {
        if (decl.name) {
          moduleDoc.exports.push({
            kind: 'js',
            name: decl.name,
            declaration: {
              name: decl.name,
              module: relativePath.startsWith('.') || relativePath.startsWith('/') ? relativePath : `./${relativePath}`
            }
          });
        }
      });

      customElementsManifest.modules.push(moduleDoc);
    } catch (e) {
      console.error(`[cem-oxc] Error parsing file ${relativePath}:`, e);
    }
  });

  // 3. Module Link Phase
  customElementsManifest.modules.forEach(moduleDoc => {
    plugins.forEach(plugin => {
      if (plugin.moduleLinkPhase) {
        try {
          plugin.moduleLinkPhase({ ts: null, moduleDoc, context });
        } catch (e) {
          if (dev) console.error(`Error in plugin ${plugin.name} moduleLinkPhase:`, e);
        }
      }
    });
  });

  // 4. Package Link Phase
  plugins.forEach(plugin => {
    if (plugin.packageLinkPhase) {
      try {
        plugin.packageLinkPhase({ customElementsManifest, context });
      } catch (e) {
        if (dev) console.error(`Error in plugin ${plugin.name} packageLinkPhase:`, e);
      }
    }
  });

  return customElementsManifest;
}
