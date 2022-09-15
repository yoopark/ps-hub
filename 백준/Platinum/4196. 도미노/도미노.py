import sys
from collections import deque
INF = int(1e9)
def input(): return sys.stdin.readline().rstrip()
def miis(): return map(int, input().split())
def lmiis(): return list(miis())


sys.setrecursionlimit(10**5)

##########################


def get_scc(idx):
    ret = []
    t = 0
    while t != idx:
        t = stack.pop()
        ret.append(t)
        finished[t] = True
    return ret


def dfs(i):
    global latest

    order[i] = latest
    latest += 1
    stack.append(i)
    parent = order[i]
    for j in graph[i]:
        if order[j] and finished[j]:
            continue
        parent = min(parent, dfs(j) if not order[j] else order[j])
        # order[j]가 택해지는 상황은, 오로지 사이클이 생기는 그 순간밖에 없음

    if parent == order[i]:
        SCC.append(get_scc(i))
    return parent

##########################


T = int(input())
for _ in range(T):
    V, E = miis()
    edges = []
    for _ in range(E):
        x, y = miis()
        edges.append((x, y))

    graph = [[] for _ in range(V+1)]
    for x, y in edges:
        graph[x].append(y)

    latest = 1
    order = [0] * (V+1)  # 방문 순서
    finished = [False] * (V+1)
    stack = []
    SCC = []

    for i in range(1, V+1):
        if not order[i]:
            dfs(i)
    for i in range(len(SCC)):
        SCC[i].sort()

    parent = [i for i in range(V+1)]
    for i, scc in enumerate(SCC):
        for node in scc:
            parent[node] = SCC[i][0]
    new_graph = [[] for _ in range(V+1)]
    indegree = [0] * (V+1)
    for x, y in edges:
        x, y = parent[x], parent[y]
        if x == y:
            continue
        if y in new_graph[x]:
            continue
        new_graph[x].append(y)
        indegree[y] += 1
    ans = 0
    for scc in SCC:
        if not indegree[parent[scc[0]]]:
            ans += 1
    print(ans)
