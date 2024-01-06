const equal = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

const solution = (ingredient) => {
    let answer = 0;
    const stack = [];
    
    for (const elem of ingredient) {
        stack.push(elem);
        
        while (stack.length >= 4 && equal(stack.slice(-4), [1, 2, 3, 1])) {
            stack.splice(-4); // stack = stack.slice(0, -4); TLE
            answer++;
        }
    }
    return answer;
}