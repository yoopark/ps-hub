const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);

const nums = [1, 2, 3];

const checkIsGoodSequence = (str) => {
  for (let i = 1; i <= Math.floor(str.length / 2); i++) {
    if (str.slice(-i) === str.slice(-2 * i, -i)) {
      // 나쁜 수열
      return false;
    }
  }
  return true;
};

const solution = (n) => {
  const bt = (str) => {
    if (!checkIsGoodSequence(str)) {
      return null;
    }

    if (str.length === n) {
      return str;
    }

    for (const num of nums) {
      const ret = bt(str + num.toString());

      if (ret !== null) {
        return ret;
      }
    }

    return null;
  };

  return bt('');
};

console.log(solution(n));
