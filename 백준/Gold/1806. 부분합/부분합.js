const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, s] = input[0].split(' ').map(Number);

const arr = input[1].split(' ').map(Number);

const getAccumulatedSum = (arr) => {
  const acc = Array({ length: arr.length + 1 }).fill(0);

  for (let i = 1; i <= arr.length; i++) {
    acc[i] = acc[i - 1] + arr[i - 1];
  }

  return acc;
};

const solution = (n, s, arr) => {
  const acc = getAccumulatedSum(arr);

  // 0, 1에서 시작하는 투 포인터
  let [left, right] = [0, 1];
  let answer = Infinity;

  while (true) {
    const sum = acc[right] - acc[left];

    if (sum >= s) {
      answer = Math.min(answer, right - left);
      left++; // 차를 줄임
    } else {
      if (right === n) {
        break;
      }

      right++; // 차를 늘림
    }
  }

  return answer === Infinity ? 0 : answer;
};

console.log(solution(n, s, arr));
