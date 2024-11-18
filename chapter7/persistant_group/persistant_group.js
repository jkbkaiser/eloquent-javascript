class PGroup {
  constructor(values) {
    this.values = values;
  }

  add(value) {
    let newValues = Array.from(this.values);

    if (!newValues.includes(value)) {
      newValues.push(value);
    }

    return new PGroup(newValues);
  }

  delete(value) {
    let newValues;

    if (this.values.includes(value)) {
      newValues = this.values.filter((elem) => elem !== value);
    } else {
      newValues = Array.from(this.values);
    }

    return new PGroup(newValues);
  }

  has(value) {
    return this.values.includes(value);
  }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
