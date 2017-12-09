"""Advent of Code 7-1."""

import re

class Program(object):
    name = ""
    weight = ""
    children = set()

    def __init__(self, name, weight, children=None):
        self.name = name
        self.weight = int(weight)

        if children is not None:
            self.children = children
        else:
            self.children = set()

    def __str__(self):
        structure = self.name + "(" + str(self.weight) + ")"
        if self.children:
            structure += " -> ["
            structure += ', '.join(map(str, self.children))
            structure += "]"
        return structure

    def add_child(self, child):
        self.children.add(child)

def getStructure(data):
    with open(data, "r") as fopen:
        program_definitions = fopen.read().splitlines()

    structure_map = {}
    structure = {}

    # Create all programs
    for definition in program_definitions:
        match = re.search(r'(\w*) \((\d*)\)(?: -> (.*))?', definition)
        name = match.group(1)
        weight = match.group(2)
        children = match.group(3).split(', ') if match.group(3) else []

        # Add program to dict
        structure[name] = Program(name, weight)

        # if there are any children, add them to the mapping dict
        if children:
            structure_map[name] = children

    # Assign children to their parents
    for name, children in structure_map.items():
        for child in children:
            structure[name].add_child(structure[child])

    # Remove children from the dict
    for name, children in structure_map.items():
        for child in children:
            del structure[child]

    # Return remaining top level program
    return structure.values()[0]


def main():
    program = getStructure("7.txt")
    print program

main()