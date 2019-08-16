const [a, b, ... arr] = [1, 2, 3, 4, 5];

export { a, b, arr }
export function fn(... args) { return args }
const { x, y, ... z } = { x: 1, y: 2, a: 3, b: 4 };
export const n = { x, y, ... z };
