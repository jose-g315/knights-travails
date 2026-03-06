export default class HashMap {
	constructor(loadfactor = 0.75, capacity = 16) {
		this.loadFactor = loadfactor;
		this.capacity = capacity;
		this.size = 0;
		this.buckets = Array.from({ length: capacity }, () => []);
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}

		return hashCode;
	}
	// helper to normalize hash
	_getIndex(key) {
		let index = this.hash(key) % this.capacity;
		if (index < 0) index += this.capacity;
		return index;
	}

	set(key, value) {
		const index = this._getIndex(key);
		const bucket = this.buckets[index];
		// updating
		for (const entry of bucket) {
			if (entry.key === key) {
				entry.value = value;
				return;
			}
		}
		// new entry
		bucket.push({ key, value });
		this.size++;

		if (this.size / this.capacity > this.loadFactor) {
			this._resize();
		}
	}
	// helper to resize
	_resize() {
		const newEntries = this.entries();
		this.capacity *= 2;
		this.buckets = Array.from({ length: this.capacity }, () => []);
		this.size = 0;
		for (const entry of newEntries) {
			this.set(entry[0], entry[1]);
		}
	}
	get(key) {
		const index = this._getIndex(key);
		const bucket = this.buckets[index];
		for (const entry of bucket) {
			if (entry.key === key) {
				return entry.value;
			}
		}
		return null;
	}
	has(key) {
		const index = this._getIndex(key);
		const bucket = this.buckets[index];
		for (const entry of bucket) {
			if (entry.key === key) {
				return true;
			}
		}
		return false;
	}
	remove(key) {
		const index = this._getIndex(key);
		const bucket = this.buckets[index];
		for (let i = 0; i < bucket.length; i++) {
			if (bucket[i].key === key) {
				bucket.splice(i, 1);
				this.size--;
				return true;
			}
		}
		return false;
	}
	length() {
		return this.size;
	}
	clear() {
		this.size = 0;
		this.buckets = Array.from({ length: this.capacity }, () => []);
	}
	keys() {
		const keys = [];
		for (const bucket of this.buckets) {
			for (const entry of bucket) {
				keys.push(entry.key);
			}
		}
		return keys;
	}
	values() {
		const values = [];
		for (const bucket of this.buckets) {
			for (const entry of bucket) {
				values.push(entry.value);
			}
		}
		return values;
	}
	entries() {
		const entries = [];
		for (const bucket of this.buckets) {
			for (const entry of bucket) {
				const singleEntry = [entry.key, entry.value];
				entries.push(singleEntry);
			}
		}
		return entries;
	}
	printMap() {
		for (let i = 0; i < this.buckets.length; i++) {
			console.log(`Bucket${i}: `, this.buckets[i]);
		}
		console.log('Current Length:', this.size);
		console.log('Current Capacity: ', this.capacity);
		console.log('Load Factor at:', this.size / this.capacity);
	}
}
