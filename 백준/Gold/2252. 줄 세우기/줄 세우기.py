import sys
from collections import deque
INF = int(1e9)
def input(): return sys.stdin.readline().rstrip()
def miis(): return map(int, input().split())
def lmiis(): return list(miis())


N, M = miis()
graph = [[] for _ in range(N+1)]
indegree = [0] * (N+1)
for _ in range(M):
    A, B = miis()
    graph[A].append(B)
    indegree[B] += 1

ans = []
q = deque()
for i in range(1, N+1):
    if not indegree[i]:
        q.append(i)

while q:
    now = q.popleft()
    ans.append(now)
    for nxt in graph[now]:
        # indegree가 0이던 건 다시 그쪽으로 갈 일이 없다는 소리니까, 그 간선을 굳이 없앨 필요가 없다!
        indegree[nxt] -= 1
        if not indegree[nxt]:
            q.append(nxt)

print(*ans)
