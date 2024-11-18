let arrays = [[1, 2, 3], [4, 5], [6]];

function flatten(arr) {
  return arr.reduce((a, b) => a.concat(b), []);
}

console.log(flatten(arrays));
