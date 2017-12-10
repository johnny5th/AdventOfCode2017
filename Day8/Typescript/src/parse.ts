import { optWhitespace as _, regexp, alt, string, seqMap, createLanguage } from 'parsimmon';

export enum InstructionOperator {
    Inc = 'INC',
    Dec = 'DEC'
};

export enum ConditionOperator {
    LT = '<',
    GT = '>',
    LTE = '<=',
    GTE = '>=',
    EQ = '==',
    NEQ = '!='
};

export interface Instruction {
    registerIdentifier: string,
    operator: InstructionOperator,
    value: number
};
function Instruction(registerIdentifier: string, operator: string, value: number): Instruction {
    return {
        registerIdentifier,
        operator: operator == 'dec'
            ? InstructionOperator.Dec
            : InstructionOperator.Inc,
        value
    };
}

export interface Condition {
    operator: ConditionOperator,
    registerIdentifier: string,
    value: number
};
function Condition(registerIdentifier: string, operator: string, value: number): Condition {
    function isValidOperator(op: string): op is ConditionOperator {
        return ['<', '>', '<=', '>=', '==', '!='].indexOf(op) != -1;
    }

    if (!isValidOperator(operator)) throw new Error('Invalid operator encountered');

    return {
        operator: operator,
        registerIdentifier,
        value
    };
}

export interface CPUInstruction {
    instruction: Instruction,
    condition: Condition
};
function CPUInstruction(instruction: Instruction, condition: Condition): CPUInstruction {
    return {
        instruction,
        condition
    };
}

export function parse(input: string): CPUInstruction {
    const CPUInstructionParser = createLanguage({
        RegisterIdentifier: function() {
            return regexp(/[a-z]+/).trim(_)
        },
        Number: function() {
            return regexp(/-?[0-9]+/).map(Number).trim(_)
        },
        Instruction: function(r) {
            const instructionOperator = alt(
                string('inc'),
                string('dec')
            ).trim(_);

            return seqMap(
                r.RegisterIdentifier,
                instructionOperator,
                r.Number,
                Instruction
            );
        },
        Condition: function(r) {
            const conditionOperator = alt(
                string('>='),
                string('>'),
                string('<='),
                string('<'),
                string('=='),
                string('!=')
            ).trim(_);

            return seqMap(
                string('if').trim(_).then(r.RegisterIdentifier),
                conditionOperator,
                r.Number,
                Condition
            );
        },
        CPUInstruction: function(r) {
            return seqMap(
                r.Instruction,
                r.Condition,
                CPUInstruction
            );
        }
    });

    return CPUInstructionParser.CPUInstruction.tryParse(input);
}