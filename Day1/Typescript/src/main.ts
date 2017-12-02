import * as fs from 'fs';
import { promisify } from 'util';

type FNextNumberFactory = (thisNumberIndex: number, numberSetLength: number) => number

const readFile = promisify(fs.readFile);

function extract(nextNumberFactory: FNextNumberFactory) {
    return function(numberSet: String): number[] {
        const numbers = numberSet.split('').map(Number);

        let carry: number[] = [];

        for (let thisNumberIndex = 0; thisNumberIndex < numbers.length; thisNumberIndex++) {
            let nextNumberIndex = nextNumberFactory(thisNumberIndex, numbers.length);

            let thisNumber = numbers[thisNumberIndex];
            let nextNumber = numbers[nextNumberIndex];

            if (thisNumber == nextNumber) {
                carry.push(thisNumber);
            }
        }

        return carry;
    };
}

const runLengthExtract = extract(function(thisNumberIndex, numberSetLength) {
    return thisNumberIndex == (numberSetLength - 1)
        ? 0
        : thisNumberIndex + 1;
});

const pivotExtract = extract(function(thisNumberIndex, numberSetLength) {
    const halfwayRound = numberSetLength / 2;

    return thisNumberIndex + halfwayRound > numberSetLength
        ? (thisNumberIndex + halfwayRound) - numberSetLength
        : thisNumberIndex + halfwayRound;
});

function sum(ns: number[]): number {
    return ns.reduce((a, b) => a + b, 0);
}

function partOne(input: String): number {
    return sum(runLengthExtract(input));
}

function partTwo(input: String): number {
    return sum(pivotExtract(input));
}

async function main(): Promise<void> {
    const input = await readFile('./input.txt', 'utf8');

    console.log(partOne(input));
    console.log(partTwo(input));
}

main();