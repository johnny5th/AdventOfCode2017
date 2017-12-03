import { curry, sum, memoize } from 'ramda';

import { Coordinate, coordinateGenerator } from './coordinateGenerator';

type SumCell = [number, Coordinate];
type MemoryMap = { [key: string]: number };

function cellKey([coordX, coordY]: Coordinate): string {
    return `${coordX}${coordY}`;
}

function getPointFromMap(map: MemoryMap, point: Coordinate): number {
    return map[cellKey(point)] || 0;
}

function sumCoordinatesAround(map: MemoryMap, [x, y]: Coordinate): number {
    const getPoint = curry(getPointFromMap)(map);

    return sum([
        getPoint([x + 1, y]),
        getPoint([x + 1, y + 1]),
        getPoint([x + 1, y - 1]),
        getPoint([x, y + 1]),
        getPoint([x, y - 1]),
        getPoint([x - 1, y]),
        getPoint([x - 1, y + 1]),
        getPoint([x - 1, y - 1]),
    ]);
}

export function * sumCellGenerator(): IterableIterator<SumCell> {
    const genKey = memoize(cellKey);
    const coords = coordinateGenerator();

    let memoryMap: MemoryMap = {
        [genKey(coords.next().value)]: 1
    };

    for (let coord of coords) {
        let key = genKey(coord);

        memoryMap[key] = sumCoordinatesAround(memoryMap, coord);

        yield [memoryMap[key], coord];
    }
}