# Advent of Code 2025

My JavaScript solutions for [Advent of Code 2025](https://adventofcode.com/2025).

## Project Structure

```
advent-of-code-2025/
├── solutions/          # Daily solution files (day01.js, day02.js, etc.)
├── lib/               # Utility functions and common algorithms
├── inputs/            # Input files for each day
├── examples/          # Example inputs from problem descriptions
├── tests/             # Test files for solutions
├── scripts/           # Helper scripts for setup and automation
├── package.json       # Node.js dependencies and scripts
└── README.md         # This file
```

## Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Set up your session cookie (optional, for automatic input downloading):
   ```bash
   export AOC_SESSION_COOKIE="your_session_cookie_here"
   ```

3. Run a solution:
   ```bash
   node solutions/day01.js
   # or
   npm run day 1
   ```

## Scripts

- `npm run new <day>` - Generate template files for a new day
- `npm run day <day>` - Run a specific day's solution
- `npm run download <day>` - Download input for a specific day
- `npm run test` - Run all tests
- `npm run benchmark` - Benchmark solution performance

## Usage

### Creating a new day
```bash
npm run new 1
```

### Running a solution
```bash
npm run day 1
```

### Running tests
```bash
npm test
```

## Progress

| Day | Part 1 | Part 2 | Notes |
|-----|--------|--------|-------|
| 1   | ⭐     | ⭐     |       |
| 2   |        |        |       |
| ... |        |        |       |

## Notes

- Solutions are optimized for readability first, performance second
- Each solution includes example test cases
- Common algorithms and data structures are in the `lib/` directory
- Uses ES6+ features and modern JavaScript practices