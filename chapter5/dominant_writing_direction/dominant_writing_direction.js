import { SCRIPTS } from "./scripts.js";

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.find((c) => c.name == name);
    if (!known) {
      counts.push({ name, count: 1 });
    } else {
      known.count++;
    }
  }
  return counts;
}

function getDirection(char) {
  for (let script of SCRIPTS) {
    for (let range of script.ranges) {
      if (range[0] < char.codePointAt(0) && char.codePointAt(0) < range[1]) {
        return script.direction;
      }
    }
  }
}

function dominantDirection(text) {
  let counts = countBy(text, (char) => getDirection(char));

  let max = counts.reduce((a, b) => {
    if (a.count > b.count) {
      return a;
    } else {
      return b;
    }
  });

  return max.name;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
