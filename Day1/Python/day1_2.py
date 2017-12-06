"""Advent of Code 1-2."""

F = open("1.txt", "r")
DATA = F.read()
DIGITS = list(map(int, DATA))
MATCHES = []

for i, digit in enumerate(DIGITS):
    compare_digit = DIGITS[(i + len(DIGITS)/2) % len(DIGITS)]

    if digit == compare_digit:
        MATCHES.append(digit)

print sum(MATCHES)
