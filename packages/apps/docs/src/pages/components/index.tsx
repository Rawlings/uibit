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

export const componentRegistry: Record<string, ComponentDocData> = {};

for (const path in packageModules) {
  const pkg = packageModules[path].default;
  if (pkg.uibit && pkg.uibit.id) {
    const id = pkg.uibit.id;
    const reactModule = flatModules[`./${id}.tsx`]?.default || dirModules[`./${id}/index.tsx`]?.default;
    if (reactModule) {
      const changelogPath = path.replace('/package.json', '/CHANGELOG.md');
      const changelog = changelogModules[changelogPath] || '';

      componentRegistry[id] = {
        ...reactModule,
        id,
        title: pkg.uibit.title || id,
        description: pkg.description || '',
        packageName: pkg.name,
        tagName: pkg.uibit.tagName || `uibit-${id}`,
        category: pkg.uibit.category || 'Other',
        changelog,
      } as ComponentDocData;
    }
  }
}
