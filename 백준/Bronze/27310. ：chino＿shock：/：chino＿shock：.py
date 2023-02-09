import sys
import heapq
from collections import Counter, defaultdict, deque
INF = int(1e9)
def input(): return sys.stdin.readline().rstrip()
def miis(): return map(int, input().split())
def lmiis(): return list(miis())


s = input()
counter = Counter(s)
print(len(s) + counter[':'] + counter['_'] * 5)
