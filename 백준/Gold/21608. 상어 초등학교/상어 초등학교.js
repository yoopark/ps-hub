const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));

const DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const decideSeat = (n, seats, likes) => {
  const candidates = [];

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (seats[y][x] !== 0) {
        continue;
      }

      let adjacentLikeUserCount = 0;
      let adjacentEmptyCount = 0;

      for (const [dy, dx] of DIRS) {
        const [ny, nx] = [y + dy, x + dx];

        if (!(0 <= ny && ny < n && 0 <= nx && nx < n)) {
          continue;
        }

        if (seats[ny][nx] === 0) {
          adjacentEmptyCount++;
        } else if (likes.includes(seats[ny][nx])) {
          adjacentLikeUserCount++;
        }
      }

      candidates.push({ adjacentLikeUserCount, adjacentEmptyCount, y, x });
    }
  }

  console.assert(candidates.length !== 0);

  candidates.sort((a, b) => {
    if (a.adjacentLikeUserCount !== b.adjacentLikeUserCount) {
      return b.adjacentLikeUserCount - a.adjacentLikeUserCount;
    }

    if (a.adjacentEmptyCount !== b.adjacentEmptyCount) {
      return b.adjacentEmptyCount - a.adjacentEmptyCount;
    }

    if (a.y !== b.y) {
      return a.y - b.y;
    }

    console.assert(b.x - a.x !== 0);

    return a.x - b.x; // cannot be 0
  });

  return [candidates[0].y, candidates[0].x];
};

const convertAdjacentLikeUserCountToSatisfaction = (adjacentLikeUserCount) => {
  switch (adjacentLikeUserCount) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 10;
    case 3:
      return 100;
    case 4:
      return 1000;
    default:
      throw new Error('Invalid adjacentLikeUserCount');
  }
};

const calculateTotalSatisfaction = (n, seats, likeMap) => {
  let ret = 0;

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      let adjacentLikeUserCount = 0;
      const likes = likeMap[seats[y][x]];

      for (const [dy, dx] of DIRS) {
        const [ny, nx] = [y + dy, x + dx];

        if (!(0 <= ny && ny < n && 0 <= nx && nx < n)) {
          continue;
        }

        if (likes.includes(seats[ny][nx])) {
          adjacentLikeUserCount++;
        }
      }

      ret += convertAdjacentLikeUserCountToSatisfaction(adjacentLikeUserCount);
    }
  }

  return ret;
};

const solution = (n, arr) => {
  const seats = Array.from({ length: n }, () => Array(n).fill(0)); // 0: empty

  for (const [studentNumber, ...likes] of arr) {
    const [y, x] = decideSeat(n, seats, likes);
    seats[y][x] = studentNumber;
  }

  const likeMap = {};
  for (const [studentNumber, ...likes] of arr) {
    likeMap[studentNumber] = likes;
  }

  return calculateTotalSatisfaction(n, seats, likeMap);
};

console.log(solution(n, arr));
