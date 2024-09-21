// Ref. https://davincicoding.tistory.com/103

const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const t = Number(input[0]);
const arr = input.slice(1).map(Number);

// addh(t+60), addt(t+10), mint(t-10), add0(t+1), min0(t-1)
const solution = (n) => {
  let [addh, addt, mint, add0, min0] = [0, 0, 0, 0, 0];

  // init
  addh = Math.floor(n / 60);
  n %= 60;

  addt = Math.floor(n / 10);
  n %= 10;

  add0 = n;

  // 예외 1. 45분, 55분
  if (addt >= 4 && add0 === 5) {
    addh += 1;
    addt -= 5;
    add0 = -5;
  }

  // 예외 2. 일의 자리 6 이상
  if (add0 >= 6) {
    addt += 1;
    add0 -= 10;
  }

  // 예외 3. 십의 자리 4 이상
  if (addt >= 4) {
    addh += 1;
    addt -= 6;
  }

  // mint, min0 변환
  if (addt < 0) {
    mint = -addt;
    addt = 0;
  }

  if (add0 < 0) {
    min0 = -add0;
    add0 = 0;
  }

  return [addh, addt, mint, add0, min0];
};

for (const n of arr) {
  console.log(solution(n).join(' '));
}
