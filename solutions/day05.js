import { readInput } from '../lib/input.js';
import { performance } from 'perf_hooks';

const DAY = 5;

const parseInput = (input) => {
  const [rangesSection, idSection] = input.split('\n\n');
  const ranges = rangesSection.split('\n').map(range => range.split('-').map(Number));
  const productIds = idSection.split('\n').map(Number);
  return { ranges, productIds };
}

const part1 = (data) => {
  console.log('Solving part 1...');

  const { ranges, productIds } = data;
  let freshIds = 0;

  for (const id of productIds) {
    for (const [start, end] of ranges) {
      if (id >= start && id <= end) {
        freshIds++;
        break;
      }
    }
  }

  return freshIds;
}

const part2 = (data) => {
  console.log('Solving part 2...');

  const { ranges } = data;
  const mergedRanges = [];
  
  ranges.sort((a, b) => a[0] - b[0]);
  for (const range of ranges) {
    if (mergedRanges.length === 0 || mergedRanges[mergedRanges.length - 1][1] < range[0]) {
      mergedRanges.push(range);
    } else {
      mergedRanges[mergedRanges.length - 1][1] = Math.max(mergedRanges[mergedRanges.length - 1][1], range[1]);
    }
  }

  let totalCovered = 0;
  for (const [start, end] of mergedRanges) {
    totalCovered += (end - start + 1);
  }

  return totalCovered;
}

const main = () => {
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
    console.error('Error:', error);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { parseInput, part1, part2 };