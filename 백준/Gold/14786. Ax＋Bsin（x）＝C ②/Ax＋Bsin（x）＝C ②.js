const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [a, b, c] = input[0].split(' ').map(Number);

const f = (a, b, c, x) => {
  // f(x) = Ax + Bsin(x) - C
  return a * x + b * Math.sin(x) - c;
};

const fPrime = (a, b, c, x) => {
  // f'(x) = A + Bcos(x)
  return a + b * Math.cos(x);
};

const solution = (a, b, c) => {
  // 수치해석..?
  // 뉴턴 랩슨법

  let x = 0;

  while (Math.abs(f(a, b, c, x)) > 1e-9) {
    x -= f(a, b, c, x) / fPrime(a, b, c, x);
  }

  return x;
};

console.log(solution(a, b, c));
