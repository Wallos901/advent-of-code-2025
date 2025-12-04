import { readInput } from '../lib/input.js';
import { performance } from 'perf_hooks';
import { getNeighbors8 } from '../lib/utils.js';

const DAY = 4;

const isValidPosition = (data, y, x) => {
  return y >= 0 && y < data.length && x >= 0 && x < data[0].length;
}

const parseInput = (input) => {
  return input.split('\n').map(line => line.split(''));
}

const part1 = (data) => {
  console.log('Solving part 1...');

  let matches = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] !== '@') continue;
      let fullNeighbours = 0;
      const neighbours = getNeighbors8([i, j]);
      neighbours.forEach(pos => {
        if (isValidPosition(data, pos[0], pos[1]) && data[pos[0]][pos[1]] === '@') {
          fullNeighbours = fullNeighbours + 1;
        }
      })
      if (fullNeighbours < 4) matches = matches + 1;
    }
  }

  return matches;
}

const part2 = (data) => {
  console.log('Solving part 2...');

  let matches = 0;
  let currentData = data;
  let dataCache = data;
  let done = false;

  while (!done) {
    const replaceables = []

    for (let i = 0; i < currentData.length; i++) {
      for (let j = 0; j < currentData[0].length; j++) {
        if (currentData[i][j] !== '@') continue;
        let fullNeighbours = 0;
        const neighbours = getNeighbors8([i, j]);
        neighbours.forEach(pos => {
          if (isValidPosition(currentData, pos[0], pos[1]) && currentData[pos[0]][pos[1]] === '@') {
            fullNeighbours = fullNeighbours + 1;
          }
        })
        if (fullNeighbours < 4) {
          replaceables.push([i, j])
        }
      }
    }

    replaceables.forEach(pos => {
      currentData[pos[0]][pos[1]] = '.';
      matches = matches + 1;
    })

    if (replaceables.length === 0) {
      done = true;
    } else {
      dataCache = currentData;
    }
  }

  return matches;
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