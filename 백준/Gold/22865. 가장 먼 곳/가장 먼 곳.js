const { readFileSync } = require('fs');

const input = readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const [a, b, c] = input[1].split(' ').map(Number);
const m = Number(input[2]);
const edges = input.slice(3).map((row) => row.split(' ').map(Number));

const graph = Array.from({ length: n + 1 }, () => []); // 1-indexed array

for (const [from, to, dist] of edges) {
  graph[from].push([to, dist]);
  graph[to].push([from, dist]);
}

// min heap sorted by distance(0th element)
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.#heapifyUp();
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.#heapifyDown();

    return root;
  }

  #heapifyUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);

      if (this.heap[idx][0] >= this.heap[parentIdx][0]) {
        break;
      }

      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }

  #heapifyDown() {
    let idx = 0;
    const lastIdx = this.heap.length - 1;

    while (true) {
      const leftIdx = idx * 2 + 1;
      const rightIdx = idx * 2 + 2;
      let minIdx = idx;

      if (leftIdx <= lastIdx && this.heap[leftIdx][0] < this.heap[minIdx][0]) {
        minIdx = leftIdx;
      }

      if (rightIdx <= lastIdx && this.heap[rightIdx][0] < this.heap[minIdx][0]) {
        minIdx = rightIdx;
      }

      if (minIdx === idx) {
        break;
      }

      [this.heap[idx], this.heap[minIdx]] = [this.heap[minIdx], this.heap[idx]];
      idx = minIdx;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

// dijkstra
const dijkstra = (graph, start) => {
  const dists = Array.from({ length: graph.length }, () => Infinity);

  dists[start] = 0;

  const pq = new MinHeap();
  pq.push([0, start]);

  while (!pq.isEmpty()) {
    const [dist, idx] = pq.pop();

    if (dists[idx] < dist) {
      continue;
    }

    for (const [nextIdx, nextDist] of graph[idx]) {
      const newDist = dist + nextDist;

      if (newDist < dists[nextIdx]) {
        dists[nextIdx] = newDist;
        pq.push([newDist, nextIdx]);
      }
    }
  }

  return dists;
};

const solution = (n, a, b, c, graph) => {
  const distsFromA = dijkstra(graph, a);
  const distsFromB = dijkstra(graph, b);
  const distsFromC = dijkstra(graph, c);

  let ansDist = 0;
  let ansIdx = 0;

  for (let i = 1; i <= n; i++) {
    const dist = Math.min(distsFromA[i], distsFromB[i], distsFromC[i]);

    if (ansDist < dist) {
      ansDist = dist;
      ansIdx = i;
    }
  }

  return ansIdx;
};

console.log(solution(n, a, b, c, graph));
