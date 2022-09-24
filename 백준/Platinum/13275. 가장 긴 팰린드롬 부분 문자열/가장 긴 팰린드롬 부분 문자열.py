def manacher(s):
    s = "#" + "#".join(list(s)) + "#"
    len_s = len(s)
    ret = [0] * len_s # ret[i] : i를 중심으로 만들 수 있는 최장 Palindrome의 길이

    c, r = -1, -1
    for i in range(len_s):
        if i <= r:
            j = c - (i-c)
            ret[i] = min(ret[j], r-i)

        while 0 <= i-ret[i]-1 and i+ret[i]+1 < len_s:
            if s[i-ret[i]-1] != s[i+ret[i]+1]:
                break
            ret[i] += 1
        if r < i+ret[i]:
            c = i; r = i+ret[i]
    return ret

S = input()
A = manacher(S)
print(max(A))