import { readFile as readFileAsync } from 'fs';
import { promisify } from 'util';
import { partition, contains, prop, any, equals, concat } from 'ramda';

type Empty = null;
type ProgramNodeList = ProgramNode[];

type NodeReferenceList
    = string[]
    | Empty;

interface ProgramNode {
    name: string,
    weight: number,
    supports: NodeReferenceList
};

const readFile = promisify(readFileAsync);

function setToTopLevel(n: ProgramNode): ProgramNode {
    return {
        ...n,
        supports: null
    };
}

function nodeSupportsSomething(node: ProgramNode): boolean {
    return node.supports != null;
}

function nodeSupportsANodeInList(nodeList: ProgramNodeList, node: ProgramNode): boolean {
    const supportedNodes = node.supports;
    const nodeListNames = nodeList.map(prop('name'));

    // Returns if the name of ALL of the supported nodes appear in the given list
    return any(equals(true), supportedNodes.map(n => contains(n, nodeListNames)));
}

function topDownNodeElimination(nodes: ProgramNodeList): ProgramNode {
    const [otherNodes, topLevelNodes] = partition(nodeSupportsSomething, nodes);
    const [nthLevelNodes, secondLevelNodes] = partition(n => nodeSupportsANodeInList(otherNodes, n), otherNodes);

    if (nthLevelNodes.length == 1)
        return nthLevelNodes[0];

    return topDownNodeElimination(concat(nthLevelNodes, secondLevelNodes.map(setToTopLevel)));
}

function parseProgramNode(raw: string): ProgramNode {
    const matches = /^([a-z]+) \((\d+)\)(?: -> (.*))?$/i.exec(raw);

    return {
        name: matches[1],
        weight: Number(matches[2]),
        supports: matches[3]
            ? matches[3].split(', ')
            : null
    };
}

async function main(): Promise<void> {
    const rawInput = await readFile('./input.txt', 'utf8');
    const nodes = rawInput
        .split('\n')
        .map(parseProgramNode);

    console.log(topDownNodeElimination(nodes));
}

main();