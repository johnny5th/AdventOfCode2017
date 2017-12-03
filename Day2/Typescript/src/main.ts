import { readFile as readFileAsync } from 'fs';
import { promisify } from 'util';

const readFile = promisify(readFileAsync);

const arrRun = (fn: (a: number, b: number) => number) => (arr: number[]) => arr.reduce((carry, n) => fn(carry, n));

const arrMax = arrRun(Math.max);
const arrMin = arrRun(Math.min);
const arrSum = arrRun((a, b) => a + b);

function flatMap<T, F>(fn: (a: T) => F[], arr: T[]): F[] {
    return Array.prototype.concat.apply([], arr.map(fn));
}

function splice<T>(arr: T[], i: number, n: number) {
    const arrCp = arr.slice();

    arrCp.splice(i, n);
    return arrCp;
}

function zip<T>(as: T[], bs: T[]): T[][] {
    return as.map((a, i) => [a, bs[i]]);
}

function unzipElement<T>(i: number, arr: T[]): [T, T[]] {
    return [arr[i], splice(arr, i, 1)];
}

function formatInput(input: String): number[][] {
    return input
        .split('\n')
        .map(s => s.split(/\s+/))
        .map(s => s.map(Number));
}

function divideUnzippedTuple([numerator, denominators]: [number, number[]]): number[] {
    return denominators.map(denominator => numerator / denominator);
}

function calculatorWholeNumberDivisor(arr: number[]): number {
    const arrUnzipped = arr.map((_, i) => unzipElement(i, arr));
    const divisors = flatMap(divideUnzippedTuple, arrUnzipped);

    return divisors.filter(Number.isInteger)[0];
}

function partOne(input: number[][]): number {
    const mins = input.map(arrMin);
    const maxs = input.map(arrMax);
    const diff = zip(maxs, mins).map(([max, min]) => max - min);

    return arrSum(diff);
}

function partTwo(input: number[][]): number {
    const wholeDivisors = input.map(calculatorWholeNumberDivisor);

    return arrSum(wholeDivisors);
}

async function main(): Promise<void> {
    const rawInput = await readFile('./input.txt', 'utf8');
    const input = formatInput(rawInput);

    console.log(partOne(input));
    console.log(partTwo(input));
}

main();