class Group {
  // Your code here.
  constructor() {
    this.values = [];
  }

  add(value) {
    if (!this.values.includes(value)) {
      this.values.push(value);
    }
  }

  delete(value) {
    if (this.values.includes(value)) {
      this.values = this.values.filter((elem) => elem !== value);
    }
  }

  has(value) {
    return this.values.includes(value);
  }

  static from(iter) {
    let group = new Group();
    iter.forEach((elem) => {
      group.add(elem);
    });
    return group;
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.i = 0;
  }

  next() {
    if (this.i == this.group.values.length) {
      return { done: true };
    }

    let value = this.group.values[this.i];
    this.i += 1;

    return { value, done: false };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
