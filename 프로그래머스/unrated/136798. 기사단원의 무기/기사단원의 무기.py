from math import sqrt

def get_divisors(n):
    ret = []
    for i in range(1, int(sqrt(n))+1):
        if n%i == 0:
            ret.append(i)
            if i == n//i:
                continue
            ret.append(n//i)
    return sorted(ret)

def solution(number, limit, power):
    divisor_cnts = []
    for n in range(number + 1):
        divisor_cnt = len(get_divisors(n))
        divisor_cnts.append(divisor_cnt if divisor_cnt <= limit else power)
    
    return sum(divisor_cnts[:number+1])
