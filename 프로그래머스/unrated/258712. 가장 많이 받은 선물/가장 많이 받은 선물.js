const reverseKeyAndValue = (object) => {
    return Object.keys(object).reduce((acc, key) => {
        const value = object[key];
        acc[value] = [...(acc[value] || []), key];
        return acc;
    }, {});
}

const calculateGiftIndex = (giftTable) => {
    const giftIndex = new Array(giftTable.length);
    
    for (let i = 0; i < giftTable.length; i++) {
        let sum = 0;
        for (let x = 0; x < giftTable.length; x++) {
            if (i === x) {
                continue;
            }
            sum += giftTable[i][x];
        }
        for (let y = 0; y < giftTable.length; y++) {
            if (i === y) {
                continue;
            }
            sum -= giftTable[y][i];
        }
        giftIndex[i] = sum;
    }
    return giftIndex;
}

const initializeGiftTable = (friends, gifts) => {
    const friendsNo = reverseKeyAndValue(friends);

    const giftTable = Array.from(
        new Array(friends.length), 
        () => new Array(friends.length).fill(0)
    );

    for (const gift of gifts) {
        const [giver, receiver] = gift.split(' ');

        const giverIdx = friendsNo[giver];
        const receiverIdx = friendsNo[receiver];

        giftTable[giverIdx][receiverIdx]++;
    }
    
    return giftTable;
}

const calculateNextMonthGiftCounter = (giftTable, giftIndex) => {
    const nextMonthGiftCounter = new Array(giftTable.length).fill(0);
    
    for (let i = 0; i < giftTable.length; i++) {
        for (let j = i + 1; j < giftTable.length; j++) {
            if (giftTable[i][j] > giftTable[j][i]) {
                nextMonthGiftCounter[i]++;
            } else if (giftTable[i][j] < giftTable[j][i]) {
                nextMonthGiftCounter[j]++;
            } else if (giftIndex[i] > giftIndex[j]) {
                nextMonthGiftCounter[i]++;
            } else if (giftIndex[i] < giftIndex[j]) {
                nextMonthGiftCounter[j]++;
            }
        }
    }
    
    return nextMonthGiftCounter;
}

const solution = (friends, gifts) => {
    const giftTable = initializeGiftTable(friends, gifts);    

    const giftIndex = calculateGiftIndex(giftTable);
    
    const nextMonthGiftCounter = calculateNextMonthGiftCounter(giftTable, giftIndex);
    
    return Math.max(...nextMonthGiftCounter);
}
