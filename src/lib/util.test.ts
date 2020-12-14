// import { join, permutations, solve_in_grid } from "./util";

// describe("join", () => {
//     it("should return no overlap for different strings", () => {
//         expect(join("abc", "123")).toBe("abc123");
//     });
//     it("should return a smaller string for partial overlap", () => {
//         expect(join("abc", "cde")).toBe("abcde");
//         expect(join("abcd", "cdefg")).toBe("abcdefg");
//         expect(join("abcde", "cdef")).toBe("abcdef");
//     });
//     it("should return one value if it contains another", () => {
//         expect(join("abcde", "cde")).toBe("abcde");
//         expect(join("abc", "abcde")).toBe("abcde");
//     });
// });

// describe("permutations", () => {
//     it("should return an empty list for no options", () => {
//         expect(permutations([])).toStrictEqual([]);
//     });
//     it("should return a single item for one option", () => {
//         expect(permutations([1])).toStrictEqual([[1]]);
//     });
//     it("should return an array of permutations for options", () => {
//         expect(permutations([1, 2])).toStrictEqual([
//             [1, 2],
//             [2, 1],
//         ]);
//         expect(permutations([1, 2, 3])).toStrictEqual([
//             [1, 2, 3],
//             [2, 1, 3],
//             [3, 1, 2],
//             [1, 3, 2],
//             [2, 3, 1],
//             [3, 2, 1],
//         ]);
//     });
// });

// describe("solve_in_grid", () => {
//     it("should return a solution for no gaps", () => {
//         expect(
//             solve_in_grid(
//                 [
//                     ["Z", "A", "Z"],
//                     ["B", "C", "Z"],
//                     ["Z", "Z", "Z"],
//                 ],
//                 "BCA",
//                 3
//             )
//         ).toStrictEqual([
//             [1, 0],
//             [1, 1],
//             [0, 1],
//         ]);
//     });
//     it("should return undefined for no solution", () => {
//         expect(
//             solve_in_grid(
//                 [
//                     ["Z", "A", "Z"],
//                     ["Z", "C", "Z"],
//                     ["Z", "Z", "Z"],
//                 ],
//                 "BCA",
//                 3
//             )
//         ).toBe(undefined);
//     });
//     it("should return a solution with a gap", () => {
//         expect(
//             solve_in_grid(
//                 [
//                     ["Z", "C", "A"],
//                     ["Z", "B", "Z"],
//                     ["Z", "Z", "Z"],
//                 ],
//                 "BCA",
//                 4
//             )
//         ).toStrictEqual([
//             [1, 0],
//             [1, 1],
//             [0, 1],
//             [0, 2],
//         ]);
//     });
// });
