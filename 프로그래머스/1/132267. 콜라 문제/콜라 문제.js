const solution = (a, b, n) => {
    let answer = 0;
    
    while (n >= a) {
        const newBottles = Math.floor(n / a) * b;
        answer += newBottles;
        n = n % a;
        n += newBottles;
    }
    
    return answer;
}