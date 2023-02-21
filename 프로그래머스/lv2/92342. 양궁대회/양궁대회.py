def solution(n, info):
    candidates = []
    max_score_diff = 1

    def revise_max_score(path):
        nonlocal candidates, max_score_diff

        assert len(info) == len(path)
        score_diff = 0
        for i, (n1, n2) in enumerate(zip(info, path)):
            score = 10 - i
            if n1 > n2:
                score_diff -= score
            elif n1 < n2:
                score_diff += score

        if score_diff >= max_score_diff:
            if score_diff > max_score_diff:
                max_score_diff = score_diff
                candidates = []
            candidates.append(path)

    def dfs(i, left, path):
        if i == 10:
            revise_max_score(path + [left])
            return
        shoot = info[i] + 1
        if left - shoot >= 0:
            dfs(i + 1, left - shoot, path + [shoot])
        dfs(i + 1, left, path + [0])

    dfs(0, n, [])
    return sorted(candidates, key=lambda x: x[::-1], reverse=True)[0] if candidates else [-1]

