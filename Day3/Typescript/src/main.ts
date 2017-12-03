import { takeNthMemoryCell } from './memoryCellGenerator';
import { sumCellGenerator } from './sumCellGenerator';

function partOne(input: number): number {
    const [_, [xCoord, yCoord]] = takeNthMemoryCell(input);

    return Math.abs(xCoord) + Math.abs(yCoord);
}

function partTwo(input: number): number {
    for (let cell of sumCellGenerator()) {
        let [value, _] = cell;

        if (value > input)
            return value;
    }
}

function main(): void {
    const input = 347991;

    console.log(partOne(input));
    console.log(partTwo(input));
}

main();