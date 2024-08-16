const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);

const arr = input.slice(1);

const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);

const solution = (n, arr) => {
  const dict = {
    A: { n: 0, isFirstDigit: false },
    B: { n: 0, isFirstDigit: false },
    C: { n: 0, isFirstDigit: false },
    D: { n: 0, isFirstDigit: false },
    E: { n: 0, isFirstDigit: false },
    F: { n: 0, isFirstDigit: false },
    G: { n: 0, isFirstDigit: false },
    H: { n: 0, isFirstDigit: false },
    I: { n: 0, isFirstDigit: false },
    J: { n: 0, isFirstDigit: false },
  };

  for (const str of arr) {
    let digit = 1;

    for (let i = str.length - 1; i >= 0; i--) {
      const char = str[i];
      dict[char].n += 1 * digit;

      if (i === 0 && !dict[char].isFirstDigit) {
        dict[char].isFirstDigit = true;
      }

      digit *= 10;
    }
  }

  const entries = Object.entries(dict)
    .map(([key, value]) => {
      return {
        key,
        value: value.n,
        isFirstDigit: value.isFirstDigit,
      };
    })
    .sort((a, b) => {
      if (a.value === b.value) {
        return a.isFirstDigit ? -1 : 1;
      }

      return b.value - a.value;
    });

  let zeroKey = '';

  for (const { key, value, isFirstDigit } of [...entries].reverse()) {
    if (isFirstDigit) {
      continue;
    }

    zeroKey = key;
    break;
  }

  let num = 9;
  for (const row of entries) {
    if (row.key === zeroKey) {
      dict[row.key].decision = 0;

      continue;
    }

    dict[row.key].decision = num;
    num -= 1;
  }

  return sum(Object.values(dict).map((row) => row.decision * row.n));
};

console.log(solution(n, arr));
