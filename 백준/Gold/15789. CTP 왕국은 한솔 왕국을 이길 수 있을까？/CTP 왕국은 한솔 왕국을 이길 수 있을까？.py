import sys
from collections import Counter
input = lambda: sys.stdin.readline().rstrip()
miis = lambda: map(int, input().split())
sys.setrecursionlimit(10**5)

#########################################

def get_parent(x):
    if parent[x] == x:
        return x
    parent[x] = get_parent(parent[x]) # get_parent 거슬러 올라가면서 parent[x] 값도 갱신
    return parent[x]

def union_parent(a, b):
    a = get_parent(a)
    b = get_parent(b)
    
    if a < b: # 작은 쪽을 parent로 합의하자
        parent[b] = a
    else:
        parent[a] = b        

def same_parent(a, b):
    return get_parent(a) == get_parent(b)

#########################################

N, M = miis()
parent = [i for i in range(N+1)]
for _ in range(M):
    X, Y = miis()
    union_parent(X, Y)
for i in range(1, N+1):
    get_parent(i) # 이걸 해줘야되나??
C, H, K = miis()
counter = Counter(parent[1:])
l = sorted(counter.items(), key=lambda x:x[1], reverse=True)
l = [val for key, val in l if not (key == parent[C] or key == parent[H])]
print(counter[parent[C]] + sum(l[:K]))