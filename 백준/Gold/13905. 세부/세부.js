const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const [s, e] = input[1].split(' ').map(Number);
const edges = input.slice(2).map((row) => row.split(' ').map(Number));

// union-find
const getParent = (parent, x) => {
  if (parent[x] === x) {
    return x;
  }

  parent[x] = getParent(parent, parent[x]);

  return parent[x];
};

const unionParent = (parent, a, b) => {
  a = getParent(parent, a);
  b = getParent(parent, b);

  if (a < b) {
    parent[b] = a;
  } else {
    parent[a] = b;
  }
};

// kruskal (maximum spanning tree)
const solution = (n, m, s, e, edges) => {
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  let answer = 1000000; // 무게제한 최대값

  edges.sort((a, b) => b[2] - a[2]); // 가중치 내림차순

  for (const [a, b, c] of edges) {
    if (getParent(parent, a) !== getParent(parent, b)) {
      unionParent(parent, a, b);

      answer = Math.min(answer, c);

      if (getParent(parent, s) === getParent(parent, e)) {
        return answer;
      }
    }
  }

  return 0;
};

console.log(solution(n, m, s, e, edges));
