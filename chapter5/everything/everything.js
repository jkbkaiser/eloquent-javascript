function every(array, test) {
  for (let elem of array) {
    if (!test(elem)) {
      return false;
    }
  }

  return true;
}

console.time("v1");
console.log(every([1, 3, 5], (n) => n < 10));
// → true
console.log(every([2, 4, 16], (n) => n < 10));
// → false
console.log(every([], (n) => n < 10));
// → true
console.timeEnd("v1");

function everyV2(array, test) {
  return !array.some((a) => !test(a));
}

console.time("v2");
console.log(everyV2([1, 3, 5], (n) => n < 10));
// → true
console.log(everyV2([2, 4, 16], (n) => n < 10));
// → false
console.log(everyV2([], (n) => n < 10));
// → true
console.timeEnd("v2");
