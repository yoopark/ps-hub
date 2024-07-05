const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const towns = input.slice(1).map((row) => row.split(' ').map(Number));

const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);

// 절대편차합을 최소화하는 점: 중앙값
const solution = (n, towns) => {
  const sortedTowns = towns.sort((a, b) => a[0] - b[0]);

  const median = Math.ceil(sum(sortedTowns.map((town) => town[1])) / 2);

  let acc = 0;
  for (let i = 0; i < n; i++) {
    acc += sortedTowns[i][1];

    if (acc >= median) {
      return sortedTowns[i][0];
    }
  }
};

console.log(solution(n, towns));
