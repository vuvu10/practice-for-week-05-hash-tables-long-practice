class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    const index = this.hashMod(key);

    let current = this.data[index];

    if (!current) {
      this.data[index] = new KeyValuePair(key, value);
      this.count++;
      return;
    }

    if (current.key === key) {
      current.value = value;
      return;

    }

    while (current.next) {
      if (current.next.key === key) {
        current.next.value = value;
        return;
      }
      current = current.next;
    }

    const newPair = new KeyValuePair(key, value);
    newPair.next = this.data[index];
    this.data[index] = newPair;
    this.count++;
  }


  read(key) {
    // Your code here
  }


  resize() {
    // Your code here
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
