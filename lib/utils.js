/**
 * Common mathematical and utility functions for Advent of Code
 */

/**
 * Calculate the greatest common divisor of two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

/**
 * Calculate the least common multiple of two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculate the sum of an array of numbers
 * @param {number[]} arr
 * @returns {number}
 */
export function sum(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * Calculate the product of an array of numbers
 * @param {number[]} arr
 * @returns {number}
 */
export function product(arr) {
  return arr.reduce((acc, val) => acc * val, 1);
}

/**
 * Get unique elements from an array
 * @param {any[]} arr
 * @returns {any[]}
 */
export function unique(arr) {
  return [...new Set(arr)];
}

/**
 * Create a range of numbers
 * @param {number} start
 * @param {number} end - Exclusive
 * @param {number} step
 * @returns {number[]}
 */
export function range(start, end = null, step = 1) {
  if (end === null) {
    end = start;
    start = 0;
  }
  
  const result = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
}

/**
 * Count occurrences of elements in an array
 * @param {any[]} arr
 * @returns {Map<any, number>}
 */
export function counter(arr) {
  const counts = new Map();
  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return counts;
}

/**
 * Manhattan distance between two points
 * @param {number[]} p1 - [x, y]
 * @param {number[]} p2 - [x, y]
 * @returns {number}
 */
export function manhattanDistance(p1, p2) {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

/**
 * Euclidean distance between two points
 * @param {number[]} p1 - [x, y]
 * @param {number[]} p2 - [x, y]
 * @returns {number}
 */
export function euclideanDistance(p1, p2) {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Euclidean distance between two 3D points
 * @param {number[]} p1 - [x, y, z]
 * @param {number[]} p2 - [x, y, z]
 * @returns {number}
 */
export function euclideanDistance3D(p1, p2) {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  const dz = p1[2] - p2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Deep clone an object or array
 * @param {any} obj
 * @returns {any}
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if a point is within grid bounds
 * @param {number[]} point - [row, col]
 * @param {number} rows
 * @param {number} cols
 * @returns {boolean}
 */
export function inBounds(point, rows, cols) {
  const [r, c] = point;
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

/**
 * Get all 4-directional neighbors of a point
 * @param {number[]} point - [row, col]
 * @returns {number[][]}
 */
export function getNeighbors4(point) {
  const [r, c] = point;
  return [
    [r - 1, c], // up
    [r + 1, c], // down
    [r, c - 1], // left
    [r, c + 1]  // right
  ];
}

/**
 * Get all 8-directional neighbors of a point
 * @param {number[]} point - [row, col]
 * @returns {number[][]}
 */
export function getNeighbors8(point) {
  const [r, c] = point;
  return [
    [r - 1, c - 1], [r - 1, c], [r - 1, c + 1],
    [r, c - 1],                  [r, c + 1],
    [r + 1, c - 1], [r + 1, c], [r + 1, c + 1]
  ];
}

/**
 * Find the position of an element in a 2D grid
 * @param {any[][]} grid
 * @param {any} element
 * @returns {number[]|null} - [row, col] or null if not found
 */
export function findElementInGrid(grid, element) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === element) {
        return [r, c];
      }
    }
  }
  return null;
}