const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [h, w] = input[0].split(' ').map(Number);
const blocks = input[1].split(' ').map(Number);

// monotonic stack
const solution = (h, w, blocks) => {
  let answer = 0;
  const stack = [];

  for (let i = 0; i < w; i++) {
    while (stack.length > 0 && blocks[i] > blocks[stack[stack.length - 1]]) {
      const top = stack.pop() ?? -1; // can't be -1 because of stack.length > 0 condition

      if (stack.length === 0) {
        break;
      }

      const width = i - stack[stack.length - 1] - 1;
      const height = Math.min(blocks[i], blocks[stack[stack.length - 1]]) - blocks[top];

      answer += width * height;
    }

    stack.push(i);
  }

  return answer;
};

console.log(solution(h, w, blocks));
