const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);

const ppl = input[1].split(' ').map(Number);

const connected = Array.from({ length: n }, () => Array(n).fill(false));

for (let i = 0; i < n; i++) {
  const adjs = input[i + 2].split(' ').slice(1).map(Number);

  for (let j = 0; j < adjs.length; j++) {
    connected[i][adjs[j] - 1] = true;
    // connected[adjs[j] - 1][i] = true; // 여기서 안해도 입력상 보장되어있음
  }
}

const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);

const checkIsConnected = (districts, connected) => {
  const visited = Array(n).fill(false);
  const queue = [districts[0]];

  while (queue.length > 0) {
    const cur = queue.shift();
    visited[cur] = true;

    for (let i = 0; i < n; i++) {
      if (!connected[cur][i]) {
        continue;
      }

      if (visited[i]) {
        continue;
      }

      if (!districts.includes(i)) {
        continue;
      }

      queue.push(i);
    }
  }

  return districts.every((d) => visited[d]);
};

const getCombination = (n, r) => {
  const result = [];
  const temp = Array(r).fill(0);

  const combination = (n, r, index, target) => {
    if (r === 0) {
      result.push([...temp]);
      return;
    }

    if (target === n) {
      return;
    }

    temp[index] = target;
    combination(n, r - 1, index + 1, target + 1);
    combination(n, r, index, target + 1);
  };

  combination(n, r, 0, 0);

  return result;
};

const getAllCombinations = (n) => {
  const result = [];

  for (let i = 1; i <= n / 2; i++) {
    result.push(...getCombination(n, i));
  }

  return result;
};

const solution = (n, ppl, connected) => {
  const combinations = getAllCombinations(n);

  let answer = Infinity;

  for (let i = 0; i < combinations.length; i++) {
    const a = combinations[i];
    const b = Array.from({ length: n }, (_, i) => i).filter((v) => !a.includes(v));

    if (!checkIsConnected(a, connected) || !checkIsConnected(b, connected)) {
      continue;
    }

    const sumA = sum(a.map((v) => ppl[v]));
    const sumB = sum(b.map((v) => ppl[v]));

    answer = Math.min(answer, Math.abs(sumA - sumB));
  }

  if (answer === Infinity) {
    return -1;
  }

  return answer;
};

console.log(solution(n, ppl, connected));
