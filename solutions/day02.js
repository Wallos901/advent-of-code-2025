import { readInput } from '../lib/input.js';
import { performance } from 'perf_hooks';

const DAY = 2;

const parseInput = (input) => {
  return input.split(',').map(code => code.split('-'));
}

const part1 = (data) => {
  console.log('Solving part 1...');

  let sum = 0;

  data.forEach(code => {
    for (let id = parseInt(code[0]); id <= parseInt(code[1]); id++) {
      const idString = id.toString();
      if (idString.length % 2 !== 0) continue;
      const first = idString.slice(0, idString.length / 2);
      const second = idString.slice(idString.length / 2);

      if (first === second) {
        sum = sum += id
      }
    }
  })

  return sum;
}

const part2 = (data) => {
  console.log('Solving part 2...');

  let sum = 0;

  data.forEach(code => {
    for (let id = parseInt(code[0]); id <= parseInt(code[1]); id++) {
      const idString = id.toString();
      let invalid = false;

      for (let chunkLen = 1; chunkLen <= Math.floor(idString.length / 2); chunkLen++) {
        if (idString.length % chunkLen !== 0 || invalid) continue;
        
        const chunks = [];
        for (let i = 0; i < idString.length; i += chunkLen) {
          chunks.push(idString.slice(i, i + chunkLen));
        }

        
        if (chunks.every(x => x === chunks[0])) {
          sum = sum += id
          invalid = true;
        }
      }
    }
  })

  return sum;
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