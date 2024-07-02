const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, c] = input[0].split(' ').map(Number);

const houses = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

const solution = (n, c, houses) => {
  let left = 1;
  let right = houses[houses.length - 1] - houses[0];
  let answer = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 최소 갭 후보

    // house[0]은 반드시 설치하는게 유리
    let cnt = 1;
    let prev = houses[0];

    for (let i = 1; i < n; i++) {
      if (houses[i] - prev >= mid) {
        cnt += 1;
        prev = houses[i];
      }
    }

    if (cnt >= c) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
};

console.log(solution(n, c, houses));
