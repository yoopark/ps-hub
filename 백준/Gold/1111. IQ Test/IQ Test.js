const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +input[0];
const arr = input[1].split(' ').map(Number);

const solution = (n, arr) => {
  if (n === 1) {
    return 'A'; // 부정
  }

  if (n === 2) {
    if (arr[0] === arr[1]) {
      return arr[0];
    }

    return 'A'; // 부정
  }

  // X_(i+2) = X_(i+1) * a + b
  // X_(i+1) = X_i * a + b
  // 두 식의 차를 구하면 ...

  const ja = arr[2] - arr[1];
  const mo = arr[1] - arr[0];

  if (mo !== 0 && ja % mo !== 0) {
    return 'B'; // 불능
  }

  let a;
  let b;

  if (mo === 0) {
    a = 0;
    b = arr[1];
  } else {
    a = ja / mo;
    b = arr[1] - arr[0] * a;
  }

  for (let i = 1; i < n; i++) {
    if (arr[i] !== arr[i - 1] * a + b) {
      return 'B'; // 불능
    }
  }

  return arr[n - 1] * a + b;
};

console.log(solution(n, arr));
