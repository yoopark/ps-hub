const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const cards = input[1].split(' ').map(Number);

const getPrefixSum = (arr) => {
  const prefixSum = [0];

  for (let i = 0; i < arr.length; i++) {
    prefixSum.push(prefixSum[prefixSum.length - 1] + arr[i]);
  }

  return prefixSum;
};

const solution = (n, cards) => {
  const evenCards = cards.filter((_, i) => i % 2 === 0);
  const oddCards = cards.filter((_, i) => i % 2 === 1);

  const evenCardsPrefixSum = getPrefixSum(evenCards);
  const oddCardsPrefixSum = getPrefixSum(oddCards);

  let answer = 0;

  // 밑장빼기를 i번째 카드에서 할 경우
  for (let i = 0; i < n; i++) {
    let sum = 0;

    if (i % 2 === 0) {
      // 밑장빼기를 짝수번째 카드에서 할 경우 (예 - 2번 카드 대신: 0, 7, 3, 5)
      sum = evenCardsPrefixSum[i / 2] + oddCardsPrefixSum[oddCardsPrefixSum.length - 1] - oddCardsPrefixSum[i / 2];
    } else {
      // 밑장빼기를 홀수번째 카드에서 할 경우 (예 - 1번 카드 대신: 0, 1, 3, 5)
      sum =
        evenCardsPrefixSum[(i + 1) / 2] +
        oddCardsPrefixSum[oddCardsPrefixSum.length - 2] -
        oddCardsPrefixSum[(i - 1) / 2];
    }

    answer = Math.max(answer, sum);
  }

  return answer;
};

console.log(solution(n, cards));
