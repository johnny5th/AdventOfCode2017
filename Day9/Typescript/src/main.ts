import { readFile as readFileAsync } from 'fs';
import { promisify } from 'util';
import { add, curry } from 'ramda';

import { Group, Value, ValueType, isGroup, isGarbage, isSymbol, parse } from './parse';

const readFile = promisify(readFileAsync);
const runCalcScore = curry(calcScore);

function calcScore(depth: number, value: Value): number {
    if (isGroup(value))
        return depth + value.contents.map(runCalcScore(depth + 1)).reduce(add, 0);

    return 0;
}

function symbolLength(symbol: Value): number {
    if (isSymbol(symbol))
        return symbol.contents.length;

    return 0;
}

function countGarbage(value: Value): number {
    let op;

    if (isGroup(value))
        op = countGarbage;
    else if (isGarbage(value))
        op = symbolLength;
    else
        return 0;

    return value.contents.map(op).reduce(add, 0);
}

function partOne(input: Group): number {
    return runCalcScore(1, input);
}

function partTwo(input: Group) {
    return countGarbage(input);
}

async function main(): Promise<void> {
    const input = await readFile('./input.txt', 'utf8');
    const group: Group = parse(input);

    console.log(partOne(group));
    console.log(partTwo(group));
}

main();
