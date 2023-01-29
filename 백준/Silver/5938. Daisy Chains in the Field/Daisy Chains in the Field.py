import sys
import heapq
from collections import Counter, defaultdict, deque
INF = int(1e9)
def input(): return sys.stdin.readline().rstrip()
def miis(): return map(int, input().split())
def lmiis(): return list(miis())


sys.setrecursionlimit(10**5)


def get_parent(x):
    if parent[x] == x:
        return x
    parent[x] = get_parent(parent[x])  # get_parent 거슬러 올라가면서 parent[x] 값도 갱신
    return parent[x]


def union_parent(a, b):
    a = get_parent(a)
    b = get_parent(b)

    if a < b:  # 작은 쪽을 parent로 합의하자
        parent[b] = a
    else:
        parent[a] = b


def same_parent(a, b):
    return get_parent(a) == get_parent(b)


N, M = miis()
parent = [i for i in range(N+1)]

for _ in range(M):
    c1, c2 = miis()
    union_parent(c1, c2)

for i in range(1, N+1):
    get_parent(i)

res = []
for i in range(1, N+1):
    if parent[i] != 1:
        res.append(i)

if not res:
    print(0)
else:
    for e in res:
        print(e)
