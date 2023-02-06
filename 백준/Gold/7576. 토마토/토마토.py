# 최소 일수 구하는 건 bfs라니까?

import sys
# from collections import deque

M, N = map(int, sys.stdin.readline().rstrip().split())

box = []
for _ in range(N):
    box.append(list(map(int, sys.stdin.readline().rstrip().split())))

#q = queue()
arr = []
for i in range(N):
    for j in range(M):
        if box[i][j] == 1:
#            q.append((i, j))
            arr.append((i, j))

day = -1
directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
while arr:
    # 하루에 다 뺄 수 있다. 
    daily_tomato = arr[:]
    arr = []
#    print(daily_tomato)
    for tomato_y, tomato_x in daily_tomato:
        for y, x in directions:
            if not (0 <= tomato_y+y < N and 0 <= tomato_x+x < M):
                continue
            if box[tomato_y+y][tomato_x+x] == 0:
                box[tomato_y+y][tomato_x+x] = 1
                arr.append((tomato_y+y, tomato_x+x))
    day += 1
    

for i in range(N):
    for j in range(M):
        if box[i][j] == 0:
            print(-1)
            exit()
print(day)