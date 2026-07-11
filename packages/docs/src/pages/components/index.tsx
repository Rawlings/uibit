import { ComponentDocData } from '../../types/docs';

const flatModules = import.meta.glob('./*.tsx', { eager: true }) as Record<
  string,
  { default: Partial<ComponentDocData> }
>;

const dirModules = import.meta.glob('./*/index.tsx', { eager: true }) as Record<
  string,
  { default: Partial<ComponentDocData> }
>;

const packageModules = import.meta.glob('../../../../*/package.json', { eager: true }) as Record<
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

export const componentRegistry: Record<string, ComponentDocData> = {};

for (const path in packageModules) {
  const pkg = packageModules[path].default;
  if (pkg.uibit && pkg.uibit.id) {
    const id = pkg.uibit.id;
    const reactModule = flatModules[`./${id}.tsx`]?.default || dirModules[`./${id}/index.tsx`]?.default;
    if (reactModule) {
      componentRegistry[id] = {
        ...reactModule,
        id,
        title: pkg.uibit.title || id,
        description: pkg.description || '',
        packageName: pkg.name,
        tagName: pkg.uibit.tagName || `uibit-${id}`,
        category: pkg.uibit.category || 'Other',
      } as ComponentDocData;
    }
  }
}
