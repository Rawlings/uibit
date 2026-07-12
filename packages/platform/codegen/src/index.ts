#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { reactPlugin } from './templates/react.js';
import { vuePlugin } from './templates/vue.js';
import { sveltePlugin } from './templates/svelte.js';
import { angularPlugin } from './templates/angular.js';
import { solidPlugin } from './templates/solid.js';
import { astroPlugin } from './templates/astro.js';
import { qwikPlugin } from './templates/qwik.js';
import { nuxtPlugin } from './templates/nuxt.js';
import { preactPlugin } from './templates/preact.js';
import { stencilPlugin } from './templates/stencil.js';

import type { ComponentMetadata } from './core/types.js';
import { resolveExportedTypes } from './core/parser.js';

const plugins = [
  reactPlugin,
  vuePlugin,
  sveltePlugin,
  angularPlugin,
  solidPlugin,
  astroPlugin,
  qwikPlugin,
  nuxtPlugin,
  preactPlugin,
  stencilPlugin
];

function run() {
  const args = process.argv.slice(2);
  const pkgIndex = args.indexOf('--package');
  const pkgDir = pkgIndex !== -1 ? args[pkgIndex + 1] : '.';

  if (!pkgDir) {
    console.error('Error: Please specify a package directory path.');
    process.exit(1);
  }

  const absolutePkgDir = path.resolve(pkgDir);
  const cemPath = path.join(absolutePkgDir, 'custom-elements.json');

  if (!fs.existsSync(cemPath)) {
    console.error(`Error: custom-elements.json not found at ${cemPath}. Run "npm run analyze" first.`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(cemPath, 'utf-8'));
  const components: ComponentMetadata[] = [];

  const pkgJsonPath = path.join(absolutePkgDir, 'package.json');
  let detectedImportPath = '';
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
      if (pkgJson.name) {
        detectedImportPath = pkgJson.name;
      }
    } catch (e) {}
  }

  const importPathIndex = args.indexOf('--import-path');
  const importPath = importPathIndex !== -1 ? args[importPathIndex + 1] : (detectedImportPath || '../../index.js');

  // Extract exported types using TypeScript compiler AST parsing
  const srcDir = path.join(absolutePkgDir, 'src');
  const exportedTypes = resolveExportedTypes(srcDir);

  for (const module of manifest.modules || []) {
    for (const declaration of module.declarations || []) {
      if (declaration.customElement) {
        const properties = (declaration.members || [])
          .filter((m: any) => m.kind === 'field' && m.privacy !== 'private' && !m.static && !m.readonly)
          .map((m: any) => ({
            name: m.name,
            type: m.type,
            description: m.description,
            default: m.default,
            readonly: m.readonly
          }));
        
        const attributes = declaration.attributes || [];
        const events = declaration.events || [];
        const slots = declaration.slots || [];
        const mixins = declaration.mixins || [];
        const formAssociated = declaration.formAssociated === true || mixins.some((m: any) => m.name === 'FormAssociatedMixin');

        // Identify which exported types are actually used by properties/attributes/events
        const referencedTypes = Array.from(exportedTypes).filter(typeName => {
          const usesType = properties.some((p: any) => p.type?.text?.includes(typeName)) ||
                           attributes.some((a: any) => a.type?.text?.includes(typeName)) ||
                           events.some((e: any) => e.type?.text?.includes(typeName));
          // Make sure we don't import the class name itself!
          return usesType && typeName !== declaration.name;
        });

        components.push({
          name: declaration.name,
          tagName: declaration.tagName,
          properties,
          events,
          attributes,
          slots,
          referencedTypes,
          mixins,
          formAssociated,
          importPath
        });
      }
    }
  }

  if (components.length === 0) {
    console.log('No custom elements found in custom-elements.json.');
    return;
  }

  console.log(`Found ${components.length} component(s). Generating wrappers...`);

  for (const component of components) {
    for (const plugin of plugins) {
      const outputDir = path.join(absolutePkgDir, 'dist', 'frameworks', plugin.name);
      fs.mkdirSync(outputDir, { recursive: true });

      const files = plugin.generate(component);
      for (const [filename, content] of Object.entries(files)) {
        const filePath = path.join(outputDir, filename);
        fs.writeFileSync(filePath, content, 'utf-8');
      }
    }
  }

  console.log('Wrappers successfully generated in dist/frameworks/');
}

// Check if running as a CLI
if (import.meta.url.startsWith('file:')) {
  const modulePath = path.resolve(process.argv[1] || '');
  const currentPath = path.resolve(new URL(import.meta.url).pathname);
  if (modulePath === currentPath || modulePath.endsWith('uibit-codegen') || modulePath.endsWith('index.js')) {
    run();
  }
}
