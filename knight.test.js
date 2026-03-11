import { isValid, knightMoves } from './knight';

describe('testing functions from knight.js', () => {
	describe('helper function isValid() keeps moves in bounds', () => {
		test('isValid returns true for moves inside the board', () => {
			expect(isValid([0, 0])).toBeTruthy();
			expect(isValid([4, 4])).toBeTruthy();
			expect(isValid([7, 7])).toBeTruthy();
			expect(isValid([3, 3])).toBeTruthy();
		});
		test('isValid returns false for moves with x < 0', () => {
			expect(isValid([-1, 2])).toBeFalsy();
			expect(isValid([-5, 4])).toBeFalsy();
		});
		test('isValid returns false for moves with y < 0', () => {
			expect(isValid([2, -1])).toBeFalsy();
			expect(isValid([4, -3])).toBeFalsy();
		});
		test('isValid returns false for moves with x > 7', () => {
			expect(isValid([8, 5])).toBeFalsy();
			expect(isValid([10, 3])).toBeFalsy();
		});
		test('isValid returns false for moves with y > 7', () => {
			expect(isValid([5, 9])).toBeFalsy();
			expect(isValid([3, 12])).toBeFalsy();
		});
	});
	describe('knightMoves()', () => {
		test('returns 0 when start and end are the same', () => {
			expect(knightMoves([3, 3], [3, 3])).toBe(0);
		});

		test('computes correct moves for simple reachable positions', () => {
			expect(knightMoves([0, 0], [1, 2])).toBe(1);
			expect(knightMoves([0, 0], [2, 1])).toBe(1);
		});

		test('computes correct moves for known BFS distances', () => {
			expect(knightMoves([0, 0], [3, 3])).toBe(2);
			expect(knightMoves([0, 0], [4, 4])).toBe(4);
		});

		test('computes correct moves for farthest corner', () => {
			expect(knightMoves([0, 0], [7, 7])).toBe(6);
		});

		test('returns undefined and logs error for invalid inputs', () => {
			const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
			const result = knightMoves([-1, 0], [7, 7]);

			expect(result).toBeUndefined();
			expect(spy).toHaveBeenCalledWith('Move out of bounds.');

			spy.mockRestore();
		});
	});
});
