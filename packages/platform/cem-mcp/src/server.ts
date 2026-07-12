import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { ManifestScanner } from './manifest-scanner.js';
import { MarkdownFormatter } from './formatters/markdown.js';
import type { ApiFormatter } from './formatters/markdown.js';
import type { ScannerOptions } from './manifest-scanner.js';

export interface ServerOptions {
  scannerOptions?: ScannerOptions;
  formatter?: ApiFormatter;
}

export class CemMcpServer {
  private server: Server;
  private scanner: ManifestScanner;
  private formatter: ApiFormatter;

  constructor(options: ServerOptions = {}) {
    this.scanner = new ManifestScanner(options.scannerOptions);
    this.formatter = options.formatter || new MarkdownFormatter();
    
    this.server = new Server(
      {
        name: 'cem-mcp',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupResourceHandlers();
    this.setupToolHandlers();
    
    this.server.onerror = (error) => console.error('[MCP Error]', error);
  }

  private setupResourceHandlers(): void {
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const components = this.scanner.getAllComponents();
      return {
        resources: components.flatMap((comp) => [
          {
            uri: `cem-mcp://components/${comp.tagName}/api.json`,
            name: `${comp.name} Public API JSON`,
            mimeType: 'application/json',
            description: `Public API description of the <${comp.tagName}> component in JSON format`,
          },
          {
            uri: `cem-mcp://components/${comp.tagName}/api.md`,
            name: `${comp.name} Public API Markdown`,
            mimeType: 'text/markdown',
            description: `Public API description and documentation of the <${comp.tagName}> component in Markdown format`,
          }
        ]),
      };
    });

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const url = new URL(request.params.uri);
      const match = url.pathname.match(/^\/components\/([a-zA-Z0-9_-]+)\/api\.(json|md)$/);

      if (!match) {
        throw new McpError(ErrorCode.InvalidRequest, `Unknown resource URI: ${request.params.uri}`);
      }

      const tagName = match[1]!;
      const format = match[2]!;
      const comp = this.scanner.getComponent(tagName);

      if (!comp) {
        throw new McpError(ErrorCode.InvalidParams, `Component not found: ${tagName}`);
      }

      if (format === 'json') {
        return {
          contents: [
            {
              uri: request.params.uri,
              mimeType: 'application/json',
              text: JSON.stringify(comp, null, 2),
            },
          ],
        };
      } else {
        return {
          contents: [
            {
              uri: request.params.uri,
              mimeType: 'text/markdown',
              text: this.formatter.format(comp),
            },
          ],
        };
      }
    });
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'list_components',
            description: 'List all web components available in the scanned directory with their descriptions and packages.',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_component_api',
            description: 'Fetch the clean, public-only API specifications and JSDoc metadata for a specific component.',
            inputSchema: {
              type: 'object',
              properties: {
                tagName: {
                  type: 'string',
                  description: 'The tag name of the component, e.g. "my-button".',
                },
                format: {
                  type: 'string',
                  enum: ['json', 'markdown'],
                  default: 'json',
                  description: 'Desired output format. Markdown is highly recommended to save context tokens.',
                },
              },
              required: ['tagName'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (name === 'list_components') {
        const components = this.scanner.getAllComponents().map((c) => ({
          tagName: c.tagName,
          name: c.name,
          package: c.package,
          description: c.description ? c.description.split('\n')[0] : '',
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(components, null, 2),
            },
          ],
        };
      }

      if (name === 'get_component_api') {
        const tagName = args?.tagName as string;
        const format = (args?.format as string) || 'json';

        if (!tagName) {
          throw new McpError(ErrorCode.InvalidParams, 'tagName is required');
        }

        const comp = this.scanner.getComponent(tagName);
        if (!comp) {
          throw new McpError(ErrorCode.InvalidParams, `Component <${tagName}> not found`);
        }

        const textResult = format === 'markdown' ? this.formatter.format(comp) : JSON.stringify(comp, null, 2);

        return {
          content: [
            {
              type: 'text',
              text: textResult,
            },
          ],
        };
      }

      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    });
  }

  /**
   * Runs the MCP server with the provided transport.
   */
  public async run(transport: Transport): Promise<void> {
    await this.scanner.scan();
    await this.server.connect(transport);
    console.error('[CEM-MCP] Server connected and running');
  }
}
