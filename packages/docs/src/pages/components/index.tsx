import { ComponentDocData } from '../../types/docs';

const flatModules = import.meta.glob('./*.tsx', { eager: true }) as Record<
  string,
  { default: ComponentDocData }
>;

const dirModules = import.meta.glob('./*/index.tsx', { eager: true }) as Record<
  string,
  { default: ComponentDocData }
>;

export const componentRegistry: Record<string, ComponentDocData> = {};

for (const path in flatModules) {
  const name = path.match(/\.\/(.+)\.tsx$/)?.[1];
  if (name && name !== 'index') {
    componentRegistry[name] = flatModules[path].default;
  }
}

for (const path in dirModules) {
  const name = path.match(/\.\/(.+)\/index\.tsx$/)?.[1];
  if (name) {
    componentRegistry[name] = dirModules[path].default;
  }
}
