const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const s = input[0];
const m = Number(input[1]);
const lst = input
  .slice(2)
  .map((row) => {
    const [key, value] = row.split(' ');

    return [key, Number(value)];
  })
  .filter(([key, value]) => key.length <= value);

// dp
const solution = (s, m, lst) => {
  const cache = Array.from({ length: s.length }, () => -1);

  const bt = (idx) => {
    if (idx == s.length) {
      return 0;
    }

    if (cache[idx] !== -1) {
      return cache[idx];
    }

    let ret = bt(idx + 1) + 1;

    // bt
    for (const [key, value] of lst) {
      if (s.slice(idx, idx + key.length) === key) {
        ret = Math.max(ret, bt(idx + key.length) + value);
      }
    }

    cache[idx] = ret;

    return ret;
  };

  return bt(0);
};

console.log(solution(s, m, lst));
