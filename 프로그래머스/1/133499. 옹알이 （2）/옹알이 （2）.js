const solution = (babbling) => {
    const regexp1 = /(aya|ye|woo|ma)\1+/;
    const regexp2 = /^(aya|ye|woo|ma)+$/;

    return babbling.reduce((ans, word) => (
        !regexp1.test(word) && regexp2.test(word) ? ans + 1 : ans
    ), 0);
    // return babbling.filter(word => !regexp1.test(word) && regexp2.test(word)).length; 보다 메모리 사용에 효율적
}