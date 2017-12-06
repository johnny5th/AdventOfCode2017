type Thunk<T> = (...args: any[]) => T;

export function trampoline<T>(fn: Thunk<T>): Thunk<T> {
    return function(...args: any[]) {
        let res = fn.apply(this, arguments);
        while (res instanceof Function)
            res = res();
        return res;
    }
}