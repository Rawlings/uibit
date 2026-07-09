import { ComponentDocData } from '../../types/docs';

const modules = import.meta.glob('./*.tsx', { eager: true }) as Record<
  string,
  { default: ComponentDocData }
>;

export const componentRegistry: Record<string, ComponentDocData> = {};

for (const path in modules) {
  const name = path.match(/\.\/(.+)\.tsx$/)?.[1];
  if (name && name !== 'index') {
    componentRegistry[name] = modules[path].default;
  }
}
