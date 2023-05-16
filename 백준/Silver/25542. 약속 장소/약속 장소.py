N, L = map(int, input().split())
l = []
for _ in range(N):
    s = input()
    l.append(s)


def possible(s):
    for i in range(N):
        diff = 0
        for j in range(L):
            if s[j] != l[i][j]:
                diff += 1
        if diff > 1:
            return False
    return True


for s in l:
    for i in range(L):
        for c in range(ord('A'), ord('Z')+1):
            test = s[:i] + chr(c) + s[i+1:]
            if possible(test):
                print(test)
                exit()

print('CALL FRIEND')
