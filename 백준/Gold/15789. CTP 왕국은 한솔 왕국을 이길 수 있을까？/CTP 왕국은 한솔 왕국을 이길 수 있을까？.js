const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const edges = input.slice(1, m + 1).map((row) => row.split(' ').map(Number));
const [c, h, k] = input[m + 1].split(' ').map(Number);

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

const solution = (n, m, edges, c, h, k) => {
  const parents = Array.from({ length: n + 1 }, (_, i) => i);

  for (const [a, b] of edges) {
    unionParent(parents, a, b);
  }

  const cParent = getParent(parents, c);
  const hParent = getParent(parents, h);

  const counter = {};

  for (let i = 1; i <= n; i++) {
    const parent = getParent(parents, i);

    if (!counter[parent]) {
      counter[parent] = 0;
    }

    counter[parent]++;
  }

  const sorted = Object.entries(counter).sort((a, b) => b[1] - a[1]);

  let left = k;
  let power = counter[cParent];

  for (const [key, value] of sorted) {
    // parseInt 주의
    if (parseInt(key) === cParent || parseInt(key) === hParent) {
      continue;
    }

    if (left === 0) {
      break;
    }

    left -= 1;
    power += value;
  }

  return power;
};

console.log(solution(n, m, edges, c, h, k));
