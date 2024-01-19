const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const getStartPosition = (board) => {
    const [H, W] = [board.length, board[0].length];
    
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            if (board[y][x] === 'R') {
                return { y, x };
            }
        }
    }
}

const getNextPosition = ({ dy, dx }, board, { y, x }) => {
    const [H, W] = [board.length, board[0].length];

    while (true) {
        const [ny, nx] = [y + dy, x + dx];
        
        if (!(0 <= ny && ny < H && 0 <= nx && nx < W)) {
            return { y, x };
        }
        if (board[ny][nx] === 'D') {
            return { y, x };
        }
        [y, x] = [ny, nx];
    }
}

const solution = (board) => {
    const [H, W] = [board.length, board[0].length];
    const visited = Array.from({ length: H }, () => new Array(W).fill(false));
    
    const pos = getStartPosition(board);
    
    const q = [];
    q.push({ ...pos, dist: 0 });

    while (q.length > 0) {
        const { y, x, dist } = q.shift();
                
        if (board[y][x] === 'G') {
            return dist;
        }
        visited[y][x] = true;
        
        for (const [dy, dx] of DIRS) {
            const { y: ny, x: nx } = getNextPosition({ dy, dx }, board, { y, x });

            if (visited[ny][nx]) {
                continue;
            }

            q.push({ y: ny, x: nx, dist: dist + 1 });
        }
    }
    return -1;
}
