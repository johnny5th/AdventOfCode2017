import { readFile as readFileAsync } from 'fs';
import { promisify } from 'util';
import { scan, max, curry } from 'ramda';

enum Direction {
    N = 'n',
    NE = 'ne',
    SE = 'se',
    S = 's',
    SW = 'sw',
    NW = 'nw'
};

interface HexPoint {
    x: number,
    y: number
};

const readFile = promisify(readFileAsync);
const runHexDistance = curry(hexDistance);

function isDirection(dir: string): dir is Direction {
    return ['n', 'ne', 'se', 's', 'sw', 'nw'].indexOf(dir) != -1;
}

function parseDirection(str: string): Direction {
    if (!isDirection(str)) throw new Error('Unexpected Direction');

    return str;
}

function takeStep({ x, y }: HexPoint, direction: Direction): HexPoint {
    switch(direction) {
        case Direction.N:
            return { x, y: y - 1 };
        case Direction.NE:
            return { x: x + 1, y: y - 1 };
        case Direction.SE:
            return { x: x + 1, y };
        case Direction.S:
            return { x, y: y + 1 };
        case Direction.SW:
            return { x: x - 1, y: y + 1 };
        case Direction.NW:
            return { x: x - 1, y };
    }
}

function hexDistance(start: HexPoint, dest: HexPoint): number {
    return (
        Math.abs(dest.x - start.y) +
        Math.abs(dest.x + dest.y - start.x - start.y) +
        Math.abs(dest.y - start.y)
    ) / 2;
}

function partOne(input: Direction[]): number {
    const origin = { x: 0, y: 0 };
    const dest = input
        .reduce(takeStep, origin);

    return hexDistance(origin, dest);
}

function partTwo(input: Direction[]): number {
    const origin = { x: 0, y: 0 };

    return scan(takeStep, origin, input)
        .map(runHexDistance(origin))
        .reduce(max);
}

async function main(): Promise<void> {
    const input = await readFile('./input.txt', 'utf8');
    const steps = input
        .split(',')
        .map(parseDirection);

    console.log(partOne(steps));
    console.log(partTwo(steps));
}

main();