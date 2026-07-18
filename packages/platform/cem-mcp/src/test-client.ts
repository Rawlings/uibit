import { ManifestScanner } from './manifest-scanner.js';

async function main() {
  console.log('Starting local test of ManifestScanner...');
  const scanner = new ManifestScanner();

  console.log(`Scanning workspace at: ${scanner.getWorkspaceRoot()}`);
  const components = await scanner.scan();

  console.log(`Found ${components.size} components:`);
  for (const [tag, comp] of components.entries()) {
    console.log(` - <${tag}> (${comp.name})`);

    // Check if we correctly filtered private members
    const hasPrivateFields =
      comp.properties?.some((p) => p.name.startsWith('_')) || false;
    const hasPrivateMethods =
      comp.methods?.some((m) => m.name.startsWith('_')) || false;

    if (hasPrivateFields || hasPrivateMethods) {
      console.error(
        `❌ Error: Component <${tag}> contains private members starting with "_"!`,
      );
      process.exit(1);
    }
  }

  console.log(
    '✅ Success: ManifestScanner works and correctly filtered private members!',
  );

  // Test formatting for uibit-video
  const videoComp = scanner.getComponent('uibit-video');
  if (videoComp) {
    const { MarkdownFormatter } = await import('./formatters/markdown.js');
    const formatter = new MarkdownFormatter();
    console.log('\n--- Output Markdown Representation for <uibit-video> ---');
    console.log(formatter.format(videoComp));
    console.log('------------------------------------------------------------');
  }
}

main().catch(console.error);
