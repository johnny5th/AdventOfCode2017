"""Advent of Code 2-1."""

with open("2.txt", "r") as f:
    DATA = f.readlines()

DIFFERENCES = []

for LINE in DATA:
    nums = map(int, LINE.split('\t'))
    DIFFERENCES.append(max(nums) - min(nums))

print sum(DIFFERENCES)
