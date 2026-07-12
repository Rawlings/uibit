import type { ComponentMetadata } from '../core/types.js';
import { mergePropertiesAndAttributes, generateTypeImports, toCamelCase, sanitizeEventType, isEventAssociatedWithProp } from '../core/utils.js';
import {
  parseModule,
  parseClassMembers,
  extractStatementsFromArrow,
  findClassDeclaration
} from '../core/swc.js';
import swc from '@swc/core';

export const angularPlugin = {
  name: 'angular',
  generate(component: ComponentMetadata) {
    const generator = new AngularComponentGenerator(component);
    return {
      'index.ts': generator.build()
    };
  }
};

// ==========================================
// Standalone Code Templates (Separation of Concerns)
// ==========================================

const BASE_COMPONENT_TEMPLATE = `
  // IMPORTS_PLACEHOLDER

  @Component({
    selector: 'SELECTOR_PLACEHOLDER',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
    // DECORATOR_METADATA_PLACEHOLDER
  })
  export class CLASS_NAME_PLACEHOLDER {
    constructor(private el: ElementRef<HTMLElementClass>) {}
  }
`;

const CVA_METHODS_TEMPLATE = `
  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value.set(value);
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const el = this.el.nativeElement;
    if ('disabled' in el) {
      (el as any).disabled = isDisabled;
    }
    if (isDisabled) {
      el.setAttribute('disabled', '');
    } else {
      el.removeAttribute('disabled');
    }
  }

  handleInput(event: any) {
    const val = event.target.value;
    this.value.set(val);
    this._onChange(val);
  }

  handleBlur() {
    this._onTouched();
  }
`;

class AngularComponentGenerator {
  private propMap: Map<string, string>;
  private isFormAssociated: boolean;

  constructor(private component: ComponentMetadata) {
    this.propMap = mergePropertiesAndAttributes(component.properties, component.attributes);
    this.isFormAssociated = component.formAssociated || false;
  }

  private isModelProp(name: string): boolean {
    if (name === 'value') return true;
    return this.component.events.some(e => isEventAssociatedWithProp(this.component, e.name, name));
  }

  private generatePropertySignal(name: string, type: string): string {
    const originalProp = this.component.properties.find(p => p.name === name);
    const defaultVal = originalProp?.default !== undefined ? originalProp.default : 'undefined';

    if (this.isModelProp(name)) {
      return `readonly ${name} = model<${type}>(${defaultVal});`;
    }

    if (type.includes('boolean')) {
      return `readonly ${name} = input<${type}, any>(${defaultVal}, { transform: booleanAttribute });`;
    }
    if (type.includes('number')) {
      return `readonly ${name} = input<${type}, any>(${defaultVal}, { transform: numberAttribute });`;
    }

    return `readonly ${name} = input<${type}>(${defaultVal});`;
  }

  private generateOutputProperty(e: any): string {
    const camel = toCamelCase(e.name);
    const eventType = `CustomEvent<${sanitizeEventType(e.type?.text)}>`;
    return `readonly ${camel} = output<${eventType}>();`;
  }

