import { resolve } from "node:path";
import { lstat, readFile, readdir } from "node:fs";

const regexp = new RegExp(process.argv[2]);
const searchNodes = process.argv.slice(3);

function search(searchNodes) {
  for (let node of searchNodes) {
    let path = resolve(node);

    lstat(path, (err, stats) => {
      if (err) return console.log(err);

      if (stats.isFile()) {
        readFile(path, "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          for (let line of data.split("\n")) {
            if (regexp.test(line)) {
              console.log(node);
              return;
            }
          }
        });
      } else if (stats.isDirectory()) {
        readdir(path, (err, files) => {
          if (err) {
            console.error(err);
            return;
          }

          search(files.map((file) => `${node}/${file}`));
        });
      } else {
        console.log("is not file or directory");
      }
    });
  }
}

search(searchNodes);
