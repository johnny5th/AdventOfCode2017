"""Advent of Code 2-2."""

with open("2.txt", "r") as f:
    DATA = f.readlines()

DIVISIBLES = []

for LINE in DATA:
    nums = map(int, LINE.split('\t'))
    for x in nums:
        for y in nums:
            if(x > y and x % y == 0):
                DIVISIBLES.append(x/y)

print sum(DIVISIBLES)
