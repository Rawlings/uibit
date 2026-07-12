import type { ComponentMetadata } from '../core/types.js';
import { SourceBuilder, mergePropertiesAndAttributes, generateTypeImports, toCamelCase } from '../core/utils.js';

export const angularPlugin = {
  name: 'angular',
  generate(component: ComponentMetadata) {
    const generator = new AngularComponentGenerator(component);
    return {
      'index.ts': generator.build()
    };
  }
};

class AngularComponentGenerator {
  private propMap: Map<string, string>;
  private isFormAssociated: boolean;

  constructor(private component: ComponentMetadata) {
    this.propMap = mergePropertiesAndAttributes(component.properties, component.attributes);
    this.isFormAssociated = component.formAssociated || false;
  }

  public build(): string {
    return new SourceBuilder()
      .append(this.generateImports())
      .append(this.generateClass())
      .toString();
  }

  private generateImports(): string {
    const angularImports = [
      'Component',
      'ChangeDetectionStrategy',
      'ElementRef'
    ];

    if (this.propMap.size > 0) {
      angularImports.push('input', 'effect');
    }
    if (this.component.events.length > 0) {
      angularImports.push('output');
    }

    const hasBoolean = Array.from(this.propMap.values()).some(t => t.includes('boolean'));
    const hasNumber = Array.from(this.propMap.values()).some(t => t.includes('number'));

    if (hasBoolean) {
      angularImports.push('booleanAttribute');
    }
    if (hasNumber) {
      angularImports.push('numberAttribute');
    }
    if (this.isFormAssociated) {
      angularImports.push('forwardRef');
    }

    const importPath = this.component.importPath || '../../index.js';

    return [
      `import { ${angularImports.join(', ')} } from '@angular/core';`,
      this.isFormAssociated ? `import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';` : '',
      `import '${importPath}';`,
      `import type { ${this.component.name} as HTMLElementClass } from '${importPath}';`,
      generateTypeImports(this.component.referencedTypes, importPath)
    ].filter(Boolean).join('\n');
  }

  private generateClass(): string {
    const name = this.component.name;
    const providers = this.generateProviders();
    const implementsClause = this.isFormAssociated ? ' implements ControlValueAccessor' : '';
    
    // Build host bindings safely without duplicate keys
    const hostBindings: Record<string, string[]> = {};

    for (const e of this.component.events) {
      const camel = toCamelCase(e.name);
      hostBindings[`(${e.name})`] = [`${camel}.emit($event)`];
    }

    if (this.isFormAssociated) {
      hostBindings['(blur)'] = ['handleBlur()'];
      
      if (!hostBindings['(change)']) hostBindings['(change)'] = [];
      hostBindings['(change)'].push('handleInput()');
      
      if (!hostBindings['(input)']) hostBindings['(input)'] = [];
      hostBindings['(input)'].push('handleInput()');

      for (const e of this.component.events) {
        const key = `(${e.name})`;
        const bindings = hostBindings[key] ?? [];
        hostBindings[key] = bindings;
        bindings.push('handleInput()');
      }
    }

    const hostLines = Object.entries(hostBindings).map(([eventKey, actions]) => {
      return `'${eventKey}': '${actions.join('; ')}'`;
    });

    const hostAttr = hostLines.length > 0 ? `,\n  host: {\n    ${hostLines.join(',\n    ')}\n  }` : '';

    const inputsCode = this.generateInputs();
    const outputsCode = this.generateOutputs();
    const effectCode = this.generateEffect();
    const formCode = this.generateFormMethods();

    const constructorBody = [effectCode].filter(Boolean).join('\n');

    return `@Component({
  selector: '${this.component.tagName}',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true${providers}${hostAttr}
})
export class Ngx${name}${implementsClause} {
  constructor(private el: ElementRef<HTMLElementClass>) {
${constructorBody}
  }

${[inputsCode, outputsCode, formCode].filter(Boolean).join('\n\n')}
}`;
  }

  private generateProviders(): string {
    if (!this.isFormAssociated) return '';
    return `,\n  providers: [\n    {\n      provide: NG_VALUE_ACCESSOR,\n      useExisting: forwardRef(() => Ngx${this.component.name}),\n      multi: true\n    }\n  ]`;
  }

  private generateInputs(): string {
    return Array.from(this.propMap.entries())
      .map(([name, type]) => {
        const originalProp = this.component.properties.find(p => p.name === name);
        const hasDefault = originalProp && originalProp.default !== undefined;
        let defaultVal = 'undefined';

        if (hasDefault) {
          defaultVal = originalProp.default!;
        } else if (type.includes('boolean')) {
          defaultVal = 'false';
        } else if (type.includes('number')) {
          defaultVal = '0';
        } else if (type.includes('string')) {
          defaultVal = '\'\'';
        }

        const isBoolean = type.includes('boolean');
        const isNumber = type.includes('number');

        let options = '';
        if (isBoolean) {
          options = `, { transform: booleanAttribute }`;
        } else if (isNumber) {
          options = `, { transform: numberAttribute }`;
        }

        return `  readonly ${name} = input<${type}, any>(${defaultVal}${options});`;
      })
      .join('\n');
  }

  private generateOutputs(): string {
    return this.component.events
      .map(e => {
        const camel = toCamelCase(e.name);
        const eventType = e.type?.text ? `CustomEvent<${e.type.text}>` : 'CustomEvent<any>';
        return `  readonly ${camel} = output<${eventType}>();`;
      })
      .join('\n');
  }

  private generateEffect(): string {
    if (this.propMap.size === 0) return '';
    
    return Array.from(this.propMap.keys())
      .map(name => {
        return `    effect(() => {
      if (this.el.nativeElement) {
        this.el.nativeElement.${name} = this.${name}();
      }
    });`;
      })
      .join('\n');
  }

  private generateFormMethods(): string {
    if (!this.isFormAssociated) return '';

    return `  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  handleInput() {
    this._onChange(this.el.nativeElement.value);
  }

  handleBlur() {
    this._onTouched();
  }`;
  }
}
