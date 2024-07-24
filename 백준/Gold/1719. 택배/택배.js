const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const edges = input.slice(1).map((row) => row.split(' ').map(Number));

const solution = (n, m, edges) => {
  const graph = Array.from({ length: n }, () => Array.from({ length: n }, () => Infinity));
  const ret = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

  for (let i = 0; i < n; i++) {
    graph[i][i] = 0;
  }

  for (const [from, to, weight] of edges) {
    if (graph[from - 1][to - 1] < weight) {
      continue;
    }

    graph[from - 1][to - 1] = weight;
    graph[to - 1][from - 1] = weight;
    ret[from - 1][to - 1] = to;
    ret[to - 1][from - 1] = from;
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (graph[i][j] > graph[i][k] + graph[k][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
          ret[i][j] = ret[i][k]; // ret[i][j] = k + 1; 는 왜 안됨?
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        ret[i][j] = '-';
      }
    }
  }

  return ret;
};

console.log(
  solution(n, m, edges)
    .map((row) => row.join(' '))
    .join('\n'),
);
