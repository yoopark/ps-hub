const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +input[0];
const [l, r] = input[1].split(' ').map(Number);
const m = +input[2];
const arr = input.slice(3).map(Number);

const solution = (n, l, r, m, arr) => {
  const dp = Array.from(Array(m + 1), () => Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity)));

  dp[0][l][r] = 0;

  for (let i = 0; i < m; i++) {
    const target = arr[i];
    for (let l = 1; l <= n; l++) {
      for (let r = l + 1; r <= n; r++) {
        if (dp[i][l][r] === Infinity) {
          continue;
        }

        // 아 모르겠다 공부해야겠다
        if (target < r) {
          const diff = Math.abs(l - target);
          dp[i + 1][target][r] = Math.min(dp[i + 1][target][r], dp[i][l][r] + diff);
        }

        if (target > l) {
          const diff = Math.abs(r - target);
          dp[i + 1][l][target] = Math.min(dp[i + 1][l][target], dp[i][l][r] + diff);
        }
      }
    }
  }

  return Math.min(...dp[m].map((row) => Math.min(...row)));
};

console.log(solution(n, l, r, m, arr));
