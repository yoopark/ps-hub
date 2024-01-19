const distSquared = ([x1, y1], [x2, y2]) => {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

const solution = (m, n, startX, startY, balls) => {
    const calculateMinDistSquared = ([ballX, ballY]) => (
        Math.min(...[
            startY !== ballY || startX < ballX ? distSquared([startX, startY], [-ballX, ballY]) : Infinity,
            startX !== ballX || startY < ballY ? distSquared([startX, startY], [ballX, -ballY]) : Infinity,
            startY !== ballY || startX > ballX ? distSquared([startX, startY], [m + m - ballX, ballY]) : Infinity,
            startX !== ballX || startY > ballY ? distSquared([startX, startY], [ballX, n + n - ballY]) : Infinity,
        ])
    );
    
    return balls.map(calculateMinDistSquared);
}