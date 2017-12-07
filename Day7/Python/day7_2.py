"""Advent of Code 7-2."""

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

    def children_weight(self):
        weight_sum = 0
        for child in self.children:
            weight_sum += child.total_weight()

        return weight_sum

    def total_weight(self):
        return self.weight + self.children_weight()

    def is_balanced(self):
        if not self.children:
            return True

        iterator = iter(list(child.total_weight() for child in self.children))
        try:
            first = next(iterator)
        except StopIteration:
            return True
        return all(first == rest for rest in iterator)

    def check_balance(self):
        if self.is_balanced():
            return "Balanced"
        else:
            # Check if it's the grandchildren's fault
            for child in self.children:
                if not child.is_balanced():
                    return child.check_balance()

            # Must be the children's fault
            return Program.getCorrectWeight(self.children)

    @staticmethod
    def getCorrectWeight(children):
        # Sort list of weights
        weights = list({"weight": child.weight, "total_weight": child.total_weight()} for child in children)
        weights = sorted(weights, key=lambda k: k["total_weight"], reverse=True)

        # if the first and second weights are the same, then the last weight is the different one
        # due to sorting. this is assuming only 1 weight is imbalanced
        if weights[0]['total_weight'] == weights[1]['total_weight']:
            # the first weight is bigger than the last due to sorting
            # so add the difference of the first and the last total weights to the last program weight
            return (weights[0]['total_weight'] - weights[-1]['total_weight']) + weights[-1]['weight']
        else:
            # subtract the difference of the first and the last total weights from the first program weight
            return weights[0]['weight'] - (weights[0]['total_weight'] - weights[-1]['total_weight'])



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
    print program.check_balance()

main()