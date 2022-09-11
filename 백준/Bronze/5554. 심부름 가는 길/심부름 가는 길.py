import sys
def input(): return sys.stdin.readline().rstrip()
def miis(): return map(int, input().split())
def lmiis(): return list(miis())


INF = int(1e9)

l = []
for _ in range(4):
    l.append(int(input()))

sum_ = sum(l)
print(sum_//60)
sum_ %= 60
print(sum_)
