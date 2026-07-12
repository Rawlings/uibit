import { ComponentType } from 'react';

export interface CodeSnippet {
  title: string;
  description?: string;
  code: string;
}

export interface DualCode {
  html: string;
  react: string;
}

export interface UsageExample {
  title: string;
  description?: string;
  Demo: ComponentType;
}

export interface AccessibilitySection {
  wcagLevel: 'A' | 'AA' | 'AAA';
  requirements: string[];
  keyboardNav?: { key: string; description: string }[];
}

export interface CemMember {
  kind: 'field' | 'method';
  name: string;
  description?: string;
  type?: { text: string };
  default?: string;
  privacy?: string;
  attribute?: string;
}

export interface CemEvent {
  name: string;
  description?: string;
  type?: { text: string };
}

export interface CemSlot {
  name: string;
  description?: string;
}

export interface CemCssProp {
  name: string;
  description?: string;
  default?: string;
}

export interface CemCssPart {
  name: string;
  description?: string;
}

export interface CemDeclaration {
  kind: string;
  name: string;
  tagName?: string;
  description?: string;
  members?: Array<CemMember>;
  events?: Array<CemEvent>;
  slots?: Array<CemSlot>;
  cssProperties?: Array<CemCssProp>;
  cssParts?: Array<CemCssPart>;
}

export interface CemManifest {
  modules: Array<{
    declarations?: Array<CemDeclaration>;
    exports?: Array<{ name: string; declaration: { name: string } }>;
  }>;
}

export interface ComponentDocData {
  id: string;
  title: string;
  description: string;
  packageName: string;
  tagName: string;
  manifest?: CemManifest;
  Demo?: ComponentType;
  demoCode?: DualCode;
  examples?: UsageExample[];
  usages?: CodeSnippet[];
  features?: string[];
  a11y?: AccessibilitySection;
  category?: string;
  changelog?: string;
  readme?: string;
}
