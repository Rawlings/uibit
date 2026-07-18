export interface NavigationItem {
  id: string;
  title: string;
  to: string;
  category?: string;
}

export const FOUNDATIONS: NavigationItem[] = [
  { id: 'getting-started', title: 'Installation & Setup', to: '/foundations/getting-started', category: 'Foundations' },
  { id: 'accessibility', title: 'Accessibility', to: '/foundations/accessibility', category: 'Foundations' },
  { id: 'styling', title: 'Styling & Theming', to: '/foundations/styling', category: 'Foundations' },
  { id: 'localization', title: 'Localization', to: '/foundations/localization', category: 'Foundations' },
  { id: 'frameworks', title: 'Framework Integrations', to: '/foundations/frameworks', category: 'Foundations' },
  { id: 'icons', title: 'Icons', to: '/foundations/icons', category: 'Foundations' },
  { id: 'browser-support', title: 'Browser Support', to: '/foundations/browser-support', category: 'Foundations' },
  { id: 'troubleshooting', title: 'Troubleshooting & FAQ', to: '/foundations/troubleshooting', category: 'Foundations' },
];

export const RESOURCES: NavigationItem[] = [
  { id: 'contributing', title: 'Contributing', to: '/resources/contributing', category: 'Resources' },
  { id: 'security', title: 'Security', to: '/resources/security', category: 'Resources' },
  { id: 'coc', title: 'Code of Conduct', to: '/resources/coc', category: 'Resources' },
];

export const TOOLING: NavigationItem[] = [
  { id: 'codegen', title: 'Codegen', to: '/tooling/codegen', category: 'Codegen & Wrappers' },
  { id: 'base-class', title: 'Base Class', to: '/tooling/base-class', category: 'Runtime' },
  { id: 'form-internals', title: 'Form Internals', to: '/tooling/form-internals', category: 'Runtime' },
  { id: 'cem-extended', title: 'CEM Extended', to: '/tooling/cem-extended', category: 'Manifest Tooling' },
  { id: 'cem-mcp', title: 'CEM MCP Server', to: '/tooling/cem-mcp', category: 'Manifest Tooling' },
  { id: 'cem-oxc', title: 'CEM OXC', to: '/tooling/cem-oxc', category: 'Manifest Tooling' },
  { id: 'hmr', title: 'Vite Plugin WC HMR', to: '/tooling/hmr', category: 'Build & Bundling' },
  { id: 'hoistlock', title: 'Hoistlock', to: '/tooling/hoistlock', category: 'Build & Bundling' },
];

export const TOOLING_CATEGORY_ORDER = [
  'Codegen & Wrappers',
  'Runtime',
  'Manifest Tooling',
  'Build & Bundling',
];

export const CATEGORY_ORDER = [
  'Layout',
  'Media',
  'Text',
  'Data',
  'Forms'
];
