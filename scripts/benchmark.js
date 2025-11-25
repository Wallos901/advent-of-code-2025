#!/usr/bin/env node

import { readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { performance } from 'perf_hooks';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const solutionsDir = join(projectRoot, 'solutions');

async function runSolution(file) {
  return new Promise((resolve) => {
    const start = performance.now();
    const child = spawn('node', [join(solutionsDir, file)], {
      stdio: 'pipe',
      cwd: projectRoot
    });
    
    let output = '';
    let error = '';
    
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    child.on('close', (code) => {
      const end = performance.now();
      const duration = end - start;
      
      resolve({
        file,
        duration,
        success: code === 0,
        output: output.trim(),
        error: error.trim()
      });
    });
  });
}

async function benchmark() {
  try {
    console.log('🎄 Benchmarking all solutions...\n');
    
    const files = await readdir(solutionsDir);
    const solutionFiles = files
      .filter(file => file.match(/^day\d{2}\.js$/))
      .sort();
    
    if (solutionFiles.length === 0) {
      console.log('No solution files found in solutions/ directory');
      return;
    }
    
    const results = [];
    
    for (const file of solutionFiles) {
      const result = await runSolution(file);
      results.push(result);
      
      if (result.success) {
        console.log(`✅ ${file}: ${result.duration.toFixed(2)}ms`);
      } else {
        console.log(`❌ ${file}: Failed`);
        if (result.error) {
          console.log(`   Error: ${result.error.split('\n')[0]}`);
        }
      }
    }
    
    console.log('\n📊 Summary:');
    console.log('='.repeat(50));
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`Completed: ${successful.length}/${results.length} solutions`);
    
    if (successful.length > 0) {
      const totalTime = successful.reduce((sum, r) => sum + r.duration, 0);
      const avgTime = totalTime / successful.length;
      const fastest = successful.reduce((min, r) => r.duration < min.duration ? r : min);
      const slowest = successful.reduce((max, r) => r.duration > max.duration ? r : max);
      
      console.log(`Total time: ${totalTime.toFixed(2)}ms`);
      console.log(`Average time: ${avgTime.toFixed(2)}ms`);
      console.log(`Fastest: ${fastest.file} (${fastest.duration.toFixed(2)}ms)`);
      console.log(`Slowest: ${slowest.file} (${slowest.duration.toFixed(2)}ms)`);
    }
    
    if (failed.length > 0) {
      console.log(`\n❌ Failed solutions: ${failed.map(r => r.file).join(', ')}`);
    }
    
  } catch (error) {
    console.error('Error running benchmark:', error.message);
  }
}

benchmark();