import { readFile as readFileAsync } from 'fs';
import { promisify } from 'util';
import { lensIndex, over, set, add, max, indexOf, reduce, append, contains, last } from 'ramda';

import { trampoline } from './trampoline';

type MemoryArray = number[];

const readFile = promisify(readFileAsync);
const runIterateMemoryArray = trampoline(iterateMemoryArray);

function incrementMemoryArray(index: number, cycles: number, memory: MemoryArray): MemoryArray {
    const nextIndex = index == memory.length - 1
        ? 0
        : index + 1;

    if (cycles == 0)
        return memory;
    else
        return incrementMemoryArray(
            nextIndex,
            cycles - 1,
            over(lensIndex(nextIndex), add(1), memory)
        );
}

function locateLargestMemoryCell(memory: MemoryArray): [number, number] {
    const maxValue = reduce(max, -Infinity, memory);
    const maxIndex = indexOf(maxValue, memory);

    return [maxValue, maxIndex];
}

function iterateMemoryArray(seenMemoryMap: MemoryArray[], memory: MemoryArray) {
    const [maxValue, maxIndex] = locateLargestMemoryCell(memory);
    const newMemoryArray = incrementMemoryArray(maxIndex, maxValue, set(lensIndex(maxIndex), 0, memory));
    const newMemoryMap = append(newMemoryArray, seenMemoryMap);

    if (contains(newMemoryArray, seenMemoryMap))
        return newMemoryMap;

    return () => iterateMemoryArray(
        newMemoryMap,
        newMemoryArray
    );
}

function partOne(input: MemoryArray) {
    // This memory map contains the initial configuration
    // which does not count as a cycle, so we need to subtract 1
    return runIterateMemoryArray([input], input).length - 1;
}

function partTwo(input: MemoryArray) {
    // Trust me Typescript, I know what I'm doing
    const seenMemoryMap = <MemoryArray[]>runIterateMemoryArray([input], input);

    // We need to subtract one for the same reason as part 1
    return seenMemoryMap.length - indexOf(last(seenMemoryMap), seenMemoryMap) - 1;
}

async function main(): Promise<void> {
    const rawInput = await readFile('./input.txt', 'utf8');
    const input = rawInput
        .split(/\s+/)
        .map(Number);

    console.log(partOne(input));
    console.log(partTwo(input));
}

main();