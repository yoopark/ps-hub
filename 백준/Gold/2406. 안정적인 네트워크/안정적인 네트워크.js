// 1. 간선 하나가 없어져도 모든 정점이 같은 Union 이어야 함.
// 2. 정점, 그 정점과 연결된 간선이 모두 없어져도 나머지 모든 정점이 같은 Union 이어야 함.
// 1번 컴퓨터(본사)와 다른 컴퓨터(지사)는 이미 미리 연결되어있다고 가정.
// 최소 비용

// case 1-1. 본사와 지사 사이의 간선이 삭제되는 경우에도 안정적이어야 한다 -> 어떤 지사와의 간선이 삭제되더라도 다른 지사와의 연결로 메꿔야 한다 -> 본사 제외 MST
// case 1-2. 지사 사이의 간선이 삭제되는 경우에도 안정적이어야 한다 -> 어차피 본사랑 지사끼리는 연결되어 있으므로 무관
// case 2-1. 본사 정점이 삭제되는 경우에도 안정적이어야 한다 -> 본사 제외 MST
// case 2-2. 지사 정점이 삭제되는 경우에도 안정적이어야 한다 -> 어차피 지사는 없어져도 안정적임

// 본사 제외 MST 구하면 됨

const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const edges = input.slice(1, m + 1).map((row) => row.split(' ').map(Number));
const arr = input.slice(m + 1).map((row) => row.split(' ').map(Number));

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
// const solution = (v, e, edges) => {
//   const parent = Array.from({ length: v + 1 }, (_, i) => i);

//   let answer = 0;

//   edges.sort((a, b) => a[2] - b[2]); // sort by cost

//   for (const [a, b, c] of edges) {
//     if (getParent(parent, a) !== getParent(parent, b)) {
//       unionParent(parent, a, b);
//       answer += c;
//     }
//   }

//   return answer;
// };

// kruskal
const solution = (n, m, edges, arr) => {
  const parent = Array.from({ length: n }, (_, i) => i); // 본사 제외

  for (const [a, b] of edges) {
    arr[a - 1][b - 1] = 0;
    arr[b - 1][a - 1] = 0;
  }

  const newEdges = [];

  for (let i = 1; i < n; i++) {
    // 본사 제외
    for (let j = i + 1; j < n; j++) {
      newEdges.push([i + 1, j + 1, arr[i][j]]);
    }
  }

  newEdges.sort((a, b) => a[2] - b[2]); // sort by cost

  let x = 0;
  const addedEdges = [];

  for (const [a, b, c] of newEdges) {
    if (getParent(parent, a) !== getParent(parent, b)) {
      unionParent(parent, a, b);

      if (c === 0) {
        continue;
      }

      x += c;
      addedEdges.push([a, b]);
    }
  }

  return [x, addedEdges];
};

const [x, addedEdges] = solution(n, m, edges, arr);

console.log(x, addedEdges.length);
for (const [a, b] of addedEdges) {
  console.log(a, b);
}
