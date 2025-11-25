#!/usr/bin/env node

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Parse command line arguments
const day = parseInt(process.argv[2]);

if (!day || day < 1 || day > 25) {
  console.error('Usage: npm run day <day>');
  console.error('Day must be a number between 1 and 25');
  process.exit(1);
}

const paddedDay = day.toString().padStart(2, '0');
const solutionPath = join(projectRoot, 'solutions', `day${paddedDay}.js`);

if (!existsSync(solutionPath)) {
  console.error(`❌ Solution file not found: solutions/day${paddedDay}.js`);
  console.log(`Run 'npm run new ${day}' to create the files for day ${day}`);
  process.exit(1);
}

console.log(`🎄 Running Day ${day} solution...\n`);

// Run the solution
const child = spawn('node', [solutionPath], {
  stdio: 'inherit',
  cwd: projectRoot
});

child.on('close', (code) => {
  process.exit(code);
});