function knightMoves(start, end) {
	if (isValid(start) && isValid(end)) {
		const visitedNodes = new Set();
		let queue = [start];
		let moves = 0;
		visitedNodes.add(start);
		const [dx, dy] = end;

		while (queue.length) {
			const next = [];
			while (queue.length) {
				const [x, y] = queue.shift();
				if (x === dx && y === dy) {
					console.log(`You made it in ${moves} moves!`);
					return moves;
				}

				for (const move of validMoves) {
					const nextX = x + move[0];
					const nextY = y + move[1];
					if (
						isValid([nextX, nextY]) &&
						!visitedNodes.has(`${nextX},${nextY}`)
					) {
						visitedNodes.add(`${nextX},${nextY}`);
						next.push([nextX, nextY]);
					}
				}
			}
			moves++;
			queue = next;
			console.log(queue[0]);
		}
	} else {
		console.log('Move out of bounds.');
	}
}

function isValid([x, y]) {
	// x or y cannot be  < 0 or > 7
	if (x >= 0 && x < 8 && y >= 0 && y < 8) {
		return true;
	}
	return false;
}
const validMoves = [
	[1, 2],
	[2, 1],
	[2, -1],
	[1, -2],
	[-1, -2],
	[-2, -1],
	[-2, 1],
	[-1, 2],
];

console.log(knightMoves([0, 0], [7, 7]));

export { knightMoves, isValid };
