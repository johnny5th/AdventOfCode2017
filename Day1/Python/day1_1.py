"""Advent of Code 1-1."""

F = open("1.txt", "r")
DATA = F.read()
DIGITS = list(map(int, DATA))
MATCHES = []

for i, digit in enumerate(DIGITS):
    if i+2 > len(DIGITS):
        next_digit = DIGITS[0]
    else:
        next_digit = DIGITS[i+1]

    if digit == next_digit:
        MATCHES.append(digit)

print sum(MATCHES)
