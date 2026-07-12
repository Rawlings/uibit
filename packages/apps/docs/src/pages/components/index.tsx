import { ComponentDocData } from '../../types/docs';

const flatModules = import.meta.glob('./*.tsx', { eager: true }) as Record<
  string,
  { default: Partial<ComponentDocData> }
>;

const dirModules = import.meta.glob('./*/index.tsx', { eager: true }) as Record<
  string,
  { default: Partial<ComponentDocData> }
>;

const packageModules = import.meta.glob('../../../../../components/*/package.json', { eager: true }) as Record<
  string,
  {
    default: {
      name: string;
      description: string;
      uibit?: {
        id?: string;
        title?: string;
        category?: string;
        tagName?: string;
      };
    };
  }
>;

const changelogModules = import.meta.glob('../../../../../components/*/CHANGELOG.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const readmeModules = import.meta.glob('../../../../../components/*/README.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const manifestModules = import.meta.glob('../../../../../components/*/custom-elements.json', {
  eager: true,
}) as Record<string, { default: any }>;

export const componentRegistry: Record<string, ComponentDocData> = {};

for (const path in packageModules) {
  const pkg = packageModules[path].default;
  if (pkg.uibit && pkg.uibit.id) {
    const id = pkg.uibit.id;
    const reactModule = flatModules[`./${id}.tsx`]?.default || dirModules[`./${id}/index.tsx`]?.default;

    const changelogPath = path.replace('/package.json', '/CHANGELOG.md');
    const changelog = changelogModules[changelogPath] || '';

    const readmePath = path.replace('/package.json', '/README.md');
    const readme = readmeModules[readmePath] || '';

    const manifestPath = path.replace('/package.json', '/custom-elements.json');
    const manifest = manifestModules[manifestPath]?.default || null;

    componentRegistry[id] = {
      ...reactModule,
      id,
      title: pkg.uibit.title || id,
      description: pkg.description || '',
      packageName: pkg.name,
      tagName: pkg.uibit.tagName || `uibit-${id}`,
      category: pkg.uibit.category || 'Other',
      changelog,
      readme,
      manifest,
    } as ComponentDocData;
  }
}
