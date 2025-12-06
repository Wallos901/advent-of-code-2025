import { readInput } from '../lib/input.js';
import { performance } from 'perf_hooks';

const DAY = 6;

const parseInput = (input) => {
  const data = input.split('\n');

  const dataWithoutAllSpaces = data.map(line => line.split(/\s+/))
  const formattedData = [];
  for (let j = 0; j < dataWithoutAllSpaces[0].length; j++) {
    for (let i = 0; i < dataWithoutAllSpaces.length; i++) {
      if (!formattedData[j]) formattedData[j] = [];
      formattedData[j].push(dataWithoutAllSpaces[i][j]);
    }
  }

  const biggestNumberLengths = formattedData.map(group => Math.max(...group.map(num => num.length)));
  const formattedDataPadded = [];

  for (let i = 0; i < biggestNumberLengths.length; i++) {
    formattedDataPadded.push([]);
  }

  data.forEach(line => {
    let position = 0;
    biggestNumberLengths.forEach((length, colIndex) => {
      const value = line.slice(position, position + length);
      formattedDataPadded[colIndex].push(value);
      position += length + 1;
    });
  });

  return {formattedData, formattedDataPadded};
}

const part1 = (data) => {
  console.log('Solving part 1...');

  const { formattedData } = data;

  let sum = 0;

  for (const group of formattedData) {
    let eqString = group[0];
    for (let i = 1; i < group.length - 1; i++) {
      eqString += `${group[group.length - 1]}${group[i]}`;
    }
    sum += eval(eqString);
  }

  return sum;
}

const part2 = (data) => {
  console.log('Solving part 2...');

  const { formattedDataPadded } = data;

  let sum = 0;

  for (const group of formattedDataPadded) {
    let eqString = '';
    let numLength = group[0].length;
    for (let i = numLength - 1; i >= 0; i--) {
      for (let j = 0; j < group.length - 1; j++) {
        eqString += group[j][i];
      }
      if (i > 0)  eqString += group[group.length - 1];
    }
    sum += eval(eqString.split(/\s+/).join(''));
  }

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