"""Advent of Code 4-1."""

with open("4.txt", "r") as f:
    PHRASES = f.read().splitlines()

VALID_PHRASES = 0

for PHRASE in PHRASES:
    checked_words = set()
    invalid = False
    for word in PHRASE.split(" "):
        if word not in checked_words:
            checked_words.add(word)
        else:
            invalid = True
    if not invalid:
        VALID_PHRASES += 1

print VALID_PHRASES
