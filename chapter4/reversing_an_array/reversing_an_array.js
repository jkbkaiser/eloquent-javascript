function reverseArray(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

function reverseArrayInPlace(arr) {
  let max = arr.length - 1;
  let half = Math.floor(max / 2);

  for (let i = 0; i <= half; i++) {
    let tmp = arr[i];
    arr[i] = arr[max - i];
    arr[max - i] = tmp;
  }

  return arr;
}

let arr = [1, 2, 3, 4];
console.log("Starting arr: ", arr);

console.time("reverse");
console.log(reverseArray(arr));
console.timeEnd("reverse");

console.time("reverse in place");
console.log(reverseArrayInPlace(arr));
console.timeEnd("reverse in place");
