import HashMap from './hash-map.js';

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log('Testing get and it should return purple : ', test.get('grape'));
console.log('Testing has and it should return true : ', test.has('lion'));
console.log('Testing length and it should return 12 : ', test.length());
test.printMap();
// adding more entries and testing again to see if resize works
test.remove('lion');
test.set('moon', 'silver');
test.set('flower', 'pink');
test.set('apple', 'green');
console.log(
	'Removing lion and adding a new entry and updating key apple to value green',
);
console.log('Also resize will fire and capacity should be 32');
console.log('Testing get and it should return null : ', test.get('lion'));
console.log('Testing has and it should return false  : ', test.has('lion'));
console.log('Testing length and it should return 13 : ', test.length());
test.printMap();

// testing keys, values, entries, and clear
console.log('Testing keys, values, entries, and clear');
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.clear();
test.printMap();
