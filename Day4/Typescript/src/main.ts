import { readFile as readFileAsync } from 'fs';
import { promisify } from 'util';
import { uniq, uniqWith, groupBy, identity, map, length, equals as objEq } from 'ramda';

interface AtomDOF {
    [letter: string]: number
}

const readFile = promisify(readFileAsync);

function calculatePassphraseAtomDegreesOfFreedom(atom: string): AtomDOF {
    return map(length, groupBy<string>(identity, atom.split('')));
}

function isValidPassphrase(phrase: string[]): boolean {
    return uniq(phrase).length == phrase.length;
}

function isValidSecurePassphrase(phrase: string[]): boolean {
    return uniqWith(objEq, phrase.map(calculatePassphraseAtomDegreesOfFreedom)).length == phrase.length;
}

function partN(fn: (phrase: string[]) => boolean, input: string[][]): number {
    return input
        .map(fn)
        .filter(b => b == true)
        .length;
}

async function main(): Promise<void> {
    const rawInput = await readFile('./input.txt', 'utf8');
    const input = rawInput
        .split('\n')
        .map(p => p.split(' '));

    console.log(partN(isValidPassphrase, input));
    console.log(partN(isValidSecurePassphrase, input));
}

main();