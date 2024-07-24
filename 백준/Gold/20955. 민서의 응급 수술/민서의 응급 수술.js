const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
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

const solution = (n, m, edges) => {
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  let ret = 0;

  for (const edge of edges) {
    const [a, b] = edge;

    if (getParent(parent, a) === getParent(parent, b)) {
      ret++;
    } else {
      unionParent(parent, a, b);
    }
  }

  for (let i = 1; i <= n; i++) {
    if (i === getParent(parent, i)) {
      ret++;
    }
  }

  return ret - 1;
};

console.log(solution(n, m, edges));
