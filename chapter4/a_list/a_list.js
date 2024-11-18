function arrayToList(arr) {
  let currNode = {
    value: arr[arr.length - 1],
    rest: null,
  };

  for (let i = arr.length - 2; i >= 0; i--) {
    currNode = {
      value: arr[i],
      rest: currNode,
    };
  }

  return currNode;
}

function listToArray(list) {
  let arr = [];
  let currNode = list;

  while (currNode.rest) {
    arr.push(currNode.value);
    currNode = currNode.rest;
  }

  arr.push(currNode.value);

  return arr;
}

function prepend(list, elem) {
  return {
    value: elem,
    rest: list,
  };
}

function nth(list, i) {
  if (i <= 0) {
    return list.value;
  }
  return nth(list.rest, i - 1);
}

let arr = [1, 2, 3, 4];
console.log(arr);
let list = arrayToList(arr);
console.log(list);
console.log(listToArray(list));
console.log(listToArray(prepend(list, 5)));
console.log(nth(list, 3));
