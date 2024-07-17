const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const makeParents = (nums) => {
  const parents = Array(nums.length).fill(-1);

  let groupIdx = -1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] + 1) {
      groupIdx++;
    }

    parents[i] = groupIdx;
  }

  return parents;
};

const solution = (n, k, nums) => {
  const parents = makeParents(nums);

  const numIdx = nums.findIndex((num) => num === k);
  const parentIdx = parents[numIdx];
  const grandParentIdx = parents[parentIdx];

  const answer = parents.filter((parent) => parent !== parentIdx && parents[parent] === grandParentIdx).length;

  return answer;
};

let cursor = 0;

while (true) {
  const [n, k] = input[cursor].split(' ').map(Number);

  if (n === 0 && k === 0) {
    break;
  }

  const nums = input[cursor + 1].split(' ').map(Number);

  console.log(solution(n, k, nums));

  cursor += 2;
}
