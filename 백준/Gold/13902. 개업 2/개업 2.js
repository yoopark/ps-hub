const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const s = input[1].split(' ').map(Number);

const solution = (n, m, s) => {
  const dp = Array(20001).fill(Infinity);

  for (let leftIdx = 0; leftIdx < m; leftIdx++) {
    dp[s[leftIdx]] = 1;
    for (let rightIdx = leftIdx + 1; rightIdx < m; rightIdx++) {
      dp[s[leftIdx] + s[rightIdx]] = 1;
    }
  }

  for (let left = 1; left <= n; left++) {
    if (dp[left] === 1) {
      continue;
    }

    for (let right = 1; right <= Math.floor(left / 2); right++) {
      if (dp[right] === -1 || dp[left - right] === -1) {
        continue; // impossible
      }

      dp[left] = Math.min(dp[left], dp[right] + dp[left - right]);
    }

    if (dp[left] === Infinity) {
      dp[left] = -1;
    }
  }

  return dp[n];
};

console.log(solution(n, m, s));
