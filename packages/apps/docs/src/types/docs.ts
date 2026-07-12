import '@uibit/360-viewer/react';
import '@uibit/carousel/react';
import '@uibit/consent-guard/react';
import '@uibit/countdown/react';
import '@uibit/diff-viewer/react';
import '@uibit/effect-trigger/react';
import '@uibit/form/react';
import '@uibit/hotspot/react';
import '@uibit/image-comparison/react';
import '@uibit/image-reveal/react';
import '@uibit/number-increment/react';
import '@uibit/particles/react';
import '@uibit/read-time/react';
import '@uibit/scratch-reveal/react';
import '@uibit/scroll-progress/react';
import '@uibit/sentiment-selector/react';
import '@uibit/signature/react';
import '@uibit/table/react';
import '@uibit/text-clamp/react';
import '@uibit/text-rotator/react';
import '@uibit/text-typing/react';
import '@uibit/video/react';


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
  parameters?: Array<{
    name: string;
    type?: { text: string };
    description?: string;
  }>;
  return?: {
    type?: { text: string };
    description?: string;
  };
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
    declarations?: Array<any>;
    exports?: Array<{ name: string; declaration: { name: string } }>;
  }>;
  [key: string]: any;
}

export interface ComponentDocData {
  id?: string;
  title?: string;
  description?: string;
  packageName?: string;
  tagName?: string;
  manifest?: any;
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

export interface RegisteredComponentDocData extends ComponentDocData {
  id: string;
  title: string;
  description: string;
  packageName: string;
  tagName: string;
}
