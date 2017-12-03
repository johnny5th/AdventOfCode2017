export type Coordinate = [number, number];

export function * coordinateGenerator(): IterableIterator<Coordinate> {
    let n = 1;
    let move = 1;

    let coordX = 0;
    let coordY = 0;

    yield [0, 0];

    while (true) {
        for (let i = 0; i < move; i++) // Move right
            yield [++coordX, coordY];

        for (let i = 0; i < move; i++) // Move up
            yield [coordX, ++coordY];

        move += 1;

        for (let i = 0; i < move; i++) // Move left
            yield [--coordX, coordY];

        for (let i = 0; i < move; i++) // Move down
            yield [coordX, --coordY];

        move += 1;
    }
}