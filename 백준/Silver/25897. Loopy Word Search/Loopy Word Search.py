import sys
import heapq
from collections import Counter, defaultdict, deque
INF = int(1e9)
def input(): return sys.stdin.readline().rstrip()
def miis(): return map(int, input().split())
def lmiis(): return list(miis())


DIRS = {'R': (0, 1), 'D': (1, 0), 'L': (0, -1), 'U': (-1, 0)}


def find_word(word):
    def f(n, max_):
        while n < 0:
            n += max_
        while n >= max_:
            n -= max_
        return n

    def find_word_one_position(start_y, start_x, word):
        for key in 'RDLU':
            # if key in 'RL' and len(word) > C:
            #     continue  # 사이클 한번보다 더 돌았는데 우연히 맞을 수도 있으니... (수정) 이것도 되는걸로 친다!
            # if key in 'DU' and len(word) > R:
            #     continue
            dy, dx = DIRS[key]
            s = ''
            for i in range(len(word)):
                ny, nx = f(start_y + dy * i, R), f(start_x + dx * i, C)
                s += grid[ny][nx]
            if s == word:
                return key
        return ''

    for i in range(R):
        for j in range(C):
            if grid[i][j] != word[0]:
                continue
            if direction := find_word_one_position(i, j, word):
                return direction, i + 1, j + 1, word
    return None


T = int(input())
for t in range(1, T+1):
    print(f'Word search puzzle #{t}:')
    R, C = miis()
    grid = []
    for _ in range(R):
        grid.append(input())
    S = int(input())
    for _ in range(S):
        word = input()
        res = find_word(word)
        if not res:  # FIXME: 못 찾을 경우가 있나?
            continue
        print(*res)
    if t != T:
        print()
