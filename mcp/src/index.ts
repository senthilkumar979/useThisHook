import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createUseThisHookServer } from './server.js';

async function main(): Promise<void> {
  const server = createUseThisHookServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('usethishook MCP server listening on stdio');
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`usethishook MCP server failed: ${message}`);
  process.exit(1);
});
