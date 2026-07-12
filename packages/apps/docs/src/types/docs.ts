/// <reference types="@uibit/360-viewer/react" />
/// <reference types="@uibit/carousel/react" />
/// <reference types="@uibit/consent-guard/react" />
/// <reference types="@uibit/countdown/react" />
/// <reference types="@uibit/diff-viewer/react" />
/// <reference types="@uibit/effect-trigger/react" />
/// <reference types="@uibit/form/react" />
/// <reference types="@uibit/hotspot/react" />
/// <reference types="@uibit/image-comparison/react" />
/// <reference types="@uibit/image-reveal/react" />
/// <reference types="@uibit/number-increment/react" />
/// <reference types="@uibit/particles/react" />
/// <reference types="@uibit/read-time/react" />
/// <reference types="@uibit/scratch-reveal/react" />
/// <reference types="@uibit/scroll-progress/react" />
/// <reference types="@uibit/sentiment-selector/react" />
/// <reference types="@uibit/signature/react" />
/// <reference types="@uibit/table/react" />
/// <reference types="@uibit/text-clamp/react" />
/// <reference types="@uibit/text-rotator/react" />
/// <reference types="@uibit/text-typing/react" />
/// <reference types="@uibit/video/react" />

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
    declarations?: Array<any>;
    exports?: Array<{ name: string; declaration: { name: string } }>;
  }>;
  [key: string]: any;
}

export interface ComponentDocData {
  id: string;
  title: string;
  description: string;
  packageName: string;
  tagName: string;
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
