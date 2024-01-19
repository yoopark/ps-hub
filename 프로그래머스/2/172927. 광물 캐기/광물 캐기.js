const makeGroups = (list) => {
    const groups = [];
    
    for (let start = 0; start < list.length; start += 5) {
        const end = start + 5 <= list.length ? start + 5 : list.length;        
        const group = list.slice(start, end);
        groups.push(group);
    }
    return groups;
}

const getFatigue = (group) => {
    console.log(group);
    const diamond = group.reduce((acc, cur) => {
        switch (cur) {
            case 'diamond':
            case 'iron':
            case 'stone':
                return acc + 1;
            default:
                throw Error();
        }
    }, 0);
    
    const iron = group.reduce((acc, cur) => {
        switch (cur) {
            case 'diamond':
                return acc + 5;
            case 'iron':
            case 'stone':
                return acc + 1;
            default:
                throw Error();
        }
    }, 0);

    const stone = group.reduce((acc, cur) => {
        switch (cur) {
            case 'diamond':
                return acc + 25;
            case 'iron':
                return acc + 5;
            case 'stone':
                return acc + 1;
            default:
                throw Error();
        }
    }, 0);
    
    return {
        diamond,
        iron,
        stone,
    }
}

const sum = (arr) => {
    return arr.reduce((acc, cur) => acc + cur, 0);
}

const trimPicks = (picks, n) => {
    const ret = [0, 0, 0];

    let left = n;
    
    ret[0] += Math.min(picks[0], n);
    n -= Math.min(picks[0], n);
    ret[1] += Math.min(picks[1], n);
    n -= Math.min(picks[1], n);
    ret[2] += Math.min(picks[2], n);
    n -= Math.min(picks[2], n);
    return ret;    
}

const solution = (picks, minerals) => {
    const groups = makeGroups(minerals).splice(0, sum(picks));
    
    const fatigues = groups.map((group) => getFatigue(group)).sort((a, b) => {
        if (a.stone !== b.stone) {
            return a.stone - b.stone;
        }
        if (a.iron !== b.iron) {
            return a.iron - b.iron;
        }
        if (a.diamond !== b.diamond) {
            return a.diamond - b.diamond;
        }
        return 0;
    });
    
    const trimmedPicks = trimPicks(picks, groups.length);
    
    let answer = 0;

    answer += fatigues.splice(0, trimmedPicks[2]).reduce((acc, { stone }) => acc + stone, 0);
    answer += fatigues.splice(0, trimmedPicks[1]).reduce((acc, { iron }) => acc + iron, 0);
    answer += fatigues.splice(0, trimmedPicks[0]).reduce((acc, { diamond }) => acc + diamond, 0);
    
    return answer;    
}
