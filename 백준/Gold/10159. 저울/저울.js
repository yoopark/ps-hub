const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const m = Number(input[1]);
const edges = input.slice(2).map((row) => row.split(' ').map(Number));

const solution = (n, m, edges) => {
  // floyd-warshall (boolean)
  const graph = Array.from(new Array(n), () => new Array(n).fill(false));

  // init
  for (let i = 0; i < n; i++) {
    graph[i][i] = true;
  }

  for (const [a, b] of edges) {
    graph[a - 1][b - 1] = true;
  }

  // process
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (graph[i][k] && graph[k][j]) {
          graph[i][j] = true;
        }
      }
    }
  }

  // output
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j]) {
        graph[j][i] = true;
      }
    }
  }

  const answer = graph.map((row) => row.filter((el) => !el).length);

  return answer;
};

console.log(solution(n, m, edges).join('\n'));
