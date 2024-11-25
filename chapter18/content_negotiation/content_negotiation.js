const formats = [
  "text/plain",
  "text/html",
  "application/json",
  "application/rainbows+unicorns",
];

function getText(format) {
  const url = "https://eloquentjavascript.net/author";

  fetch(url, {
    headers: {
      Accept: format,
    },
  })
    .then((r) => {
      return r.text();
    })
    .then((text) => {
      console.log(`Response:\n${text}`);
    });
}

for (let format of formats) {
  getText(format);
}
