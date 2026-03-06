import Hashmap from './hash-map';

describe('HashMap', () => {
	let map;
	beforeEach(() => {
		map = new Hashmap();
	});
	describe('set(key,value) and get(key)', () => {
		test('set() and get()', () => {
			map.set('frog', 'green');
			expect(map.get('frog')).toMatch('green');
		});
		test('get() if null ', () => {
			expect(map.get('notInMap')).toBeNull();
		});
		test('get() when two key/value pairs share same bucket', () => {
			map.set('lion', 'golden');
			map.set('dog', 'brown');
			expect(map.get('dog')).toMatch('brown');
			expect(map.get('lion')).toMatch('golden');
		});
	});
	describe('has(key)', () => {
		test('has() when value is in the map', () => {
			map.set('lion', 'golden');
			expect(map.has('lion')).toBeTruthy();
		});
		test('has() when value is not in the map', () => {
			map.set('lion', 'golden');
			expect(map.has('dog')).toBeFalsy();
		});
	});
	describe('remove(key)', () => {
		test('remove() when key is in map', () => {
			map.set('lion', 'golden');
			expect(map.remove('lion')).toBeTruthy();
			expect(map.has('lion')).toBeFalsy();
		});
		test('remove() when key is not in map', () => {
			expect(map.remove('lion')).toBeFalsy();
			expect(map.has('lion')).toBeFalsy();
		});
	});
	describe('length()', () => {
		test('length is zero', () => {
			expect(map.length()).toEqual(0);
		});
		test('length is 3', () => {
			map.set('lion', 'golden');
			map.set('dog', 'brown');
			map.set('frog', 'green');
			expect(map.length()).toEqual(3);
		});
	});
	describe('clear()', () => {
		test('clear all entries', () => {
			map.set('lion', 'golden');
			map.set('dog', 'brown');
			map.set('frog', 'green');
			map.clear();
			expect(map.length()).toEqual(0);
			expect(map.has('lion')).toBeFalsy();
			expect(map.get('dog')).toBeNull();
			map.set('bear', 'brown');
			expect(map.get('bear')).toBe('brown');
		});
	});
	describe('keys()', () => {
		test('keys on an empty map', () => {
			expect(map.keys()).toEqual([]);
		});
		test('keys on an populated map', () => {
			map.set('lion', 'golden');
			map.set('dog', 'brown');
			map.set('frog', 'green');
			expect(map.keys()).toContain('lion');
			expect(map.keys()).toContain('dog');
			expect(map.keys()).toContain('frog');
		});
	});
	describe('values()', () => {
		test('values on an empty map', () => {
			expect(map.values()).toEqual([]);
		});
		test('values on an populated map', () => {
			map.set('lion', 'golden');
			map.set('dog', 'brown');
			map.set('frog', 'green');
			expect(map.values()).toContain('golden');
			expect(map.values()).toContain('brown');
			expect(map.values()).toContain('green');
		});
	});
	describe('entries()', () => {
		test('entries on an empty map', () => {
			expect(map.entries()).toEqual([]);
		});
		test('entries on an populated map', () => {
			map.set('lion', 'golden');
			map.set('dog', 'brown');
			map.set('frog', 'green');
			expect(map.entries()).toContainEqual(['lion', 'golden']);
			expect(map.entries()).toContainEqual(['dog', 'brown']);
			expect(map.entries()).toContainEqual(['frog', 'green']);
		});
	});
	describe('resize()', () => {
		test('resizes when load factor exceeded', () => {
			// initial capacity is 16 with load factor of .75
			// capacity should double
			for (let i = 0; i < 13; i++) {
				map.set(`key${i}`, `value${i}`);
			}
			expect(map.capacity).toBe(32);
		});
		test('keeps all entries after resize', () => {
			for (let i = 0; i < 20; i++) {
				map.set(`k${i}`, `v${i}`);
			}
			for (let i = 0; i < 20; i++) {
				expect(map.get(`k${i}`)).toBe(`v${i}`);
			}
		});
		test('size remains correct after resize', () => {
			for (let i = 0; i < 20; i++) {
				map.set(`k${i}`, `v${i}`);
			}
			expect(map.length()).toBe(20);
		});
		test('hashing works correctly after resize', () => {
			map.set('apple', 'red');
			map.set('banana', 'yellow');
			map.set('carrot', 'orange');
			// force resize
			for (let i = 0; i < 20; i++) {
				map.set(`k${i}`, `${i}`);
			}
			expect(map.get('apple')).toMatch('red');
			expect(map.get('banana')).toMatch('yellow');
			expect(map.get('carrot')).toMatch('orange');
		});
		test('does not resize before load factor is exceeded', () => {
			for (let i = 0; i < 12; i++) {
				map.set(`k${i}`, `v${i}`);
			}
			expect(map.capacity).toBe(16); // still original
		});
	});
});
