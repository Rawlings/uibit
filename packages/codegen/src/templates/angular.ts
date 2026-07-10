import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports } from '../core/utils.js';

export const angularPlugin = {
  name: 'angular',
  generate(component: ComponentMetadata) {
    return {
      'index.ts': buildTS(component)
    };
  }
};

function renderImports(referencedTypes: string[]): string {
  return [
    `import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ElementRef } from '@angular/core';`,
    `import '../../index.js';`,
    generateTypeImports(referencedTypes)
  ].filter(Boolean).join('\n');
}

function renderComponentClass(name: string, tagName: string): string {
  return `@Component({
  selector: '${tagName}',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class Ngx${name} {
  constructor(private el: ElementRef) {}
}`;
}

function renderDirectiveBindings(name: string, component: ComponentMetadata): string {
  const { properties, attributes, events } = component;
  const propMap = mergePropertiesAndAttributes(properties, attributes);
  
  const inputs = Array.from(propMap.entries())
    .map(([propName, propType]) => `  @Input() ${propName}!: ${propType};`)
    .join('\n');

  const outputs = events
    .map(e => `  @Output() ${e.name} = new EventEmitter<CustomEvent>();`)
    .join('\n');

  return `// Directives bindings
export interface Ngx${name} {
${inputs}
${outputs}
}`;
}

function buildTS(component: ComponentMetadata): string {
  return new SourceBuilder()
    .append(renderImports(component.referencedTypes))
    .append(renderComponentClass(component.name, component.tagName))
    .append(renderDirectiveBindings(component.name, component))
    .toString();
}
