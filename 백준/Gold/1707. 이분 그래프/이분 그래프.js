const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const checkIsBipartiteGraph = (k, graph, colors) => {
  for (let i = 1; i <= k; i++) {
    for (const next of graph[i]) {
      if (colors[i] === colors[next]) {
        return false;
      }
    }
  }

  return true;
};

const solution = (k, graph) => {
  const colors = Array.from({ length: k + 1 }, () => 0);

  const dfs = (node) => {
    for (const next of graph[node]) {
      if (colors[next] === 0) {
        colors[next] = colors[node] === 1 ? 2 : 1;
        dfs(next);
      }
    }
  };

  for (let i = 1; i <= k; i++) {
    if (colors[i] === 0) {
      colors[i] = 1;
      dfs(i);
    }
  }

  return checkIsBipartiteGraph(k, graph, colors) ? 'YES' : 'NO';
};

const tc = Number(input[0]);

let cursor = 1;

for (let i = 1; i <= tc; i++) {
  const [v, e] = input[cursor++].split(' ').map(Number);
  const graph = Array.from({ length: v + 1 }, () => []);

  for (let j = 0; j < e; j++) {
    const [from, to] = input[cursor++].split(' ').map(Number);

    // bidirectional graph
    graph[from].push(to);
    graph[to].push(from);
  }

  console.log(solution(v, graph));
}
