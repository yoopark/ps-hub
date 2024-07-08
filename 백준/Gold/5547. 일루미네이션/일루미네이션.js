const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [w, h] = input[0].split(' ').map(Number);

const boards = input.slice(1).map((row) => row.split(' ').map(Number));

const DEFAULT_DIRS = [
  { y: 0, x: -1 },
  { y: 0, x: 1 },
  { y: 1, x: 0 },
  { y: -1, x: 0 },
];

const DIRS = {
  ODD: [...DEFAULT_DIRS, { y: -1, x: 1 }, { y: 1, x: 1 }],
  EVEN: [...DEFAULT_DIRS, { y: -1, x: -1 }, { y: 1, x: -1 }],
};

const isEven = (n) => n % 2 === 0;

// 한 칸 더 감싼 뒤 건물 없는 곳을 BFS
const solution = (w, h, boards) => {
  const visited = Array.from({ length: h + 2 }, () => Array(w + 2).fill(false));

  const newBoards = Array.from({ length: h + 2 }, () => Array(w + 2).fill(0));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      newBoards[y + 1][x + 1] = boards[y][x];
    }
  }

  let answer = 0;

  const queue = [{ y: 0, x: 0 }];

  while (queue.length) {
    const { y, x } = queue.shift();

    if (visited[y][x]) {
      continue;
    }

    visited[y][x] = true;

    const dirs = isEven(y) ? DIRS.EVEN : DIRS.ODD;

    for (const dir of dirs) {
      const ny = y + dir.y;
      const nx = x + dir.x;

      if (ny < 0 || nx < 0 || ny > h + 1 || nx > w + 1) {
        continue;
      }

      if (newBoards[ny][nx]) {
        answer += 1;
        continue;
      }

      queue.push({ y: ny, x: nx });
    }
  }

  return answer;
};

console.log(solution(w, h, boards));
