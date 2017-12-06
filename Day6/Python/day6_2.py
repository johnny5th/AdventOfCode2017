"""Advent of Code 6-2."""

with open("6_2.txt", "r") as f:
    BANKS = f.read().split('\t')
    BANKS = list(map(int, BANKS))

HASHES = set()

while '|'.join(map(str, BANKS)) not in HASHES:
    HASHES.add('|'.join(map(str, BANKS)))
    BIGGEST_BANK = BANKS.index(max(BANKS))
    TO_DISTRIBUTE = BANKS[BIGGEST_BANK]
    BANKS[BIGGEST_BANK] = 0

    i = 1
    while TO_DISTRIBUTE > 0:
        BANKS[(BIGGEST_BANK + i) % len(BANKS)] += 1
        TO_DISTRIBUTE -= 1
        i += 1

print len(HASHES)
