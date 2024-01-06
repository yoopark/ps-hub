const START = 0, END = 1;

const solution = (targets) => {
    targets.sort((a, b) => a[END] - b[END]);

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
