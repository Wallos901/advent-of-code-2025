import { readInput } from '../lib/input.js';
import { performance } from 'perf_hooks';

const DAY = 7;

const parseInput = (input) => {
  return input.split('\n').map(line => line.split(''));
}

const part1 = (data) => {
  console.log('Solving part 1...');

  let splits = 0;

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === 'S' || data[i][j] === '|') {
        if (data[i + 1][j] === '^') {
          data[i + 1][j - 1] = '|';
          data[i + 1][j + 1] = '|';
          splits++;
        } else {
          data[i + 1][j] = '|';
        }
      }
    }
  }

  return splits;
}

const part2 = (data) => {
  console.log('Solving part 2...');

  const posCache = new Map();

  const countPaths = (row, col) => {
    if (row >= data.length) return 1;

    const key = `${row},${col}`;
    if (posCache.has(key)) {
      return posCache.get(key);
    }

    let paths = 0;

    if (data[row][col] === '^') {
      const leftPaths = (col - 1 >= 0) ? countPaths(row + 1, col - 1) : 0;
      const rightPaths = (col + 1 < data[row].length) ? countPaths(row + 1, col + 1) : 0;
      paths = leftPaths + rightPaths;
    }
    else {
      const straightPaths = countPaths(row + 1, col);
      paths = straightPaths;
    }
    
    posCache.set(key, paths);
    
    return paths;
  };
  
  return countPaths(0, data[0].indexOf('S'));
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