const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [v, e] = input[0].split(' ').map(Number);
const edges = input.slice(1).map((row) => row.split(' ').map(Number));

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

// kruskal
const solution = (v, e, edges) => {
  const parent = Array.from({ length: v + 1 }, (_, i) => i);

  let answer = 0;

  edges.sort((a, b) => a[2] - b[2]); // sort by cost

  for (const [a, b, c] of edges) {
    if (getParent(parent, a) !== getParent(parent, b)) {
      unionParent(parent, a, b);
      answer += c;
    }
  }

  return answer;
};

console.log(solution(v, e, edges));
