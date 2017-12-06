"""Advent of Code 5-2."""

with open("5.txt", "r") as f:
    INSTRUCTIONS = list(map(int, f.read().splitlines()))

STEPS = 0
POSITION = 0

while -1 < POSITION < (len(INSTRUCTIONS)):
    THIS_POS = POSITION
    POSITION += INSTRUCTIONS[THIS_POS]
    INSTRUCTIONS[THIS_POS] += 1 if INSTRUCTIONS[THIS_POS] < 3 else -1
    STEPS += 1

print STEPS
