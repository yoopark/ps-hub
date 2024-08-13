const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' '));

const DIRS = {
  UP: [-1, 0],
  RIGHT: [0, 1],
  DOWN: [1, 0],
  LEFT: [0, -1],
};

class CCTV {
  constructor(y, x, type) {
    this.y = y;
    this.x = x;
    this.type = type;
    this.dirs = this.#getInitialDirs();
  }

  #getInitialDirs() {
    switch (this.type) {
      case 1:
        return [DIRS.RIGHT];
      case 2:
        return [DIRS.RIGHT, DIRS.LEFT];
      case 3:
        return [DIRS.RIGHT, DIRS.UP];
      case 4:
        return [DIRS.RIGHT, DIRS.LEFT, DIRS.UP];
      case 5:
        return [DIRS.RIGHT, DIRS.DOWN, DIRS.LEFT, DIRS.UP];
      default:
        throw new Error('Invalid CCTV type');
    }
  }

  getUniqueDirsCount() {
    switch (this.type) {
      case 1:
        return 4;
      case 2:
        return 2;
      case 3:
        return 4;
      case 4:
        return 4;
      case 5:
        return 1;
      default:
        throw new Error('Invalid CCTV type');
    }
  }

  rotate() {
    this.dirs = this.dirs.map((dir) => {
      switch (dir) {
        case DIRS.RIGHT:
          return DIRS.DOWN;
        case DIRS.DOWN:
          return DIRS.LEFT;
        case DIRS.LEFT:
          return DIRS.UP;
        case DIRS.UP:
          return DIRS.RIGHT;
        default:
          throw new Error('Invalid direction');
      }
    });
  }

  watch(arr) {
    this.dirs.forEach((dir) => {
      let [ny, nx] = [this.y, this.x];

      while (true) {
        ny += dir[0];
        nx += dir[1];

        if (ny < 0 || nx < 0 || ny >= n || nx >= m) {
          break;
        }

        if (arr[ny][nx] === '6') {
          break;
        }

        if (arr[ny][nx] === '0') {
          arr[ny][nx] = '#';
        }
      }
    });
  }
}

const getEmptyCount = (arr) => {
  let emptyCount = 0;

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (arr[y][x] === '0') {
        emptyCount++;
      }
    }
  }

  return emptyCount;
};

const solution = (n, m, arr) => {
  const cctvs = [];
  let emptyCount = 0;

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (arr[y][x] === '0') {
        emptyCount++;
      } else if (arr[y][x] !== '6') {
        cctvs.push(new CCTV(y, x, Number(arr[y][x])));
      }
    }
  }

  const bt = (idx, arr) => {
    if (idx === cctvs.length) {
      return getEmptyCount(arr);
    }

    let minEmptyCount = Infinity;
    const cctv = cctvs[idx];

    for (let i = 0; i < cctv.getUniqueDirsCount(); i++) {
      const copiedArr = arr.map((row) => [...row]);
      cctv.watch(copiedArr);

      // for (const row of copiedArr) {
      //   console.log(row.join(' '));
      // }
      // console.log();

      minEmptyCount = Math.min(minEmptyCount, bt(idx + 1, copiedArr));
      cctv.rotate();
    }

    return minEmptyCount;
  };

  return bt(0, arr);
};

console.log(solution(n, m, arr));
