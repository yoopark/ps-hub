// Ref. https://newdeal123.tistory.com/33

const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const edges = input.slice(2).map((row) => row.split(' ').map(Number));

const solution = (n, m, k, arr, edges_) => {
  // edge case
  if (m <= 1) {
    return true;
  }

  const edges = edges_
    .map(([a, b]) => {
      if (a > b && a !== n) {
        return [b - 1, a - 1];
      }

      return [a - 1, b - 1];
    })
    .sort((a, b) => a[0] - b[0]);

  let sum = 0;
  let last = 0;

  for (const [left, right] of edges) {
    let minValue = Infinity;

    for (let i = last; i <= left; i++) {
      minValue = Math.min(minValue, arr[i]);
    }

    if (last === 0 && edges[edges.length - 1][1] !== 0) {
      for (let i = n - 1; i >= edges[edges.length - 1][1]; i--) {
        minValue = Math.min(minValue, arr[i]);
      }
    }

    sum += minValue;

    last = right;
  }

  return sum <= k;
};

console.log(solution(n, m, k, arr, edges) ? 'YES' : 'NO');
