#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function createDayFiles(day) {
  const paddedDay = day.toString().padStart(2, '0');
  
  // Read template
  const templatePath = join(projectRoot, 'lib', 'template.js');
  const template = readFileSync(templatePath, 'utf-8');
  
  // Replace placeholders
  const solutionContent = template.replace(/__DAY__/g, day);
  
  // Create solution file
  const solutionPath = join(projectRoot, 'solutions', `day${paddedDay}.js`);
  if (!existsSync(solutionPath)) {
    writeFileSync(solutionPath, solutionContent);
    console.log(`✅ Created solution file: solutions/day${paddedDay}.js`);
  } else {
    console.log(`⚠️  Solution file already exists: solutions/day${paddedDay}.js`);
  }
  
  // Create input file placeholder
  const inputPath = join(projectRoot, 'inputs', `day${paddedDay}.txt`);
  if (!existsSync(inputPath)) {
    writeFileSync(inputPath, '');
    console.log(`✅ Created input file: inputs/day${paddedDay}.txt`);
  }
}

// Parse command line arguments
const day = parseInt(process.argv[2]);

if (!day || day < 1 || day > 25) {
  console.error('Usage: npm run new <day>');
  console.error('Day must be a number between 1 and 25');
  process.exit(1);
}

createDayFiles(day);
console.log(`\n🎄 Day ${day} files created! Don't forget to add your puzzle input.`);