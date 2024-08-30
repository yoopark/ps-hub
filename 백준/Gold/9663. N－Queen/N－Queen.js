const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +input[0];

// well known: n-queen problem
const solution = (n) => {
  const rows = Array.from(n).fill(0); // 어차피 같은 row에는 2개 못 놓으니까, row[i] = j이면 (i, j)에 퀸이 있다는 뜻

  let answer = 0;

  const isPossible = (cnt) => {
    for (let i = 0; i < cnt; i++) {
      if (rows[i] === rows[cnt] || Math.abs(rows[i] - rows[cnt]) === cnt - i) {
        return false;
      }
    }
    return true;
  };

  const bt = (cnt) => {
    if (cnt === n) {
      answer++;
      return;
    }

    for (let i = 0; i < n; i++) {
      rows[cnt] = i;
      if (isPossible(cnt)) {
        bt(cnt + 1);
      }
    }
  };

  bt(0);

  return answer;
};

console.log(solution(n));
