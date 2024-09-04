const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));

const solution = (n, k, arr) => {
  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      dist[y][x] = arr[y][x];
    }
  }

  // floyd-warshall
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  const visited = Array(n).fill(false);

  const dfs = (idx, cnt, sum) => {
    if (cnt === n) {
      return sum;
    }

    let min = Infinity;

    for (let i = 0; i < n; i++) {
      if (visited[i]) {
        continue;
      }

      visited[i] = true;
      min = Math.min(min, dfs(i, cnt + 1, sum + dist[idx][i]));
      visited[i] = false;
    }

    return min;
  };

  visited[k] = true;

  return dfs(k, 1, 0);
};

console.log(solution(n, k, arr));
