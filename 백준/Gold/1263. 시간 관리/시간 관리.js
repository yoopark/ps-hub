const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const tasks = input.slice(1).map((row) => row.split(' ').map(Number));

const solution = (n, tasks) => {
  const sortedTasks = tasks.sort((a, b) => {
    if (a[1] === b[1]) {
      return b[0] - a[0];
    }

    return b[1] - a[1]; // 끝나는 시간이 늦은 순서대로 정렬
  });

  let ret = sortedTasks[0][1] - sortedTasks[0][0];

  for (let i = 1; i < n; i++) {
    if (ret > sortedTasks[i][1]) {
      ret = sortedTasks[i][1] - sortedTasks[i][0];
    } else {
      ret -= sortedTasks[i][0];
    }
  }

  return ret < 0 ? -1 : ret;
};

console.log(solution(n, tasks));
