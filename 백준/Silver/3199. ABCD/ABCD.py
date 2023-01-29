import sys
from math import sqrt

p, q, r = map(float, input().split())
if p != r:
    print(0)
    sys.exit(0)

print(f'{(p+q) * sqrt(2) * p * sqrt(2):.4f}')
