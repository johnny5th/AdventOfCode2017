import { readFile as readFileAsync } from 'fs';
import { promisify, inspect } from 'util';
import { values, max, scan } from 'ramda';

import { parse } from './parse';
import { RegisterList, runCpuInstruction } from './vm';

const readFile = promisify(readFileAsync);

function partOne(input: string): number {
    const finalRegisters = input
        .split('\n')
        .map(parse)
        .reduce(runCpuInstruction, {});

    return values(finalRegisters).reduce(max);
}

function partTwo(input: string): number {
    const instructions = input
        .split('\n')
        .map(parse);

    const maxN = (r: RegisterList) => (values(r).length ? values(r) : [0]).reduce(max);

    return scan(runCpuInstruction, {}, instructions)
        .map(maxN)
        .reduce(max);
}

async function main(): Promise<void> {
    const input = await readFile('./input.txt', 'utf8');

    console.log(partOne(input));
    console.log(partTwo(input));
}

main();