const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const arr = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

// 어떤 수가 '다른 수' '두 개'의 합으로 나타낼 수 있는지 여부
// 둘 다 다른 수여야 함
// 수의 idx만 다르면 다른 수

// two pointers
const isGoodNumber = (target, targetIdx, arr) => {
  if (arr.length <= 1) {
    return false;
  }

  // [l, r] = [0, 1] 아님 주의
  let [l, r] = [0, n - 1];

  while (l < r) {
    const sum = arr[l] + arr[r];

    if (sum === target) {
      if (l === targetIdx) {
        l += 1;
        continue;
      }

      if (r === targetIdx) {
        r -= 1;
        continue;
      }

      return true;
    }

    if (sum < target) {
      l += 1;
    } else {
      r -= 1;
    }
  }

  return false;
};

const solution = (n, arr) => {
  return arr.filter((n, idx) => isGoodNumber(n, idx, arr)).length;
};

console.log(solution(n, arr));
