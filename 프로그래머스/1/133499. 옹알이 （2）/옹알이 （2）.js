const solution = (babbling) => {
    const regexp1 = /(aya|ye|woo|ma)\1+/;
    const regexp2 = /^(aya|ye|woo|ma)+$/;

    return babbling.filter(word => !regexp1.test(word) && regexp2.test(word)).length;
}