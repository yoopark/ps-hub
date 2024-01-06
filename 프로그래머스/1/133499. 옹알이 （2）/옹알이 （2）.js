const BABBLINGS = ['aya', 'ye', 'woo', 'ma'];

const canBabble = (s) => {
    let currentIdx = 0;
    let lastBabblingIdx = -1;
   
    while (currentIdx < s.length) {
        let found = false;
        for (let i = 0; i < BABBLINGS.length; i++) {
            const BABBLING = BABBLINGS[i];
            if (i === lastBabblingIdx) {
                continue;
            }
            if (s.indexOf(BABBLING, currentIdx) !== currentIdx) {
                continue;
            }
            found = true;
            lastBabblingIdx = i;
            currentIdx += BABBLING.length;
            break;
        }
        if (!found) {
            return false;
        }
    }
    return true;
}

const solution = (babblings) => {
    let answer = 0;
    
    for (const babbling of babblings) {
        if (canBabble(babbling)) {
            answer++;
        }
    }
    return answer;
}