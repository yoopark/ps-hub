const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);

const arr = input.slice(1).map(
  (row) =>
    row
      .split(' ')
      .map(Number)
      .filter((_, i) => i !== 0), // 첫 번째 요소는 필요 없으므로 제거
);

const solution = (n, arr) => {
  const visited = Array.from({ length: n }, () => Array(10).fill(false));

  let isFound = false;
  let result = [];

  const dfs = (day, history) => {
    if (isFound) {
      return;
    }

    if (day === n) {
      isFound = true;
      result = history;
      return;
    }

    for (const cake of arr[day]) {
      if (visited[day][cake]) {
        continue;
      }

      if (history.length > 0 && history[history.length - 1] === cake) {
        continue;
      }

      visited[day][cake] = true;
      dfs(day + 1, [...history, cake]);
    }
  };

  dfs(0, []);

  if (!isFound) {
    throw new Error('no solution');
  }

  return result;
};

try {
  console.log(solution(n, arr).join('\n'));
} catch (error) {
  console.log(-1);
}
