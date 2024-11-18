function test() {
  return this.red;
}

class Test {
  constructor(val) {
    this.red = val;
  }
}

Test.prototype.test = test;

let a = new Test("a");
console.log(a.test());
