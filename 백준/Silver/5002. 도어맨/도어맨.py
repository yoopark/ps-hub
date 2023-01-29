import sys

X = int(input())
people = input()

diff = 0
cnt = 0
behind_first = False

for idx, person in enumerate(people):
    if behind_first:
        behind_first = False
        continue
    if abs(diff) > X:
        cnt -= 1
        diff = 0
        break

    if diff == X and person == 'M' and idx != len(people) - 1 and people[idx+1] == 'W':
        behind_first = True
        diff -= 1
        cnt += 1
    elif diff == -X and person == 'W' and idx != len(people) - 1 and people[idx+1] == 'M':
        behind_first = True
        diff += 1
        cnt += 1

    if person == 'M':
        diff += 1
        cnt += 1
    else:
        diff -= 1
        cnt += 1

if abs(diff) > X:
    cnt -= 1

print(cnt)
