import { readInput } from '../lib/input.js';
import { performance } from 'perf_hooks';
import { euclideanDistance3D } from '../lib/utils.js';

const DAY = 8;

const parseInput = (input) => {
  return input.split('\n').map(line => line.split(',').map(Number));
}

const part1 = (data) => {
  console.log('Solving part 1...');

  const circuits = data.map((_, i) => [i]); // Tracks what points are connected in each circuit
  const closestPoints = []; // Tracks which point is closest to each point
  const connectionsClosed = new Set(); // Tracks which connections have been made already

  let connection = 0;
  while (connection < 1000) {
    // Find the closest connection for all points (not yet connected)
    for (let i = 0; i < data.length; i++) {
      let currentClosestDistance = Infinity;
      let currentClosestPoint = null;
      for (let j = i + 1; j < data.length; j++) {
        const distance = euclideanDistance3D(data[i], data[j]);
        if (distance < currentClosestDistance && !connectionsClosed.has(`${i}-${j}`) && !connectionsClosed.has(`${j}-${i}`)) {
          currentClosestDistance = distance;
          currentClosestPoint = j;
        }
      }
      closestPoints.push({ pointA: i, pointB: currentClosestPoint, distance: currentClosestDistance });
    }
    // Find the lowest distance connection that hasn't been made yet
    closestPoints.sort((a, b) => a.distance - b.distance);
    // Connect those two points and update the circuits
    const pointACircuitIndex = circuits.findIndex(circuit => circuit.includes(closestPoints[0].pointA));
    const pointBCircuitIndex = circuits.findIndex(circuit => circuit.includes(closestPoints[0].pointB));
    if (pointACircuitIndex !== pointBCircuitIndex) {
      circuits[pointACircuitIndex] = circuits[pointACircuitIndex].concat(circuits[pointBCircuitIndex]);
      circuits.splice(pointBCircuitIndex, 1);
    }
    connectionsClosed.add(`${closestPoints[0].pointA}-${closestPoints[0].pointB}`);
    closestPoints.length = 0;

    connection += 1;
  }

  circuits.sort((a, b) => b.length - a.length);

  let sum = 1;
  for (let i = 0; i < 3; i++) {
    sum *= circuits[i].length;
  }

  return sum;
}

const part2 = (data) => {
  console.log('Solving part 2...');

  const circuits = data.map((_, i) => [i]); // Tracks what points are connected in each circuit
  const closestPoints = []; // Tracks which point is closest to each point
  const connectionsClosed = new Set(); // Tracks which connections have been made already

  let lastPointA = null;
  let lastPointB = null;
  while (circuits.length > 1) {
    // Find the closest connection for all points (not yet connected)
    for (let i = 0; i < data.length; i++) {
      let currentClosestDistance = Infinity;
      let currentClosestPoint = null;
      for (let j = i + 1; j < data.length; j++) {
        const distance = euclideanDistance3D(data[i], data[j]);
        if (distance < currentClosestDistance && !connectionsClosed.has(`${i}-${j}`) && !connectionsClosed.has(`${j}-${i}`)) {
          currentClosestDistance = distance;
          currentClosestPoint = j;
        }
      }
      closestPoints.push({ pointA: i, pointB: currentClosestPoint, distance: currentClosestDistance });
    }
    // Find the lowest distance connection that hasn't been made yet
    closestPoints.sort((a, b) => a.distance - b.distance);
    // Store the connection just in case it is the last one we need to do
    lastPointA = data[closestPoints[0].pointA];
    lastPointB = data[closestPoints[0].pointB];
    // Connect those two points and update the circuits
    const pointACircuitIndex = circuits.findIndex(circuit => circuit.includes(closestPoints[0].pointA));
    const pointBCircuitIndex = circuits.findIndex(circuit => circuit.includes(closestPoints[0].pointB));
    if (pointACircuitIndex !== pointBCircuitIndex) {
      circuits[pointACircuitIndex] = circuits[pointACircuitIndex].concat(circuits[pointBCircuitIndex]);
      circuits.splice(pointBCircuitIndex, 1);
    }
    connectionsClosed.add(`${closestPoints[0].pointA}-${closestPoints[0].pointB}`);
    closestPoints.length = 0;
  }

  return lastPointA[0] * lastPointB[0];
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