// Ref. https://cheon2308.tistory.com/entry/%EB%B0%B1%EC%A4%80-1757%EB%B2%88-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EB%8B%AC%EB%A0%A4%EB%8B%AC%EB%A0%A4

const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const dist = input.slice(1).map(Number);

// 쉬기 시작하면 지침지수가 0이 되기 전에는 다시 달릴 수가 없다.

const solution = (n, m, dist) => {
  // [time][tiredness]
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0)); // 1-indexed

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = dp[i - 1][j - 1] + dist[i - 1]; // 달리기
    }

    for (let j = 1; j <= m; j++) {
      if (i - j < 0) {
        break;
      }
      dp[i][0] = Math.max(dp[i][0], dp[i - j][j], dp[i - j][0]); // 쉬기
    }
  }

  return dp[n][0];
};

console.log(solution(n, m, dist));
