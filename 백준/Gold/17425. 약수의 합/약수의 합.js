const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const tc = Number(input[0]);
const nums = input.slice(1).map(Number);

const solution = (n) => {
  return acc[n];
};

const acc = Array(1000001).fill(0);

for (let i = 1; i <= 1000000; i++) {
  // !!!
  for (let j = 1; i * j <= 1000000; j++) {
    acc[i * j] += i;
  }

  acc[i] += acc[i - 1];
}

console.log(nums.map((n) => solution(n)).join('\n'));
