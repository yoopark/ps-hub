def solution(score):
    avg = [((eng + mat) / 2, idx) for idx, (eng, mat) in enumerate(score)]
    avg.sort(reverse=True)
    print(avg)

    answer = [0] * len(score)
    rank = 0
    rank_score = -1
    for i, (score, idx) in enumerate(avg):
        if score != rank_score:
            rank = i + 1
            rank_score = score
        answer[idx] = rank
    return answer