const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map(Number);

const fireballs = input.slice(1).map((row) => row.split(' ').map(Number));

const DIRS = [
  { y: -1, x: 0 }, // 0
  { y: -1, x: 1 }, // 1
  { y: 0, x: 1 }, // 2
  { y: 1, x: 1 }, // 3
  { y: 1, x: 0 }, // 4
  { y: 1, x: -1 }, // 5
  { y: 0, x: -1 }, // 6
  { y: -1, x: -1 }, // 7
];

const NEXT_DIRS = {
  UP_DOWN_LEFT_RIGHT: [0, 2, 4, 6],
  DIAGONAL: [1, 3, 5, 7],
};

// support negative modulo operation
const mod = (a, b) => ((a % b) + b) % b;

const calculateStatusAfterFireballDivided = (fireballs) => {
  let mass = 0;
  let speed = 0;
  let count = 0;
  let evenCount = 0;

  for (const [m, s, d] of fireballs) {
    mass += m;
    speed += s;
    count += 1;
    if (d % 2 === 0) {
      evenCount += 1;
    }
  }

  const nextMass = Math.floor(mass / 5);
  const nextSpeed = Math.floor(speed / count);
  const nextDirs = evenCount === 0 || evenCount === count ? NEXT_DIRS.UP_DOWN_LEFT_RIGHT : NEXT_DIRS.DIAGONAL;

  return { nextMass, nextSpeed, nextDirs };
};

// life game
const solution = (n, m, k, fireballs) => {
  let board = Array.from({ length: n }, () => Array.from({ length: n }, () => []));

  // initialize
  for (const [y, x, mass, speed, dir] of fireballs) {
    board[y - 1][x - 1].push([mass, speed, dir]);
  }

  for (let turn = 0; turn < k; turn++) {
    let nextBoard = Array.from({ length: n }, () => Array.from({ length: n }, () => []));

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        for (const [mass, speed, dir] of board[y][x]) {
          const ny = mod(y + DIRS[dir].y * speed, n);
          const nx = mod(x + DIRS[dir].x * speed, n);

          nextBoard[ny][nx].push([mass, speed, dir]);
        }
      }
    }

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (nextBoard[y][x].length < 2) {
          continue;
        }

        const { nextMass, nextSpeed, nextDirs } = calculateStatusAfterFireballDivided(nextBoard[y][x]);

        if (nextMass === 0) {
          nextBoard[y][x] = [];
          continue;
        }

        const nextFireballs = [];

        for (const nextDir of nextDirs) {
          nextFireballs.push([nextMass, nextSpeed, nextDir]);
        }

        nextBoard[y][x] = nextFireballs;
      }
    }

    board = nextBoard;
  }

  let answer = 0;

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      for (let [mass] of board[y][x]) {
        answer += mass;
      }
    }
  }

  return answer;
};

console.log(solution(n, m, k, fireballs));
