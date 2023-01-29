import sys
from math import lcm


def input(): return sys.stdin.readline().rstrip()


DAYS = ['Saturday', 'Sunday', 'Monday',
        'Tuesday', 'Wednesday', 'Thursday', 'Friday']

a_start_h, a_start_m = map(int, input().split(':'))
b_start_h, b_start_m = map(int, input().split(':'))
a_cycle_h, a_cycle_m = map(int, input().split(':'))
b_cycle_h, b_cycle_m = map(int, input().split(':'))

a_start = a_start_h * 60 + a_start_m
b_start = b_start_h * 60 + b_start_m
a_cycle = a_cycle_h * 60 + a_cycle_m
b_cycle = b_cycle_h * 60 + b_cycle_m


def print_result(total: int):
    dd = total // (24 * 60)
    total %= 24 * 60
    hh = total // 60
    total %= 60
    mm = total

    print(DAYS[dd % 7])
    print(f'{str(hh).zfill(2)}:{str(mm).zfill(2)}')


MAX = max(a_start, b_start) + lcm(a_cycle, b_cycle)

a, b = a_start, b_start
while a <= MAX and b <= MAX:
    if a == b:
        print_result(a)
        sys.exit(0)
    if a <= b:
        a += a_cycle
    else:
        b += b_cycle

print('Never')
