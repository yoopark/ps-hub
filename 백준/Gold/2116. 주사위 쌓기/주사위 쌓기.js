const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const dices = input.slice(1).map((row) => row.split(' ').map(Number));

const getOppositeFaceIdxOfDice = (dice, idx) => {
  console.assert(dice.length === 6);
  console.assert(0 <= idx && idx < 6);

  switch (idx) {
    case 0: // a
      return 5; // f
    case 1: // b
      return 3; // d
    case 2: // c
      return 4; // e
    case 3: // d
      return 1; // b
    case 4: // e
      return 2; // c
    case 5: // f
      return 0; // a
    default:
      throw new Error('Invalid index');
  }
};

const getLateralFaceIdxesOfDice = (dice, bottomIdx) => {
  console.assert(dice.length === 6);
  console.assert(0 <= bottomIdx && bottomIdx < 6);

  const oppositeFaceIdx = getOppositeFaceIdxOfDice(dice, bottomIdx);

  const lateralFaceIdxes = Array.from({ length: 6 }, (_, idx) => idx).filter(
    (idx) => idx !== bottomIdx && idx !== oppositeFaceIdx,
  );

  return lateralFaceIdxes;
};

const getMaxOfLateralFaces = (dice, bottomIdx) => {
  const lateralFaceIdxes = getLateralFaceIdxesOfDice(dice, bottomIdx);

  return Math.max(...lateralFaceIdxes.map((idx) => dice[idx]));
};

const solution = (n, dices) => {
  // 가장 아래 주사위는 마음대로 놓을 수 있음.
  // 그 위부터는 위 아래 고정, 회전은 가능
  // 한 옆면의 숫자의 합 최댓값 구하기

  // 주사위를 놓는 경우의 수
  // 1. A, F / B, C, D, E
  // 2. C, E / A, B, D, F
  // 3. B, D / A, C, E, F

  let answer = 0;

  // 맨 아래 주사위 놓기
  for (let i = 0; i < 6; i++) {
    let bottomIdx = i;
    let sum = getMaxOfLateralFaces(dices[0], bottomIdx);

    for (let j = 1; j < n; j++) {
      const topIdx = getOppositeFaceIdxOfDice(dices[j - 1], bottomIdx);
      const bottomIdxOfNextDice = dices[j].indexOf(dices[j - 1][topIdx]);

      sum += getMaxOfLateralFaces(dices[j], bottomIdxOfNextDice);
      bottomIdx = bottomIdxOfNextDice;
    }

    answer = Math.max(answer, sum);
  }

  return answer;
};

console.log(solution(n, dices));
