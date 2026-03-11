import { knightMoves } from './knight.js';

function runDemo() {
	const tests = [
		{ start: [0, 0], end: [1, 2] },
		{ start: [0, 0], end: [2, 1] },
		{ start: [0, 0], end: [3, 3] },
		{ start: [0, 0], end: [4, 4] },
		{ start: [0, 0], end: [7, 7] },
		{ start: [3, 3], end: [3, 3] },
		{ start: [-1, 0], end: [7, 7] }, // invalid
	];

	for (const { start, end } of tests) {
		console.log(`Start: ${start} → End: ${end}`);
		const result = knightMoves(start, end);
		console.log(`Result: ${result}\n`);
	}
}

runDemo();
