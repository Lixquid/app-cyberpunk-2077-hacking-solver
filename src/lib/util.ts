// @eslint-disable @typescript-eslint/camelcase

/**
 * Joins two strings, contracting the string when there is an overlap.
 * @param left The left string to be joined.
 * @param right The right string to be joined.
 * @example join("abc", "bcde") // Returns "abcde"
 */
export function join(left: string, right: string): string {
    if (left === right || left.endsWith(right)) {
        return left;
    }
    if (right.startsWith(left)) {
        return right;
    }

    const leftOffset =
        left.length > right.length ? left.length - right.length : 0;
    const rightOffset =
        left.length < right.length ? right.length - left.length : 0;

    const max = Math.min(left.length, right.length);
    for (let i = 0; i < max; i++) {
        if (
            left.substr(leftOffset + i) ===
            right.substr(0, right.length - i - rightOffset)
        ) {
            return left + right.substr(-rightOffset - i);
        }
    }
    return left + right;
}

function permutationsInner<T>(options: T[], output: T[][], len: number) {
    if (len === 1) {
        output.push(options.slice());
        return;
    }

    for (let i = 0; i < len; i++) {
        permutationsInner(options, output, len - 1);

        if ((len & 1) === 0) {
            [options[i], options[len - 1]] = [options[len - 1], options[i]];
        } else {
            [options[0], options[len - 1]] = [options[len - 1], options[0]];
        }
    }
}

/**
 * Returns all permutations of the given elements.
 * @param options The options to create permutations from.
 * @example
 * permutations([1, 2, 3])
 * // Returns [ [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1] ] */
export function permutations<T>(options: ReadonlyArray<T>): T[][] {
    const output: T[][] = [];

    permutationsInner(options.slice(), output, options.length);

    return output;
}

function solveInner(
    grid: ReadonlyArray<ReadonlyArray<string>>,
    sequence: string,
    actions: [number, number][],
    tolerance: number,
    vertical: boolean,
    index: number
): boolean {
    if (sequence === "") {
        return true;
    }

    // Try to solve for no gap
    for (let i = 0; i < (vertical ? grid[0].length : grid.length); i++) {
        const x = vertical ? index : i;
        const y = vertical ? i : index;

        if (actions.some(e => e[0] === x && e[1] === y)) {
            continue;
        }
        if (grid[x][y] === sequence[0]) {
            actions.push([x, y]);
            if (
                solveInner(
                    grid,
                    sequence.substr(1),
                    actions,
                    tolerance,
                    !vertical,
                    i
                )
            ) {
                return true;
            }
            actions.pop();
        }
    }

    if (tolerance === 0) {
        return false;
    }

    // No solution, let's try using one "jump" of tolerance
    for (let i = 0; i < (vertical ? grid[0].length : grid.length); i++) {
        const x = vertical ? index : i;
        const y = vertical ? i : index;

        if (actions.some(e => e[0] === x && e[1] === y)) {
            continue;
        }
        actions.push([x, y]);
        if (solveInner(grid, sequence, actions, tolerance - 1, !vertical, i)) {
            return true;
        }
        actions.pop();
    }

    return false;
}

export function solveInGrid(
    grid: ReadonlyArray<ReadonlyArray<string>>,
    sequence: string,
    buffer: number
): [number, number][] | undefined {
    if (sequence.length > buffer) {
        return undefined;
    }

    for (
        let tolerance = 0;
        tolerance <= buffer - sequence.length;
        tolerance++
    ) {
        console.log(tolerance);
        const actions: [number, number][] = [];
        if (solveInner(grid, sequence, actions, tolerance, false, 0)) {
            return actions;
        }
    }

    return undefined;
}

export function solveSequences(
    grid: string[][],
    sequences: string[],
    buffer: number
): [number, number][] | undefined {
    const strings = permutations(sequences).map(v =>
        v.reduce((p, c) => join(p, c))
    );

    for (const s of strings) {
        const output = solveInGrid(grid, s, buffer);
        if (output) {
            return output;
        }
    }
}
