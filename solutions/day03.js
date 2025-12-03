import { readInput } from '../lib/input.js';
import { performance } from 'perf_hooks';

const DAY = 3;

const parseInput = (input) => {
  return input.split('\n').map(bank => bank.split(''));
}

const part1 = (data) => {
  console.log('Solving part 1...');

  let sum = 0;

  data.forEach(bank => {
    let highest = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = i + 1; j < bank.length; j++) {
        const potential = parseInt(`${bank[i]}${bank[j]}`);
        if (potential > highest) highest = potential;
      }
    }
    sum = sum + highest;
  });

  return sum;
}

const part2 = (data) => {
  console.log('Solving part 2...');

  let sum = 0;
  const numBatteriesOn = 12;

  data.forEach(bank => {
    let currTracker = Array(numBatteriesOn + 1).fill('');
    
    for (const battery of bank) {
      const newTracker = [...currTracker];
      
      for (let i = 1; i <= numBatteriesOn; i++) {
        const currBattery = currTracker[i-1] + battery;
        if (currBattery > newTracker[i]) {
          newTracker[i] = currBattery;
        }
      }
      
      currTracker = newTracker;
    }
    sum = sum + parseInt(currTracker[numBatteriesOn]);
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