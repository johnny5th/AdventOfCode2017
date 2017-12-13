"""Advent of Code 8-1."""

import re
import operator

class CPU(object):
    registers = {}
    highest_val_seen = 0

    EVAL_FUNCS = {
        ">": operator.gt,
        ">=": operator.ge,
        "<": operator.lt,
        "<=": operator.le,
        "==": operator.eq,
        "!=": operator.ne
    }

    OP_FUNCS = {
        "inc": operator.add,
        "dec": operator.sub
    }

    def __init__(self):
        self.registers = {}

    def get_register(self, register):
        if not register in self.registers:
            self.registers[register] = 0

        return self.registers[register]

    def set_register(self, register, value):
        self.registers[register] = int(value)

    def eval_register(self, register, func, value):
        return self.EVAL_FUNCS[func](self.get_register(register), int(value))

    def run_op(self, register, func, value):
        value = self.OP_FUNCS[func](self.get_register(register), int(value))

        # Reset highest value if there is higher
        if self.highest_val_seen < value:
            self.highest_val_seen = value

        self.set_register(register, value)


def parseInstructions(data):
    with open(data, "r") as fopen:
        instructions = fopen.read().splitlines()

    cpu = CPU()

    # Create all programs
    for instruction in instructions:
        # Matches (register to change, operator, amount, register to check, check op, check amount)
        match = re.search(r'([a-z]*) (inc|dec) (-?\d*) if ([a-z]*) ([><=\!]{1,2}) (-?\d*)', instruction)
        if match and cpu.eval_register(match.group(4), match.group(5), match.group(6)):
            cpu.run_op(match.group(1), match.group(2), match.group(3))

    return cpu


def main():
    cpu = parseInstructions("8.txt")
    print cpu.highest_val_seen

main()