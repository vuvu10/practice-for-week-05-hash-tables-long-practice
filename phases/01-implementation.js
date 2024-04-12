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

  insertNoCollision(key, value) {
    const index = this.hashMod(key);

    if (this.data[index] !== null) {
      throw new Error("Collision detected");
    }
    this.data[index] = new KeyValuePair(key, value);
    this.count++;
  }

  insertWithHasCollisions(key, value) {
    const index = this.hashMod(key);

    const currentHead = this.data[index];

    const newPair = new KeyValuePair(key, value);

    newPair.next = currentHead;

    this.data[index] = newPair;

    this.count++;

  }


  insert(key, value) {
    // Your code here
    const index = this.hashMod(key);
    const newNode = new KeyValuePair(key, value);

    let current = this.data[index];

    if (!current) {
      this.data[index] = newNode;
    } else {
      while (current) {
        if (current.key === key) {
          throw new Error("Dupicate key found");
        }
        current = current.next;
      }
      current.next = newNode;
    }
    this.count++;
  }



  read(key) {
    // Your code here
    const index = this.hashMod(key);

    let current = this.data[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  }


  resize() {
    // Your code here
    const oldData = this.data;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    for (let i = 0; i < oldData.length; i++) {
      let current = oldData[i];

      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }
    }
  }


  delete(key) {
    // Your code here
    const index = this.hashMod(key);

    let current = this.data[index];

    let prev = null;



    while (current) {
      if (current.key === key) {
          if (prev) {
            prev.next = current.next;
          } else {
            this.data[index] = current.next;
          }
          this.count--;
          return;
        }
        prev = current;
        current = current.next;
      }
      return "Key not found";

    }


  }








module.exports = HashTable;
