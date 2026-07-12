#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CemMcpServer } from './server.js';
import * as path from 'path';

const args = process.argv.slice(2);
const workspaceRoot = args[0] ? path.resolve(args[0]) : process.cwd();

const server = new CemMcpServer({
  scannerOptions: {
    workspaceRoot,
  },
});
const transport = new StdioServerTransport();

server.run(transport).catch((error) => {
  console.error('[CEM-MCP] Fatal error starting server:', error);
  process.exit(1);
});
