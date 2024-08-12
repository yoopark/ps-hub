const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]); // 3 or 5
const arr = input.slice(1).map((row) => row.split(' '));

const DIRS = [
  [0, 1],
  [1, 0],
];

const getPossiblePaths = (n) => {
  const paths = [];

  const dfs = (path) => {
    const [y, x] = path[path.length - 1];
    if (y === n - 1 && x === n - 1) {
      paths.push(path);
      return;
    }

    for (const [dy, dx] of DIRS) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny < 0 || nx < 0 || ny >= n || nx >= n) {
        continue;
      }

      dfs([...path, [ny, nx]]);
    }
  };

  dfs([[0, 0]]);
  return paths;
};

const path2str = (path, n, arr) => {
  return path.map(([y, x]) => arr[y][x]).join('');
};

const eval = (s) => {
  let ret = Number(s[0]);

  for (let i = 1; i < s.length - 1; i += 2) {
    const op = s[i];
    const num = Number(s[i + 1]);

    if (op === '+') {
      ret += num;
    } else if (op === '-') {
      ret -= num;
    } else if (op === '*') {
      ret *= num;
    }
  }

  return ret;
};

const calculateMaxResult = (n, arr) => {
  const paths = getPossiblePaths(n);
  const strs = paths.map((path) => path2str(path, n, arr));

  return Math.max(...strs.map(eval));
};

const calculateMinResult = (n, arr) => {
  const paths = getPossiblePaths(n);
  const strs = paths.map((path) => path2str(path, n, arr));

  return Math.min(...strs.map(eval));
};

const solution = (n, arr) => {
  const maxResult = calculateMaxResult(n, arr);
  const minResult = calculateMinResult(n, arr);

  return `${maxResult} ${minResult}`;
};

console.log(solution(n, arr));
