const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const dices = input.slice(1).map((row) => row.split(' ').map(Number));

const getInfoOfDice = (dice, bottomIdx) => {
  switch (bottomIdx) {
    // a, f
    case 0:
      return { topIdx: 5, maxOfLateral: Math.max(dice[1], dice[2], dice[3], dice[4]) };
    case 5:
      return { topIdx: 0, maxOfLateral: Math.max(dice[1], dice[2], dice[3], dice[4]) };

    // b, d
    case 1:
      return { topIdx: 3, maxOfLateral: Math.max(dice[0], dice[2], dice[4], dice[5]) };
    case 3:
      return { topIdx: 1, maxOfLateral: Math.max(dice[0], dice[2], dice[4], dice[5]) };

    // c, e
    case 2:
      return { topIdx: 4, maxOfLateral: Math.max(dice[0], dice[1], dice[3], dice[5]) };
    case 4:
      return { topIdx: 2, maxOfLateral: Math.max(dice[0], dice[1], dice[3], dice[5]) };

    default:
      throw new Error('Invalid index');
  }
};

const solution = (n, dices) => {
  let answer = 0;

  // 맨 아래 주사위 놓기
  for (let i = 0; i < 6; i++) {
    let bottomIdx = i;
    const { maxOfLateral } = getInfoOfDice(dices[0], bottomIdx);

    let sum = maxOfLateral;

    for (let j = 1; j < n; j++) {
      const { topIdx } = getInfoOfDice(dices[j - 1], bottomIdx);
      const bottomIdxOfNextDice = dices[j].indexOf(dices[j - 1][topIdx]);

      bottomIdx = bottomIdxOfNextDice;

      // 백트래킹할 필요 없음. 옆면 중 최댓값을 채택하면 됨.
      const { maxOfLateral } = getInfoOfDice(dices[j], bottomIdx);
      sum += maxOfLateral;
    }

    answer = Math.max(answer, sum);
  }

  return answer;
};

console.log(solution(n, dices));
