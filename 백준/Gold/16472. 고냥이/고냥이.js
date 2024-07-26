const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);

const s = input[1];

const getAlphabetIndex = (c) => c.charCodeAt(0) - 97;

const solution = (n, s) => {
  // two pointer with O(n)
  let left = 0;
  let right = 0;

  const counter = Array.from({ length: 26 }, () => 0);
  let counterCnt = 0;

  let max = 0;

  while (right < s.length) {
    const idx = getAlphabetIndex(s[right]);

    if (counter[idx] === 0) {
      counterCnt += 1;
    }

    counter[idx] += 1;

    while (counterCnt > n) {
      const leftIdx = getAlphabetIndex(s[left]);

      counter[leftIdx] -= 1;

      if (counter[leftIdx] === 0) {
        counterCnt -= 1;
      }

      left += 1;
    }

    max = Math.max(max, right - left + 1);

    right += 1;
  }

  return max;
};

console.log(solution(n, s));
