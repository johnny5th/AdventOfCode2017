import { readFile as readFileAsync } from 'fs';
import { promisify } from 'util';
import { lensIndex, over, add } from 'ramda';

type Thunk<T> = (...args: any[]) => T;

const readFile = promisify(readFileAsync);

function trampoline<T>(fn: Thunk<T>): Thunk<T> {
    return function(...args: any[]) {
        let res = fn.apply(this, arguments);
        while (res instanceof Function)
            res = res();
        return res;
    }
}

function jump(jumpList: number[], jumpIndex: number, steps: number) {
    if (jumpIndex > jumpList.length - 1)
        return steps;
    else
        return () => jump(
            over(
                lensIndex(jumpIndex),
                add(1),
                jumpList
            ),
            jumpIndex + jumpList[jumpIndex],
            steps + 1
        );
}

function weirdJump(jumpList: number[], jumpIndex: number, steps: number) {
    const jumpAmt = jumpList[jumpIndex];

    if (Number.isNaN(jumpAmt)) return 0;

    if (jumpIndex > jumpList.length - 1)
        return steps;
    else
        return () => weirdJump(
            over(
                lensIndex(jumpIndex),
                jumpAmt >= 3 ? add(-1) : add(1),
                jumpList
            ),
            jumpIndex + jumpAmt,
            steps + 1
        );
}

function partOne(input: number[]) {
    return trampoline(jump)(input, 0, 0);
}

function partTwo(input: number[]) {
    return trampoline(weirdJump)(input, 0, 0);
}

async function main(): Promise<void> {
    const rawInput = await readFile('./input.txt', 'utf8');
    const input = rawInput
        .split('\n')
        .map(Number);

    console.log(partOne(input));
    console.log(partTwo(input));
}

main();