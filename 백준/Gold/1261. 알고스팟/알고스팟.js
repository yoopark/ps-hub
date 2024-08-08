const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
// n과 m이 반대로 들어옴

const maze = input.slice(1).map((row) => row.split('').map(Number));

const DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// 0-1 bfs
const solution = (n, m, maze) => {
  const visited = Array.from(new Array(m), () => new Array(n).fill(-1));

  const q = [];
  q.push([0, 0]);
  visited[0][0] = 0;

  while (q.length !== 0) {
    const [y, x] = q.shift();

    for (const [dy, dx] of DIRS) {
      const [ny, nx] = [y + dy, x + dx];

      if (!(0 <= ny && ny < m && 0 <= nx && nx < n)) {
        continue;
      }

      if (visited[ny][nx] !== -1) {
        continue;
      }

      if (maze[ny][nx] === 0) {
        visited[ny][nx] = visited[y][x];
        q.unshift([ny, nx]); // push to front
      } else {
        visited[ny][nx] = visited[y][x] + 1;
        q.push([ny, nx]);
      }
    }
  }

  return visited[m - 1][n - 1];
};

console.log(solution(n, m, maze));
