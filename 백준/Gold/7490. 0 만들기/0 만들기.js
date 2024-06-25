const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const tc = Number(input[0]);
const nums = input.slice(1).map(Number);

// 3 <= n <= 9 ? 일단 알고리즘 쓴 뒤 다 풀어쓰면 ...?

const getPermutationWithRepetition = (chrs, n) => {
  const result = [];

  const aux = (idx, path) => {
    if (path.length === n) {
      result.push(path);
      return;
    }

    for (let i = 0; i < chrs.length; i++) {
      aux(idx + 1, path.concat(chrs[i]));
    }
  };

  aux(0, []);

  return result;
};

const perms2expr = (perm) => {
  let expr = '';

  for (let i = 0; i < perm.length; i++) {
    expr += (i + 1).toString() + perm[i];
  }

  expr += perm.length + 1;

  return expr;
};

const isZeroExpr = (expr) => {
  return eval(expr.replace(/ /g, '')) === 0;
};

const solution = (n) => {
  const chrs = ' +-';
  const perms = getPermutationWithRepetition(chrs, n - 1);

  return perms.map(perms2expr).filter(isZeroExpr);
};

for (const num of nums) {
  console.log(solution(num).join('\n') + '\n');
}
