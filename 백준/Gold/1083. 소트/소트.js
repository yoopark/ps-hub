const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const s = Number(input[2]);

const getMaxIdx = (arr) => {
  let maxIdx = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[maxIdx]) {
      maxIdx = i;
    }
  }

  return maxIdx;
};

// 사전 뒷순서
const solution = (n, arr, s) => {
  let swapLeft = s;

  for (let i = 0; i < arr.length; i++) {
    const maxIdx = i + getMaxIdx(arr.slice(i, i + swapLeft + 1));

    for (let j = maxIdx; j > i; j--) {
      if (swapLeft === 0) {
        break;
      }

      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      swapLeft--;
    }

    if (swapLeft === 0) {
      break;
    }
  }

  return arr;
};

console.log(solution(n, arr, s).join(' '));
