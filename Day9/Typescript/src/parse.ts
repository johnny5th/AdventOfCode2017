import { regexp, alt, any, string, createLanguage, sepBy, succeed } from 'parsimmon';

export enum ValueType {
    Garbage = 'garbage',
    Ignored = 'ignored',
    VSymbol = 'symbol',
    Group = 'group'
};

export interface Value {
    type: ValueType,
    contents: Value[] | string
};

export interface VSymbol extends Value {
    type: ValueType.VSymbol,
    contents: string
};
export function isSymbol(g: Value): g is VSymbol {
    return g.type == ValueType.VSymbol
}
function VSymbol(contents: string): VSymbol {
    return { type: ValueType.VSymbol, contents };
}

export interface Garbage extends Value {
    type: ValueType.Garbage,
    contents: Value[]
};
export function isGarbage(g: Value): g is Garbage {
    return g.type == ValueType.Garbage
}
function Garbage(contents: Value[]): Garbage {
    return { type: ValueType.Garbage, contents };
}

export interface Ignored extends Value {
    type: ValueType.Ignored,
    contents: string
};
function Ignored(contents: string): Ignored {
    return { type: ValueType.Ignored, contents };
}

export interface Group extends Value {
    type: ValueType.Group,
    contents: Value[]
}
export function isGroup(g: Value): g is Group {
    return g.type == ValueType.Group
}
function Group(contents: Value[]): Group {
    const removeNull = (v: Value) => v != null;

    return { type: ValueType.Group, contents: contents.filter(removeNull) };
}

export function parse(input: string): Group {
    const Language = createLanguage({
        GarbageIgnored: function() {
            return string('!')
                .then(any)
                .map(Ignored);
        },
        GarbageOpen: function() {
            return string('<');
        },
        GarbageClose: function() {
            return string('>');
        },
        GarbageSymbol: function() {
            return regexp(/[^!>]+/)
                .map(VSymbol);
        },
        GarbageValue: function(r) {
            return alt(
                r.GarbageIgnored,
                r.GarbageSymbol
            );
        },
        Garbage: function(r) {
            return r.GarbageOpen
                .then(r.GarbageValue.many())
                .skip(r.GarbageClose)
                .map(Garbage);
        },
        GroupOpen: function() {
            return string('{');
        },
        GroupClose: function() {
            return string('}');
        },
        GroupSeparator: function() {
            return string(',');
        },
        GroupValue: function(r) {
            return alt(
                r.Garbage,
                r.Group,
                succeed(null)
            );
        },
        Group: function(r) {
            return r.GroupOpen
                .then(sepBy(r.GroupValue, r.GroupSeparator))
                .skip(r.GroupClose)
                .map(Group);
        }
    });

    return Language.Group.tryParse(input);
}