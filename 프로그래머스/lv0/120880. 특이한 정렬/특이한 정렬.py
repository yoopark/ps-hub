def solution(numlist, n):
    
    difflist = [(num - n, num) for i, num in enumerate(numlist)]
    # 중복된 원소 없다고 보장
    difflist.sort(key=lambda x: (abs(x[0]), -x[0]))
    
    answer = [num for diff, num in difflist]
    return answer