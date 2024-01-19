const parseToMinute = (start) => { 
    const [hour, minute] = start.split(':').map(Number);
    
    return hour * 60 + minute;    
}

const solution = (plans) => {
    const sortedPlans = plans.map(([name, start, playtime]) => (
        [name, parseToMinute(start), Number(playtime)]
    )).sort((a, b) => a[1] - b[1]);
    
    const left = sortedPlans;
    const stack = [];
    const answer = [];

    let currentTime = 0;

    while (left.length > 0 || stack.length > 0) {
        if (left.length === 0) {
            while (stack.length > 0) {
                const [name, playtime] = stack.pop();
                currentTime += playtime;
                answer.push(name);
            }
        } else {
            const [nextName, nextStart, nextPlaytime] = left[0];

            while (currentTime < nextStart) {
                if (stack.length === 0) {
                    /* wait */
                    currentTime = nextStart;
                    break;
                }
                const [name, playtime] = stack.pop();
                
                if (currentTime + playtime <= nextStart) {
                    currentTime += playtime;
                    answer.push(name);
                } else {
                    const possiblePlaytime = nextStart - currentTime;
                    currentTime += possiblePlaytime;
                    stack.push([name, playtime - possiblePlaytime]);
                }
            }
            
            const [name, start, playtime] = left.shift();
            
            if (left.length === 0) {
                currentTime += playtime;
                answer.push(name);
            } else {
                const [nextName, nextStart, nextPlaytime] = left[0];
                
                if (playtime <= nextStart - currentTime) {
                    currentTime += playtime;
                    answer.push(name);
                } else {
                    stack.push([name, playtime - (nextStart - currentTime)]);
                    currentTime = nextStart;
                }
            }
        }        
    }
    return answer;
}