def rotate(s, direction):
    if s == 'S':
        return direction
    if s == 'L':
        return DIRECTIONS[(DIRECTIONS.index(direction) - 1) % 4]
    if s == 'R':
        return DIRECTIONS[(DIRECTIONS.index(direction) + 1) % 4]


DIRS = {
    'up': (-1, 0),
    'right': (0, 1),
    'down': (1, 0),
    'left': (0, -1)
}

DIRECTIONS = ['up', 'right', 'down', 'left']


def solution(grid):
    def shoot(start_y, start_x, start_direction):
        ret = 1
        visited[start_y][start_x][DIRECTIONS.index(start_direction)] = True
        y, x, direction = start_y, start_x, start_direction
        while True:
            dy, dx = DIRS[direction]
            y = (y + dy) % H
            x = (x + dx) % W
            direction = rotate(grid[y][x], direction)
            if (y, x, direction) == (start_y, start_x, start_direction):
                return ret
            visited[y][x][DIRECTIONS.index(direction)] = True
            ret += 1

    W, H = len(grid[0]), len(grid)
    visited = [[[False] * 4 for _ in range(W)] for _ in range(H)]

    answer = []

    for y in range(H):
        for x in range(W):
            for direction in DIRECTIONS:
                if visited[y][x][DIRECTIONS.index(direction)]:
                    continue
                answer.append(shoot(y, x, direction))

    return sorted(answer)