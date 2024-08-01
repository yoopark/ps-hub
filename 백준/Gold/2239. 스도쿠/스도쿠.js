const { assert } = require('console');
const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const board = input.slice(0).map((row) => row.split('').map(Number));

const getNext = (r, c) => {
  if (c === 8) {
    return [r + 1, 0];
  }

  return [r, c + 1];
};

const checkIsValidRow = (r, num, board) => {
  return !board[r].includes(num);
};

const checkIsValidCol = (c, num, board) => {
  for (let i = 0; i < 9; i++) {
    if (board[i][c] === num) {
      return false;
    }
  }

  return true;
};

const checkIsValidSquare = (r, c, num, board) => {
  const sr = Math.floor(r / 3) * 3;
  const sc = Math.floor(c / 3) * 3;

  for (let i = sr; i < sr + 3; i++) {
    for (let j = sc; j < sc + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
};

const checkIsValid = (r, c, num, board) => {
  return checkIsValidRow(r, num, board) && checkIsValidCol(c, num, board) && checkIsValidSquare(r, c, num, board);
};

const solution = (board) => {
  const isFixed = Array.from({ length: 9 }, () => Array(9).fill(false));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        isFixed[i][j] = true;
      }
    }
  }

  const bt = (r, c) => {
    if (r === 9) {
      return true;
    }

    if (isFixed[r][c]) {
      return bt(...getNext(r, c));
    }

    for (let candidate = 1; candidate <= 9; candidate++) {
      if (checkIsValid(r, c, candidate, board)) {
        board[r][c] = candidate;

        if (bt(...getNext(r, c))) {
          // return first solution
          return true;
        }

        board[r][c] = 0;
      }
    }
  };

  const canSolve = bt(0, 0);
  console.assert(canSolve, 'no solution');

  return board;
};

console.log(
  solution(board)
    .map((row) => row.join(''))
    .join('\n'),
);
