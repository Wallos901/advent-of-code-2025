/**
 * Utility functions for reading and parsing input files
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Read input file for a given day
 * @param {number} day - The day number (1-25)
 * @param {string} type - File type: 'input' or 'example'
 * @returns {string} Raw file content
 */
export function readInput(day, type = 'input') {
  const paddedDay = day.toString().padStart(2, '0');
  const filename = type === 'example' ? `day${paddedDay}_example.txt` : `day${paddedDay}.txt`;
  const filepath = join(__dirname, '..', type === 'example' ? 'examples' : 'inputs', filename);
  
  try {
    return readFileSync(filepath, 'utf-8').trim();
  } catch (error) {
    throw new Error(`Could not read ${type} file for day ${day}: ${error.message}`);
  }
}

/**
 * Parse input into lines
 * @param {string} input - Raw input string
 * @returns {string[]} Array of lines
 */
export function parseLines(input) {
  return input.split('\n').filter(line => line.length > 0);
}

/**
 * Parse input into numbers (one per line)
 * @param {string} input - Raw input string
 * @returns {number[]} Array of numbers
 */
export function parseNumbers(input) {
  return parseLines(input).map(Number);
}

/**
 * Parse input into a 2D grid of characters
 * @param {string} input - Raw input string
 * @returns {string[][]} 2D array of characters
 */
export function parseGrid(input) {
  return parseLines(input).map(line => line.split(''));
}

/**
 * Parse input into integers separated by delimiters
 * @param {string} input - Raw input string
 * @param {string|RegExp} delimiter - Delimiter to split on (default: /\s+/)
 * @returns {number[][]} Array of number arrays
 */
export function parseIntGrid(input, delimiter = /\s+/) {
  return parseLines(input).map(line => 
    line.split(delimiter).map(Number).filter(n => !isNaN(n))
  );
}

/**
 * Parse comma-separated values
 * @param {string} input - Raw input string
 * @returns {string[]} Array of values
 */
export function parseCSV(input) {
  return input.split(',').map(s => s.trim());
}

/**
 * Parse comma-separated numbers
 * @param {string} input - Raw input string
 * @returns {number[]} Array of numbers
 */
export function parseCSVNumbers(input) {
  return parseCSV(input).map(Number);
}