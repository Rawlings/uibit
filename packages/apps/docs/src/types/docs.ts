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

export interface ComponentDocData {
  id: string;
  title: string;
  description: string;
  packageName: string;
  tagName: string;
  manifest: any;
  Demo: ComponentType;
  demoCode: DualCode;
  examples?: UsageExample[];
  usages?: CodeSnippet[];
  features?: string[];
  a11y?: AccessibilitySection;
  category?: string;
  changelog?: string;
}
