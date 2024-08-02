const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const board = input.slice(1).map((row) => row.split(' ').map(Number));

const solution = (n, board) => {
  const dp = Array.from({ length: n }, () => Array(n).fill(Infinity));
  dp[0][0] = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Move right
      if (j + 1 < n) {
        const cost = board[i][j + 1] >= board[i][j] ? board[i][j + 1] - board[i][j] + 1 : 0;
        dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + cost);
      }

      // Move down
      if (i + 1 < n) {
        const cost = board[i + 1][j] >= board[i][j] ? board[i + 1][j] - board[i][j] + 1 : 0;
        dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + cost);
      }
    }
  }

  return dp[n - 1][n - 1];
};

console.log(solution(n, board));
