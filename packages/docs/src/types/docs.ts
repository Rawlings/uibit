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
  usages: CodeSnippet[];
  features?: string[];
}
