const solution = (r1, r2) => {
    let answer = 0;
    
    for (let x = 1; x <= r2; x++) {
        const maxY = Math.floor(Math.sqrt(r2 ** 2 - x ** 2));
        const minY = r1 > x ? Math.ceil(Math.sqrt(r1 ** 2 - x ** 2)) : 0; // r1 >= x 로 하면 NaN 나옴. Why?
        
        answer += maxY - minY + 1;
    }
    
    return answer * 4;
}