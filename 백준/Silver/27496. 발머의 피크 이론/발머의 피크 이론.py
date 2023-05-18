N, L = map(int, input().split())
a = list(map(int, input().split()))
a = [a for a in a]
b = [0] * N

for i in range(N):
    b[i] = a[i] + b[i - 1] if i >= 1 else a[i]
    b[i] -= a[i - L] if i >= L else 0

ans = 0
for e in b:
    ans += int(129 <= e <= 138)

print(ans)
