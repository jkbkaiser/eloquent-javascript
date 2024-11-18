let size = 8;
let output = "";

for (let i = 0; i < size; i++) {
    if (i % 2 == 0) {
        output += " ";
    }

    for (let j = 0; j < size; j++) {
        if (j % 2 == 0) {
            output += "#";
        } else {
            output += " ";
        }
    }

    output += "\n";
}

console.log(output);
