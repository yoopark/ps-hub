const { readFileSync } = require('fs');
const { get } = require('http');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, t] = input[0].split(' ').map(Number);
const holds = input.slice(1).map((row) => row.split(' ').map(Number));

const dirs = [
  [-2, -2],
  [-2, -1],
  [-2, 0],
  [-2, 1],
  [-2, 2],
  [-1, -2],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [-1, 2],
  [0, -2],
  [0, -1],
  [0, 1],
  [0, 2],
  [1, -2],
  [1, -1],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, -2],
  [2, -1],
  [2, 0],
  [2, 1],
  [2, 2],
];

const getCoordinateKey = (x, y) => `${x},${y}`;

const getCoordinateIndexObject = (coordinates) => {
  const ret = {};

  coordinates.forEach(([x, y], index) => {
    ret[getCoordinateKey(x, y)] = index;
  });

  return ret;
};

// bfs with graph
const solution = (n, t, holds) => {
  const visited = Array.from({ length: n + 1 }, () => false);
  const dict = getCoordinateIndexObject([[0, 0], ...holds]);

  const queue = [[0, 0, 0]];
  visited[0] = true;

  while (queue.length !== 0) {
    const [x, y, dist] = queue.shift();

    if (y === t) {
      return dist;
    }

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || ny < 0 || ny > t) {
        continue;
      }

      const key = getCoordinateKey(nx, ny);
      const idx = dict[key];

      if (idx === undefined) {
        continue;
      }

      if (visited[idx]) {
        continue;
      }

      visited[idx] = true;

      queue.push([nx, ny, dist + 1]);
    }
  }

  return -1;
};

console.log(solution(n, t, holds));
