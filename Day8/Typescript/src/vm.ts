import { CPUInstruction, Instruction, Condition, InstructionOperator, ConditionOperator } from './parse';

export type RegisterList = {
    [registerIdentifier: string]: number
};

function getRegisterValue(registerIdentifier: string, registers: RegisterList): number {
    return registers[registerIdentifier] || 0;
}

function runCondition(registers: RegisterList, condition: Condition): boolean {
    const register = getRegisterValue(condition.registerIdentifier, registers);

    switch(condition.operator) {
        case ConditionOperator.LT:
            return register < condition.value;
        case ConditionOperator.LTE:
            return register <= condition.value;
        case ConditionOperator.GT:
            return register > condition.value;
        case ConditionOperator.GTE:
            return register >= condition.value;
        case ConditionOperator.EQ:
            return register == condition.value;
        case ConditionOperator.NEQ:
            return register != condition.value;
    }
}

function runInstruction(registers: RegisterList, instruction: Instruction): RegisterList {
    const register = getRegisterValue(instruction.registerIdentifier, registers);
    const operator = instruction.operator == InstructionOperator.Inc
        ? (n: number) => n + instruction.value
        : (n: number) => n - instruction.value;

    return {
        ...registers,
        [instruction.registerIdentifier]: operator(register)
    };
}

export function runCpuInstruction(registers: RegisterList, cpuInstruction: CPUInstruction): RegisterList {
    if (runCondition(registers, cpuInstruction.condition))
        return runInstruction(registers, cpuInstruction.instruction);

    return registers;
}