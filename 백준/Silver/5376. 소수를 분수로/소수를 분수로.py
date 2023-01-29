import sys
from typing import Tuple
from fractions import Fraction


def input(): return sys.stdin.readline().rstrip()


def parse(s: str) -> Tuple[str, str]:
    if idx := s.find('(') != -1:
        ahead, behind = s.split('(')
        behind = behind.rstrip(')')
        return ahead, behind
    return s, ''


T = int(input())
for _ in range(T):
    s = input()[2:]
    ahead, behind = parse(s)
    if not behind:
        print(Fraction(int(ahead), 10**len(ahead)))
        continue
    if not ahead:
        print(Fraction(int(behind), 10**len(behind) - 1))
        continue
    print(Fraction(int(ahead), 10**len(ahead)) +
          Fraction(int(behind), 10**len(behind) - 1) * Fraction(1, 10**len(ahead)))
