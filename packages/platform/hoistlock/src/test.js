import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkHoisting } from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(__dirname, '../fixtures');

// Setup fixtures
function setupFixtures() {
  if (fs.existsSync(fixturesDir)) {
    fs.rmSync(fixturesDir, { recursive: true, force: true });
  }
  fs.mkdirSync(fixturesDir, { recursive: true });

  // 1. Valid project structure (no leaks)
  // entry.js -> imports static-dep.js
  //          -> dynamic imports dynamic-entry.js
  // dynamic-entry.js -> imports dynamic-dep.js
  const validDir = path.join(fixturesDir, 'valid');
  fs.mkdirSync(validDir);
  fs.writeFileSync(
    path.join(validDir, 'entry.js'),
    `
    import './static-dep.js';
    import('./dynamic-entry.js');
  `,
  );
  fs.writeFileSync(
    path.join(validDir, 'static-dep.js'),
    `console.log('static-dep');`,
  );
  fs.writeFileSync(
    path.join(validDir, 'dynamic-entry.js'),
    `
    import './dynamic-dep.js';
    console.log('dynamic');
  `,
  );
  fs.writeFileSync(
    path.join(validDir, 'dynamic-dep.js'),
    `console.log('dynamic-dep');`,
  );

  // 2. Leaking project structure (static import of a dynamic file)
  // entry.js -> imports static-dep.js
  //          -> dynamic imports dynamic-entry.js
  //          -> ACCIDENTALLY imports dynamic-dep.js (hoisting leak!)
  const leakDir = path.join(fixturesDir, 'leak');
  fs.mkdirSync(leakDir);
  fs.writeFileSync(
    path.join(leakDir, 'entry.js'),
    `
    import './static-dep.js';
    import './dynamic-dep.js'; // Leak!
    import('./dynamic-entry.js');
  `,
  );
  fs.writeFileSync(
    path.join(leakDir, 'static-dep.js'),
    `console.log('static-dep');`,
  );
  fs.writeFileSync(
    path.join(leakDir, 'dynamic-entry.js'),
    `
    import './dynamic-dep.js';
  `,
  );
  fs.writeFileSync(
    path.join(leakDir, 'dynamic-dep.js'),
    `console.log('dynamic-dep');`,
  );

  // 3. Barrel file structure (clean re-export separation)
  // index.js -> re-exports helper-a.js and helper-b.js
  // entry.js -> imports helper-a.js via index.js
  //          -> dynamic imports dynamic-entry.js
  // dynamic-entry.js -> imports helper-b.js via index.js
  // Since helper-a and helper-b are independent, they should NOT collide!
  const barrelDir = path.join(fixturesDir, 'barrel');
  fs.mkdirSync(barrelDir);
  fs.writeFileSync(
    path.join(barrelDir, 'index.js'),
    `
    export { a } from './helper-a.js';
    export { b } from './helper-b.js';
  `,
  );
  fs.writeFileSync(path.join(barrelDir, 'helper-a.js'), `export const a = 1;`);
  fs.writeFileSync(path.join(barrelDir, 'helper-b.js'), `export const b = 2;`);
  fs.writeFileSync(
    path.join(barrelDir, 'entry.js'),
    `
    import { a } from './index.js';
    import('./dynamic-entry.js');
  `,
  );
  fs.writeFileSync(
    path.join(barrelDir, 'dynamic-entry.js'),
    `
    import { b } from './index.js';
  `,
  );
}

function runTests() {
  setupFixtures();

  console.log('--- Testing Clean / Valid Scenario ---');
  const cleanLeaks = checkHoisting({
    entry: path.join(fixturesDir, 'valid/entry.js'),
  });
  console.log('Leaks detected:', cleanLeaks.length);
  if (cleanLeaks.length !== 0) {
    console.error('FAIL: Expected 0 leaks, got:', cleanLeaks);
    process.exit(1);
  }
  console.log('PASS');

  console.log('\n--- Testing Leak Scenario ---');
  const leaks = checkHoisting({
    entry: path.join(fixturesDir, 'leak/entry.js'),
  });
  console.log('Leaks detected:', leaks.length);
  if (leaks.length === 0) {
    console.error('FAIL: Expected leaks to be detected');
    process.exit(1);
  }
  console.log('PASS. Detected leak details:', leaks);

  console.log('\n--- Testing Barrel File Scenario ---');
  const barrelLeaks = checkHoisting({
    entry: path.join(fixturesDir, 'barrel/entry.js'),
  });
  console.log('Leaks detected:', barrelLeaks.length);
  if (barrelLeaks.length !== 0) {
    console.error(
      'FAIL: Expected 0 leaks with resolved barrel exports, got:',
      barrelLeaks,
    );
    process.exit(1);
  }
  console.log('PASS');

  // Clean up disabled so test fixtures remain in the repo for proof
  // fs.rmSync(fixturesDir, { recursive: true, force: true });
  console.log('\nAll tests completed successfully!');
}

runTests();
