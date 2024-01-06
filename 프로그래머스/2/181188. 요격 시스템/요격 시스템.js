const solution = (targets) => {
    targets.sort((a, b) => a[1] - b[1]);

    let answer = 0;
    let prevEnd = -1;
    
    for (const target of targets) {
        const [start, end] = target;
        
        if (prevEnd <= start) {
            prevEnd = end;
            answer++;
        }
    }
    
    return answer;
}
