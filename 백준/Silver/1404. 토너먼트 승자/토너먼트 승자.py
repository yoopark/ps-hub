# from math import factorial
from itertools import permutations, combinations
import sys
import heapq
from collections import Counter, defaultdict, deque
INF = int(1e9)
def input(): return sys.stdin.readline().rstrip()
def miis(): return map(int, input().split())
def lmiis(): return list(miis())


l = lmiis()
prob = [[0] * 8 for _ in range(8)]

for i, (a, b) in enumerate(combinations([i for i in range(8)], 2)):
    prob[a][b] = l[i] / 100
    prob[b][a] = 1.0 - (l[i] / 100)

def win_prob_r1(a):
    b = a + 1 if a % 2 == 0 else a - 1
    return prob[a][b]


def win_prob_r2(a):
    n = a // 2
    if n == 0:
        c, d = 2, 3
    elif n == 1:
        c, d = 0, 1
    elif n == 2:
        c, d = 6, 7
    else:
        c, d = 4, 5
    return win_prob_r1(c) * prob[a][c] + win_prob_r1(d) * prob[a][d]


def win_prob_r3(a):
    n = a // 4
    if n == 0:
        e, f, g, h = 4, 5, 6, 7
    else:
        e, f, g, h = 0, 1, 2, 3
    return win_prob_r1(e) * win_prob_r2(e) * prob[a][e] + win_prob_r1(f) * win_prob_r2(f) * prob[a][f] + win_prob_r1(g) * win_prob_r2(g) * prob[a][g] + win_prob_r1(h) * win_prob_r2(h) * prob[a][h]


ans = []
for i in range(8):
    r1 = win_prob_r1(i)
    r2 = win_prob_r2(i)
    r3 = win_prob_r3(i)
    ans.append(r1 * r2 * r3)

print(*ans)