# from bisect import bisect_left
import sys
import heapq
from collections import Counter, defaultdict, deque
INF = int(1e9)
def input(): return sys.stdin.readline().rstrip()
def miis(): return map(int, input().split())
def lmiis(): return list(miis())


def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] > target:
            high = mid - 1
        else:
            low = mid + 1
    return -1


n, m, a, c, x0 = miis()

arr = []
x = x0
for _ in range(n):
    x = (a * x + c) % m
    arr.append(x)

ans = 0
for e in arr:
    idx = binary_search(arr, e)
    if idx == -1:
        continue
    ans += 1
print(ans)