  public build(): string {
    const name = this.component.name;
    const className = `Ngx${name}`;
    const importPath = this.component.importPath || '../../index.js';
    const typeImports = generateTypeImports(this.component.referencedTypes, importPath);
    const isFormAssociated = this.isFormAssociated;

    // Collect imports dynamically
    const angularImports = ['Component', 'ChangeDetectionStrategy', 'ElementRef'];
    const hasModels = Array.from(this.propMap.keys()).some(k => this.isModelProp(k));
    const hasInputs = Array.from(this.propMap.keys()).some(k => !this.isModelProp(k));

    if (hasModels) angularImports.push('model');
    if (hasInputs) angularImports.push('input');
    if (this.propMap.size > 0) angularImports.push('effect');
    if (this.component.events.length > 0) angularImports.push('output');

    const hasBoolean = Array.from(this.propMap.values()).some(t => t.includes('boolean'));
    const hasNumber = Array.from(this.propMap.values()).some(t => t.includes('number'));
    if (hasBoolean) angularImports.push('booleanAttribute');
    if (hasNumber) angularImports.push('numberAttribute');
    if (isFormAssociated) angularImports.push('forwardRef');

    // Build decorator metadata additions (providers and host)
    let decoratorAdditions = '';
    if (isFormAssociated) {
      decoratorAdditions += `,
        providers: [
          {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ${className}),
            multi: true
          }
          ]`;
    }

    // Build host event bindings
    const hostBindings: Record<string, string[]> = {};
    for (const e of this.component.events) {
      const camel = toCamelCase(e.name);
      const actions = [`${camel}.emit($event)`];

      // Find if this event is associated with any class property
      const matchedPropName = Array.from(this.propMap.keys()).find(propName => {
        return isEventAssociatedWithProp(this.component, e.name, propName);
      });

      if (matchedPropName) {
        const isPrimitiveEvent = e.payloadKeys === undefined || e.payloadKeys.length === 0;
        const targetValue = isPrimitiveEvent
          ? `$event.target.${matchedPropName}`
          : `$event.detail?.${matchedPropName} !== undefined ? $event.detail.${matchedPropName} : $event.target.${matchedPropName}`;

        actions.push(`${matchedPropName}.set(${targetValue})`);

        if (isFormAssociated && matchedPropName === 'value') {
          actions.push('handleInput($event)');
        }
      }
      hostBindings[`(${e.name})`] = actions;
    }

    // No hardcoded bindings for form association; all bindings are manifest-driven.

    const hostLines = Object.entries(hostBindings).map(([eventKey, actions]) => {
      return `'${eventKey}': '${actions.join('; ')}'`;
    });

    if (hostLines.length > 0) {
      decoratorAdditions += `,
        host: {
          ${hostLines.join(',\n')}
        }`;
    }

    // 1. Interpolate and parse the base component wrapper AST
    const implementsClause = isFormAssociated ? ' implements ControlValueAccessor' : '';
    const baseSource = BASE_COMPONENT_TEMPLATE
      .replace('// IMPORTS_PLACEHOLDER', `
        import { ${angularImports.join(', ')} } from '@angular/core';
        ${isFormAssociated ? `import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';` : ''}
        import '${importPath}';
        import type { ${name} as HTMLElementClass } from '${importPath}';
        ${typeImports}
      `)
      .replace('// DECORATOR_METADATA_PLACEHOLDER', decoratorAdditions)
      .replace('SELECTOR_PLACEHOLDER', this.component.tagName)
      .replace('CLASS_NAME_PLACEHOLDER', `${className}${implementsClause}`);

    const moduleAst = parseModule(baseSource);
    const classDecl = findClassDeclaration(moduleAst);

    // 2. Generate and graft reactive properties (inputs/outputs/models)
    const propertiesSource = Array.from(this.propMap.entries())
      .map(([propName, type]) => this.generatePropertySignal(propName, type))
      .join('\n');

    const outputsSource = this.component.events
      .map(e => this.generateOutputProperty(e))
      .join('\n');

    classDecl.body.push(...parseClassMembers(propertiesSource));
    classDecl.body.push(...parseClassMembers(outputsSource));

    // 3. Graft ControlValueAccessor methods if form-associated
    if (isFormAssociated) {
      classDecl.body.push(...parseClassMembers(CVA_METHODS_TEMPLATE));
    }

    // 4. Graft effects into Constructor
    const constructorNode = classDecl.body.find((n: any) => n.type === 'Constructor');
    if (this.propMap.size > 0 && constructorNode) {
      const effectsSource = Array.from(this.propMap.keys())
        .map(propName => {
          return `effect(() => {
            if (this.el.nativeElement) {
              this.el.nativeElement.${propName} = this.${propName}();
            }
          });`;
        })
        .join('\n');

      const statements = extractStatementsFromArrow(effectsSource);
      constructorNode.body.stmts.push(...statements);
    }

    // 5. Print the completed, compiler-validated AST
    try {
      const output = swc.printSync(moduleAst, { minify: false });
      return output.code;
    } catch (e) {
      console.error(`Error: Failed to parse and print generated AST for ${name}:`, e);
      throw e;
    }
  }
}
