//#region Utility functions
/** Joins two strings, overlapping the end of the first string with the start
 * of the second string if they have any characters in common.
 * @example joinOverlap("abc", "bcd") => "abcd"
 */
function joinOverlap(a: string, b: string): string {
    if (a.endsWith(b)) {
        return a;
    }
    if (b.startsWith(a)) {
        return b;
    }

    const leftOffset = Math.max(0, a.length - b.length);
    const rightOffset = Math.max(0, b.length - a.length);

    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
        if (
            a.substring(leftOffset + i) ===
            b.substring(0, b.length - i - rightOffset)
        ) {
            return a + b.substring(b.length - i - rightOffset);
        }
    }
    return a + b;
}

/** Generates permutations of an array.
 * @example permutations([1, 2, 3]) => [[1, 2, 3], [1, 3, 2], [2, 1, 3], ...]
 */
function* permutations<T>(arr: ReadonlyArray<T>): Generator<T[]> {
    if (arr.length === 1) {
        yield [...arr];
    } else {
        for (let i = 0; i < arr.length; i++) {
            const sub = [...arr];
            const [val] = sub.splice(i, 1);
            for (const perm of permutations(sub)) {
                yield [val, ...perm];
            }
        }
    }
}

/** Generates permutations of an array by removing elements, starting from the start.
 * @example permutations([1, 2, 3]) => [[1, 2, 3], [2, 3], [1, 3], [3], [1, 2], [2], [1], []]
 */
function* permutationsByRemoval<T>(arr: ReadonlyArray<T>): Generator<T[]> {
    if (arr.length === 0) {
        yield [];
    } else {
        yield* map(permutationsByRemoval(arr.slice(0, -1)), (perm) => [
            ...perm,
            arr[arr.length - 1],
        ]);
        yield* permutationsByRemoval(arr.slice(0, -1));
    }
}

/** Maps the values of a generator to other values. */
function* map<T, U>(gen: Generator<T>, mapFn: (value: T) => U): Generator<U> {
    for (const value of gen) {
        yield mapFn(value);
    }
}
//#endregion

/**
 * Returns if a given sequence of characters can be found in a grid, and mutates its actions argument to contain the actions required to find the sequence.
 * @param grid The grid to search in
 * @param gridSize The size of a grid's row or column
 * @param sequence The sequence to search for
 * @param actions The actions so far (will be mutated)
 * @param tolerance The number of speculative actions that don't immediately lead to the sequence being found that are allowed
 * @param vertical If true, look for the next character vertically instead of horizontally
 * @param index The index of the row or column to search along
 */
function solveRecursive(
    grid: ReadonlyArray<string>,
    gridSize: number,
    sequence: string,
    actions: [x: number, y: number][],
    tolerance: number,
    vertical: boolean,
    index: number
): boolean {
    if (sequence.length === 0) {
        // Solved
        return true;
    }

    // First, try to find the next character in the sequence
    const nextChar = sequence[0];
    for (let i = 0; i < gridSize; i++) {
        const x = vertical ? index : i;
        const y = vertical ? i : index;

        // Can't reuse a cell
        if (actions.some(([ax, ay]) => ax === x && ay === y)) {
            continue;
        }

        if (grid[y * gridSize + x] === nextChar) {
            // Found the next character
            actions.push([x, y]);
            if (
                solveRecursive(
                    grid,
                    gridSize,
                    sequence.slice(1),
                    actions,
                    tolerance,
                    !vertical,
                    i
                )
            ) {
                // Solved! Return true up the call stack
                return true;
            }
            // Didn't solve, so backtrack
            actions.pop();
        }
    }

    // If we're allowed to speculate, try to find the next character in the sequence
    if (tolerance === 0) {
        return false;
    }

    for (let i = 0; i < gridSize; i++) {
        const x = vertical ? index : i;
        const y = vertical ? i : index;

        // Can't reuse a cell
        if (actions.some(([ax, ay]) => ax === x && ay === y)) {
            continue;
        }

        actions.push([x, y]);
        if (
            solveRecursive(
                grid,
                gridSize,
                sequence,
                actions,
                tolerance - 1,
                !vertical,
                i
            )
        ) {
            // Solved! Return true up the call stack
            return true;
        }
        // Didn't solve, so backtrack
        actions.pop();
    }

    // Couldn't find the next character even with speculation
    return false;
}

/**
 * Returns a list of actions that can be taken to find a given sequence of
 * characters in a grid, or undefined if the sequence cannot be found.
 * @param grid The grid to search in
 * @param gridSize The size of a grid's row or column
 * @param sequence The sequence to search for
 * @param bufferSize The maximum number of actions that can be taken before the
 *  sequence is found
 */
export function solve(
    grid: ReadonlyArray<string>,
    gridSize: number,
    sequence: string,
    bufferSize: number
): [x: number, y: number][] | undefined {
    if (sequence.length > bufferSize) {
        // Impossible to solve
        return undefined;
    }

    // Search with no speculative actions first, then with increasing numbers
    // of speculative actions until we find a solution
    for (let t = 0; t <= bufferSize - sequence.length; t++) {
        console.log("        Trying with tolerance", t);
        const actions: [x: number, y: number][] = [];
        if (solveRecursive(grid, gridSize, sequence, actions, t, false, 0)) {
            return actions;
        }
    }

    // Couldn't solve
    return undefined;
}

/**
 * Returns a list of actions that can be taken to find a collection of
 * sequences of characters in a grid regardless of the order in which they are
 * found, or undefined if the sequences cannot be found.
 * @param grid The grid to search in
 * @param gridSize The size of a grid's row or column
 * @param sequences The sequences to search for
 * @param bufferSize The maximum number of actions that can be taken before the
 * sequences are found
 */
export function solveAll(
    grid: ReadonlyArray<string>,
    gridSize: number,
    sequences: string[],
    bufferSize: number
): [x: number, y: number][] | undefined {
    // Generate all possible permutations of the sequences
    const strings = map(permutations(sequences), (seq) =>
        seq.reduce(joinOverlap)
    );

    // Try every permutation of the sequences
    for (const sequence of strings) {
        console.log("    Solving for", sequence);
        const result = solve(grid, gridSize, sequence, bufferSize);
        if (result !== undefined) {
            return result;
        }
    }

    // Couldn't solve
    return undefined;
}

/**
 * Returns a list of actions that can be taken to find the largest possible
 * collection of sequences of characters in a grid regardless of the order in
 * which they are found as well as the sequences themselves.
 * @param grid The grid to search in
 * @param gridSize The size of a grid's row or column
 * @param sequences The sequences to search for. It is assumed that the
 * later sequences in the array are more important than the earlier ones.
 * @param bufferSize The maximum number of actions that can be taken before the
 * sequences are found
 */
export function solveBest(
    grid: ReadonlyArray<string>,
    gridSize: number,
    sequences: string[],
    bufferSize: number
): {
    actions: [x: number, y: number][];
    found: boolean[];
} {
    for (const sequenceGroup of permutationsByRemoval(sequences)) {
        console.log("Solving for sequence group", sequenceGroup);
        const actions = solveAll(grid, gridSize, sequenceGroup, bufferSize);
        if (actions !== undefined) {
            return {
                actions,
                found: sequences.map((seq) => sequenceGroup.includes(seq)),
            };
        }
    }
    return {
        actions: [],
        found: Array(sequences.length).fill(false),
    };
}
