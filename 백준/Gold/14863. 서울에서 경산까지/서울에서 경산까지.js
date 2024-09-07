const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));

const solution = (n, k, arr) => {
  const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

  const rec = (y, x) => {
    if (y === n) {
      return 0;
    }

    if (dp[y][x] !== 0) {
      return dp[y][x];
    }

    let ret = -Infinity;

    if (x >= arr[y][0]) {
      ret = Math.max(ret, rec(y + 1, x - arr[y][0]) + arr[y][1]);
    }

    if (x >= arr[y][2]) {
      ret = Math.max(ret, rec(y + 1, x - arr[y][2]) + arr[y][3]);
    }

    dp[y][x] = ret;

    return ret;
  };

  return rec(0, k);
};

console.log(solution(n, k, arr));
