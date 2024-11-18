function range(start, end, step) {
  let arr = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      arr.push(i);
    }
  } else {
    for (let i = start; i >= end; i += step) {
      arr.push(i);
    }
  }

  return arr;
}

function sum(arr) {
  return arr.reduce((a, b) => a + b);
}

console.log(range(5, 2, -1));
console.log(range(1, 10, 2));
console.log(sum(range(1, 10, 2)));
