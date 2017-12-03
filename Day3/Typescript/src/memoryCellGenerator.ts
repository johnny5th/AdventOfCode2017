import { Coordinate, coordinateGenerator } from './coordinateGenerator';

export type MemoryCell = [number, Coordinate];

export function * memoryCellGenerator(): IterableIterator<MemoryCell> {
    let n = 1;

    for (let coord of coordinateGenerator()) {
        yield [n++, coord];
    }
}

export function takeNthMemoryCell(n: number): MemoryCell {
    const cellGenerator = memoryCellGenerator();

    // The memory cells are 1-indexed
    for (let i = 1; i < n; i++)
        cellGenerator.next();

    return cellGenerator.next().value;
}