import sys
from collections import defaultdict
import heapq
input = lambda: sys.stdin.readline().rstrip()
INF = int(1e9)

V, E = map(int, input().split())
start = int(input())
graph = defaultdict(list)
for _ in range(E):
    u, v, weight = map(int, input().split())
    graph[u].append((v, weight))

#########################

def dijkstra(start):
    dist[start] = 0
    q = []
    heapq.heappush(q, (0, start))
    while q:
        weight, node = heapq.heappop(q)
        if dist[node] < weight: # 현재 노드가 이미 처리된 적이 있는 노드라면 무시
            continue
        for adj_node, adj_weight in graph[node]:
            cost = weight + adj_weight
            if cost < dist[adj_node]:
                dist[adj_node] = cost
                heapq.heappush(q, (cost, adj_node))

dist = [INF] * (V+1) # 1-indexed
dijkstra(start)

#########################

for d in dist[1:]:
    print(d if d != INF else 'INF')