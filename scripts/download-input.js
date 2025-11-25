#!/usr/bin/env node

import axios from 'axios';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function downloadInput(day) {
  const sessionCookie = process.env.AOC_SESSION_COOKIE;
  
  if (!sessionCookie) {
    console.error('❌ AOC_SESSION_COOKIE environment variable not set');
    console.log('To download inputs automatically:');
    console.log('1. Log in to https://adventofcode.com');
    console.log('2. Open browser dev tools (F12)');
    console.log('3. Go to Application/Storage > Cookies > https://adventofcode.com');
    console.log('4. Copy the value of the "session" cookie');
    console.log('5. Set it as an environment variable:');
    console.log('   export AOC_SESSION_COOKIE="your_cookie_value"');
    return;
  }
  
  const paddedDay = day.toString().padStart(2, '0');
  const inputPath = join(projectRoot, 'inputs', `day${paddedDay}.txt`);
  
  if (existsSync(inputPath)) {
    const fs = await import('fs');
    const content = fs.readFileSync(inputPath, 'utf-8');
    if (content.trim().length > 0) {
      console.log(`⚠️  Input file already exists and has content: inputs/day${paddedDay}.txt`);
      return;
    }
  }
  
  try {
    console.log(`📥 Downloading input for day ${day}...`);
    
    const response = await axios.get(`https://adventofcode.com/2025/day/${day}/input`, {
      headers: {
        'Cookie': `session=${sessionCookie}`,
        'User-Agent': 'advent-of-code-setup-script'
      }
    });
    
    writeFileSync(inputPath, response.data);
    console.log(`✅ Input downloaded successfully: inputs/day${paddedDay}.txt`);
    
  } catch (error) {
    if (error.response?.status === 404) {
      console.error(`❌ Day ${day} input not available yet`);
    } else if (error.response?.status === 400) {
      console.error('❌ Invalid session cookie');
    } else {
      console.error(`❌ Failed to download input: ${error.message}`);
    }
  }
}

// Parse command line arguments
const day = parseInt(process.argv[2]);

if (!day || day < 1 || day > 25) {
  console.error('Usage: npm run download <day>');
  console.error('Day must be a number between 1 and 25');
  process.exit(1);
}

downloadInput(day);