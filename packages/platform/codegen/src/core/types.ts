export interface Property {
  name: string;
  type?: { text: string };
  description?: string;
  default?: string;
  readonly?: boolean;
}

export interface Event {
  name: string;
  description?: string;
  type?: { text: string };
}

export interface Attribute {
  name: string;
  fieldName?: string;
  type?: { text: string };
  description?: string;
}

export interface Slot {
  name: string;
  description?: string;
}

export interface Mixin {
  name: string;
  package?: string;
}

export interface ComponentMetadata {
  name: string;
  tagName: string;
  properties: Property[];
  events: Event[];
  attributes: Attribute[];
  slots: Slot[];
  referencedTypes: string[];
  mixins?: Mixin[];
  formAssociated?: boolean;
  importPath?: string;
}

export interface Plugin {
  name: string;
  generate: (component: ComponentMetadata) => Record<string, string>;
}
