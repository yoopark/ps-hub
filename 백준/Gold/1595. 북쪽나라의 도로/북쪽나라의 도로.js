const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const edges = input.filter((row) => row !== '').map((row) => row.split(' ').map(Number)); // filter..?

const solution = (edges) => {
  // edge case
  if (edges.length === 0) {
    return 0;
  }

  const tree = Array.from({ length: 10001 }, () => []);

  for (const [a, b, c] of edges) {
    tree[a].push([b, c]);
    tree[b].push([a, c]);
  }

  // 트리의 지름
  // 1. 임의의 정점 x에서 가장 먼 정점 y를 찾는다.
  // 2. 정점 y에서 가장 먼 정점 z를 찾는다.
  // 3. 정점 y와 z의 거리가 트리의 지름이다.
  const getFarthestNode = (start) => {
    const visited = Array.from({ length: 10001 }).fill(false);

    let max = [start, 0];

    const dfs = (node, dist) => {
      visited[node] = true;

      if (max[1] <= dist) {
        max = [node, dist];
      }

      for (const [next, nextDist] of tree[node]) {
        if (visited[next]) {
          continue;
        }

        dfs(next, dist + nextDist);
      }
    };

    dfs(start, 0);

    return max;
  };

  const [start, dist1] = getFarthestNode(edges[0][0]);
  const [end, dist2] = getFarthestNode(start);

  return dist2;
};

console.log(solution(edges));
