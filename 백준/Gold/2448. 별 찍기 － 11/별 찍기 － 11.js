const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]); // 3, 6, 12, 24, 48, ...

// 캔버스를 만들고 나서 채우는 방식으로 접근
const canvas = Array.from({ length: n }, () => Array(2 * n - 1).fill(' '));

const draw = (y, x, n) => {
  if (n === 3) {
    // 1층
    canvas[y][x] = '*';

    // 2층
    canvas[y + 1][x - 1] = '*';
    canvas[y + 1][x + 1] = '*';

    // 3층
    canvas[y + 2][x - 2] = '*';
    canvas[y + 2][x - 1] = '*';
    canvas[y + 2][x] = '*';
    canvas[y + 2][x + 1] = '*';
    canvas[y + 2][x + 2] = '*';
    return;
  }

  draw(y, x, n / 2);
  draw(y + n / 2, x - n / 2, n / 2);
  draw(y + n / 2, x + n / 2, n / 2);
};

draw(0, n - 1, n);

canvas.forEach((row) => {
  console.log(row.join(''));
});
