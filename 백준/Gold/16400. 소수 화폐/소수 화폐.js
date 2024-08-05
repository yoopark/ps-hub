// greedy 하게 채울 수 없다. 그러므로 dp

const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);

const checkIsPrime = (n) => {
  if (n === 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
};

const solution = (n) => {
  const primes = [];

  for (let i = 2; i <= n; i++) {
    if (checkIsPrime(i)) {
      primes.push(i);
    }
  }
  const dp = Array(n + 1).fill(0);

  dp[0] = 1;

  for (let i = 0; i < primes.length; i++) {
    for (let j = primes[i]; j <= n; j++) {
      dp[j] = (dp[j] + dp[j - primes[i]]) % 123456789;
    }
  }

  return dp[n];
};

console.log(solution(n));
