import { readFile as readFileAsync } from 'fs';
import { promisify, inspect } from 'util';
import { partition, contains, prop, any, equals, concat, add, uniq } from 'ramda';

type ProgramNodeList = ProgramNode[];
type ProgramNodeTree = Tree<ProgramNode>
type NodeMap = {
    [name: string]: ProgramNode
};

interface Tree<T> {
    value: T,
    children: Tree<T>[] | null
};

interface ANode {
    name: string,
    weight: number
};

interface ProgramNode extends ANode {
    supports: string[] | null
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

function buildTree(nodeMap: NodeMap, rootNodeName: string): ProgramNodeTree {
    const rootNode = nodeMap[rootNodeName];

    if (rootNode.supports == null)
        return {
            value: rootNode,
            children: null
        };

    const supports = rootNode.supports.map(n => buildTree(nodeMap, n));

    return {
        value: rootNode,
        children: supports
    };
}

// Unlike a pure map, the function passed as an argument receives the node value AND its children
function mapTreeRecursive<N, T>(fn: (t: Tree<N>) => T, node: Tree<N>): Tree<T> {
    if (node.children == null)
        return {
            value: fn(node),
            children: null
        };

    return {
        value: fn(node),
        children: node.children.map(n => mapTreeRecursive(fn, n))
    };
}

function evaluateNodeWeight(node: ProgramNodeTree): number {
    if (node.children == null)
        return node.value.weight;

    return node.value.weight + node.children.map(evaluateNodeWeight).reduce(add);
}

function isNodeBalanced(node: Tree<[number, number]>): [boolean, number, number, number[]] {
    const ownWeight = node.value[0];
    const totalWeight = node.value[1];

    if (node.children == null)
        return [true, node.value[0], node.value[0], [null]];

    return [uniq(node.children.map(n => n.value[1])).length == 1, ownWeight, totalWeight, node.children.map(n => n.value[1])];
}

function createWeightTree(node: ProgramNodeTree): Tree<[boolean, number, number, number[]]> {
    function evalWeights(n: ProgramNodeTree): [number, number] {
        return [n.value.weight, evaluateNodeWeight(n)];
    };

    return mapTreeRecursive(isNodeBalanced, mapTreeRecursive(evalWeights, node));
}

function partOne(input: ProgramNode[]): ProgramNode {
    return topDownNodeElimination(input);
}

function partTwo(nodeMap: NodeMap, rootNode: ProgramNode) {
    const weightTree = createWeightTree(buildTree(nodeMap, rootNode.name));

    return inspect(weightTree, { depth: null });
}

async function main(): Promise<void> {
    const rawInput = await readFile('./input.txt', 'utf8');

    const nodes: ProgramNode[] = rawInput
        .split('\n')
        .map(parseProgramNode);

    const nodeMap = nodes
        .reduce((map, n) => ({ ...map, [n.name]: n }), {});

    const rootNode = partOne(nodes);
    console.log(rootNode); // Part 1

    // I couldn't figure out what the problem was even asking for, so I just dumped a tree with some
    // useful info and looked through it manually
    console.log(partTwo(nodeMap, rootNode));
}

main();