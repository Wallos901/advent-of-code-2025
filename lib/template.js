/**
 * Template for Advent of Code Day __DAY__
 * https://adventofcode.com/2025/day/__DAY__
 */

import { readInput } from '../lib/input.js';
import { performance } from 'perf_hooks';

const DAY = __DAY__;

function parseInput(input) {
  // Parse the input here
  return input.split('\n');
}

function part1(data) {
  // Solve part 1
  console.log('Solving part 1...');

  return 0;
}

function part2(data) {
  // Solve part 2
  console.log('Solving part 2...');

  return 0;
}

function main() {
  console.log(`🎄 Advent of Code 2025 - Day ${DAY} 🎄`);
  console.log('\n');
  
  try {
    // Read and parse input
    const input = readInput(DAY);
    const data = parseInput(input);
    
    // Part 1
    const start1 = performance.now();
    const result1 = part1(data);
    const end1 = performance.now();
    
    console.log(`Part 1: ${result1} (${(end1 - start1).toFixed(2)}ms)`);
    console.log('\n');
    
    // Part 2
    const start2 = performance.now();
    const result2 = part2(data);
    const end2 = performance.now();
    
    console.log(`Part 2: ${result2} (${(end2 - start2).toFixed(2)}ms)`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { parseInput, part1, part2 };