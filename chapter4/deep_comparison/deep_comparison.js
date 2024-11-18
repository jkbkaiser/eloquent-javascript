function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null || typeof a != "object" || typeof b != "object") {
    return false;
  }

  let keysA = Object.keys(a);
  let keysB = Object.keys(b);

  if (keysA.length != keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

let a = {
  a: 1,
  b: {
    t: 1,
    r: 3,
  },
};

let b = {
  a: 1,
  b: {
    t: 1,
    r: 2,
  },
};

console.log(deepEqual(a, b));

// console.log()
