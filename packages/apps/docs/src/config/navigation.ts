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

export const ECOSYSTEM: NavigationItem[] = [
  { id: 'codegen', title: 'Codegen', to: '/packages/codegen', category: 'Ecosystem' },
  { id: 'base-class', title: 'Base Class', to: '/packages/base-class', category: 'Ecosystem' },
  { id: 'form-internals', title: 'Form Internals', to: '/packages/form-internals', category: 'Ecosystem' },
  { id: 'hmr', title: 'Vite Plugin WC HMR', to: '/packages/hmr', category: 'Ecosystem' },
  { id: 'cem-extended', title: 'CEM Extended', to: '/packages/cem-extended', category: 'Ecosystem' },
  { id: 'cem-mcp', title: 'CEM MCP Server', to: '/packages/cem-mcp', category: 'Ecosystem' },
  { id: 'cem-oxc', title: 'CEM OXC', to: '/packages/cem-oxc', category: 'Ecosystem' },
  { id: 'hoistlock', title: 'Hoistlock', to: '/packages/hoistlock', category: 'Ecosystem' },
];

export const CATEGORY_ORDER = [
  'Layout',
  'Media',
  'Text',
  'Data',
  'Forms'
];
