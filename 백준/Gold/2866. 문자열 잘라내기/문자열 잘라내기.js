const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [r, c] = input[0].split(' ').map(Number);
const strs = input.slice(1);

const checkIsDuplicated = (strs) => {
  const set = new Set();

  for (let i = 0; i < strs.length; i++) {
    if (set.has(strs[i])) {
      return true;
    }
    set.add(strs[i]);
  }

  return false;
};

const getTransposedStrs = (strs) => {
  const result = Array.from({ length: strs[0].length }, () => '');

  for (let i = 0; i < strs.length; i++) {
    for (let j = 0; j < strs[i].length; j++) {
      result[j] += strs[i][j];
    }
  }

  return result;
};

const solution = (r, c, strs) => {
  const transposedStrs = getTransposedStrs(strs); // 매 이터레이션마다 생성하면 메모리 초과

  for (let i = 0; i < r - 1; i++) {
    if (checkIsDuplicated(transposedStrs.map((str) => str.slice(i + 1)))) {
      return i;
    }
  }

  return r - 1;
};

console.log(solution(r, c, strs));
