import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, toReactEventName, mergePropertiesAndAttributes, generateTypeImports } from '../core/utils.js';

export const reactPlugin = {
  name: 'react',
  generate(component: ComponentMetadata) {
    return {
      'index.js': buildJS(component),
      'index.d.ts': buildDTS(component)
    };
  }
};

function renderJSImports(name: string): string {
  return [
    `import React from 'react';`,
    `import { createComponent } from '@lit/react';`,
    `import { ${name} as HTMLElementClass } from '../../index.js';`
  ].join('\n');
}

function renderReactComponent(name: string, tagName: string, events: any[]): string {
  const eventMappings = events
    .map(e => `    ${toReactEventName(e.name)}: '${e.name}'`)
    .join(',\n');

  return `export const ${name} = createComponent({
  react: React,
  tagName: '${tagName}',
  elementClass: HTMLElementClass,
  events: {
${eventMappings}
  }
});`;
}

function buildJS(component: ComponentMetadata): string {
  return new SourceBuilder()
    .append(`"use client";`)
    .append(renderJSImports(component.name))
    .append(renderReactComponent(component.name, component.tagName, component.events))
    .toString();
}

function renderDTSImports(name: string, referencedTypes: string[]): string {
  return [
    `import * as React from 'react';`,
    `import type { ${name} as HTMLElementClass } from '../../index.js';`,
    generateTypeImports(referencedTypes)
  ].filter(Boolean).join('\n');
}

function renderSlotDocs(slots: any[]): string {
  const docs = slots
    .map(s => ` * - **Slot "${s.name || 'default'}"**: ${s.description || 'No description'}`)
    .join('\n');
  return `/**
 * Mapped Slots:
${docs || ' * - None'}
 */`;
}

function renderPropsInterface(name: string, component: ComponentMetadata): string {
  const { properties, attributes, events } = component;
  const propMap = mergePropertiesAndAttributes(properties, attributes);
  const propTypes = Array.from(propMap.entries())
    .map(([k, v]) => `  ${k}?: ${v};`)
    .join('\n');

  const eventTypes = events
    .map(e => `  ${toReactEventName(e.name)}?: (event: CustomEvent) => void;`)
    .join('\n');

  return `export interface ${name}Props extends Omit<React.HTMLAttributes<HTMLElementClass>, 'color'> {
${propTypes}
${eventTypes}
}`;
}

function buildDTS(component: ComponentMetadata): string {
  return new SourceBuilder()
    .append(renderDTSImports(component.name, component.referencedTypes))
    .append(renderSlotDocs(component.slots))
    .append(renderPropsInterface(component.name, component))
    .append(`export declare const ${component.name}: React.ComponentType<${component.name}Props>;`)
    .toString();
}
