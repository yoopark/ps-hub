const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const route = input[1].split(' ').map(Number);
const costs = input.slice(2).map((row) => row.split(' ').map(Number));

const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);

const zip = (arr1, arr2) => arr1.map((_, idx) => [arr1[idx], arr2[idx]]);

const getOptimalCost = (cost, cnt) => {
  const [a, b, c] = cost;

  return Math.min(a * cnt, c + b * cnt);
};

const solution = (n, m, route, costs) => {
  const cnts = Array(n - 1).fill(0);

  for (let i = 1; i < m; i++) {
    let [start, end] = [route[i - 1], route[i]];

    if (start > end) {
      [start, end] = [end, start];
    }

    cnts[start - 1]++;
    cnts[end - 1]--;
  }

  for (let i = 1; i < n; i++) {
    cnts[i] += cnts[i - 1];
  }

  return sum(zip(costs, cnts).map(([cost, cnt]) => getOptimalCost(cost, cnt)));
};

console.log(solution(n, m, route, costs));
