const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const arr = input.slice(1).map((row) => row.split(' ').map(Number));

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const isValidRange = (x, n) => 0 <= x && x < n;

const isValidPos = (y, x) => isValidRange(y, n) && isValidRange(x, n);

const getNextPos = (y, x, n) => {
  if (x + 1 === n) {
    return [y + 1, 0];
  }

  return [y, x + 1];
};

const checkIsLastPos = (y, x, n) => y === n - 1 && x === n - 1;

const initBoard = (arr, n, candidate) => {
  const board = arr.map((row) => [...row]);

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      board[y][x] = board[y][x] === 1 ? '-' : -1;
    }
  }

  for (const [y, x] of candidate) {
    board[y][x] = 0;
  }

  return board;
};

const checkIsAllInfected = (board, n) => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (board[y][x] === -1) {
        return false;
      }
    }
  }

  return true;
};

const get2DMax = (arr, n) => {
  let ret = 0;

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      ret = Math.max(ret, arr[y][x]);
    }
  }

  return ret;
};

// 1 <= m <= #(2) <= 10 이므로, bf 가능
const getVirusCandidates = (arr, n, m) => {
  const candidates = [];

  const dfs = (y, x, count, acc) => {
    if (count === m) {
      candidates.push(acc);
      return;
    }

    for (let idx = y * n + x; idx < n * n; idx++) {
      const [i, j] = [Math.floor(idx / n), idx % n];

      if (arr[i][j] === 2 && !checkIsLastPos(i, j, n)) {
        const [ni, nj] = getNextPos(i, j, n);
        dfs(ni, nj, count + 1, [...acc, [i, j]]);
      }
    }
  };

  // dfs(0, 0, 0, []); // Wrong

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (arr[y][x] === 2) {
        dfs(y, x, 1, [[y, x]]);
      }
    }
  }

  return candidates;
};

const getInfectionTime = (arr, n, candidate) => {
  const bfs = (board, candidate) => {
    const q = [];

    for (const [y, x] of candidate) {
      q.push([y, x]);
    }

    while (q.length > 0) {
      const [cy, cx] = q.shift();

      for (const [dy, dx] of DIRS) {
        const [ny, nx] = [cy + dy, cx + dx];

        if (!isValidPos(ny, nx)) {
          continue;
        }

        if (board[ny][nx] === -1) {
          board[ny][nx] = board[cy][cx] + 1;
          q.push([ny, nx]);
        }
      }
    }
  };

  const board = initBoard(arr, n, candidate);

  bfs(board, candidate);

  if (!checkIsAllInfected(board, n)) {
    return -1;
  }

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (board[y][x] === '-') {
        board[y][x] = 0;
      }
    }
  }

  return get2DMax(board, n);
};

const solution = (n, m, arr) => {
  const candidates = getVirusCandidates(arr, n, m);

  let ret = Infinity;

  for (const candidate of candidates) {
    const t = getInfectionTime(arr, n, candidate);

    if (t !== -1) {
      ret = Math.min(ret, t);
    }
  }

  return ret === Infinity ? -1 : ret;
};

console.log(solution(n, m, arr));
