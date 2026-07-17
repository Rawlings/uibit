export function analyzeSource(sourceCode: string, filePath: string): string;

export interface CreateOptions {
  files?: string[];
  plugins?: any[];
  context?: {
    dev?: boolean;
    [key: string]: any;
  };
}

export function create(options: CreateOptions): any;

export function cli(argv?: string[], cwd?: string): Promise<void>;
