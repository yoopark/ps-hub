const getGiftIndexFromGiftMap = (giftMap) => {
    const giftIndex = new Array(giftMap.length);
    
    for (let i = 0; i < giftMap.length; i++) {
        let sum = 0;
        for (let x = 0; x < giftMap.length; x++) {
            if (i === x) {
                continue;
            }
            sum += giftMap[i][x];
        }
        for (let y = 0; y < giftMap.length; y++) {
            if (i === y) {
                continue;
            }
            sum -= giftMap[y][i];
        }
        giftIndex[i] = sum;
    }
    return giftIndex;
}

const solution = (friends, gifts) => {
    const friendsNo = {};
    for (let i = 0; i < friends.length; i++) {
        const friend = friends[i];
        friendsNo[friend] = i;
    }
    
    const giftMap = Array.from(
        new Array(friends.length), 
        () => new Array(friends.length).fill(0)
    );
    
    for (const s of gifts) {
        const [sender, receiver] = s.split(' ');
        giftMap[friendsNo[sender]][friendsNo[receiver]]++;
    }
    
    const giftIndex = getGiftIndexFromGiftMap(giftMap);
    
    const nextGift = new Array(friends.length).fill(0);
    
    for (let i = 0; i < friends.length; i++) {
        for (let j = i + 1; j < friends.length; j++) {
            if (giftMap[i][j] > giftMap[j][i]) {
                nextGift[i]++;
            } else if (giftMap[i][j] < giftMap[j][i]) {
                nextGift[j]++;
            } else if (giftIndex[i] > giftIndex[j]) {
                nextGift[i]++;
            } else if (giftIndex[i] < giftIndex[j]) {
                nextGift[j]++;
            }
        }
    }
    return Math.max(...nextGift);
}
