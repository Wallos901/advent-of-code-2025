import { readInput } from '../lib/input.js';
import { performance } from 'perf_hooks';

const DAY = 1;

const parseInput = (input) => {
  return input.split('\n').map(line => line.trim());
}

const part1 = (data) => {
  console.log('Solving part 1...');

  let dial = 50;
  let password = 0;

  data.forEach(turn => {
    const dir = turn.slice(0, 1);
    const steps = parseInt(turn.slice(1), 10);
    
    if (dir === 'R') {
      dial = (dial + steps) % 100;
    } else if (dir === 'L') {
      dial = (dial - steps + 100) % 100;
    }

    if (dial === 0) password = password + 1;
  })

  return password;
}

const part2 = (data) => {
  console.log('Solving part 2...');

  let dial = 50;
  let password = 0;

  data.forEach(turn => {
    const dir = turn.slice(0, 1);
    const steps = parseInt(turn.slice(1), 10);

    for (let i = 0; i < steps; i++) {
      if (dir === 'R') {
        dial = (dial + 1) % 100;
      } else if (dir === 'L') {
        dial = (dial - 1 + 100) % 100;
      }

      if (dial === 0) password = password + 1;
    }
  })

  return password;
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