from collections import defaultdict
import sys
INF = int(1e9)
def input(): return sys.stdin.readline().rstrip()
def miis(): return map(int, input().split())
def lmmis(): return list(miis())


dic = defaultdict(int)
N = int(input())
for _ in range(N):
    for hours in [4, 6, 4, 10]:
        l = input().split()
        for person in l:
            if person == "-":
                continue
            dic[person] += hours
if not dic:
    print("Yes")
    sys.exit()
l = sorted(dic.values())
print("Yes" if l[-1] <= l[0]+12 else "No")
