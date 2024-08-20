// 10159번 문제와 매우 유사

const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const edges = input.slice(1).map((row) => row.split(' ').map(Number));

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

  // 여기만 바꾸면 됨
  const answer = graph.filter((row) => row.every((el) => el)).length;

  return answer;
};

console.log(solution(n, m, edges));
