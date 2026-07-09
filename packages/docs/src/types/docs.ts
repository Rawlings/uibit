import { ComponentType } from 'react';

export interface CodeSnippet {
  title: string;
  description?: string;
  code: string;
}

export interface ComponentDocData {
  id: string;
  title: string;
  description: string;
  packageName: string;
  tagName: string;
  manifest: any;
  Demo: ComponentType;
  usages: CodeSnippet[];
  features?: string[];
}
