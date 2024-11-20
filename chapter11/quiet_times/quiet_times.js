var readTextFile = (function () {
  let min = 60 * 1000,
    hour = min * 60,
    day = hour * 24;

  let logs = [],
    year = 2023,
    start = new Date(year, 8, 21).getTime();
  for (let i = 21; i <= 30; i++) {
    if (i != 27)
      logs.push({
        name: "activity-" + year + "-09-" + i + ".log",
        time: start + i * day,
        day: (i - 17) % 7,
      });
  }

  let rState = 81782;
  function r1() {
    rState ^= rState << 13;
    rState ^= rState << 17;
    rState ^= rState << 5;
    return (rState & 0xffffff) / 0xffffff;
  }
  function r(n) {
    return Math.floor(r1() * n);
  }

  let weekday = [
    1, 1, 1, 1, 1, 3, 8, 20, 10, 15, 15, 20, 25, 12, 15, 20, 18, 16, 10, 8, 8,
    7, 4, 2,
  ];
  let saturday = [
    1, 1, 1, 1, 1, 2, 3, 5, 3, 2, 2, 5, 8, 7, 9, 5, 5, 3, 3, 3, 4, 2, 2, 2,
  ];
  let sunday = [
    2, 2, 1, 1, 1, 1, 1, 2, 2, 3, 6, 6, 2, 1, 1, 1, 1, 4, 4, 4, 3, 2, 1, 1,
  ];

  let activity = (day, base) => {
    let schedule = day == 0 ? sunday : day == 6 ? saturday : weekday;
    let events = [];
    for (let h = 0; h < 24; h++) {
      let n = schedule[h] * 2 + r(5) - 2;
      for (let i = 0; i < n; i++) {
        let t = base + h * hour + r(hour);
        let j = events.length;
        while (j > 0 && events[j - 1] > t) --j;
        events.splice(j, 0, t);
      }
    }
    return events;
  };

  let generated = false;
  function generateLogs() {
    if (generated) return;
    generated = true;
    for (let log of logs) {
      files[log.name] = activity(log.day, log.time).join("\n");
    }
  }

  let files = {
    __proto__: null,
    "shopping_list.txt": "Peanut butter\nBananas",
    "old_shopping_list.txt": "Peanut butter\nJelly",
    "package.json":
      '{"name":"test project","author":"cāāw-krö","version":"1.1.2"}',
    "plans.txt":
      "* Write a book\n  * Figure out asynchronous chapter\n  * Find an artist for the cover\n  * Write the rest of the book\n\n* Don't be sad\n  * Sit under tree\n  * Study bugs\n",
    "camera_logs.txt": logs.map((l) => l.name).join("\n"),
  };

  return function readTextFile(filename, callback) {
    if (/^activity/.test(filename)) generateLogs();
    let file =
      filename == "files.list"
        ? Object.keys(files).join("\n")
        : files[filename];
    Promise.resolve().then(() => {
      if (file == null) callback(null, "File " + filename + " does not exist");
      else callback(file);
    });
  };
})();

var activityGraph = (table) => {
  let widest = Math.max(50, Math.max(...table));
  return table
    .map((n, i) => {
      let width = (n / widest) * 20;
      let full = Math.floor(width),
        rest = " ▏▎▍▌▋▊▉"[Math.floor((width - full) * 8)];
      return String(i).padStart(2, " ") + " " + "█".repeat(full) + rest;
    })
    .join("\n");
};

function textFile(filename) {
  return new Promise((resolve, reject) => {
    readTextFile(filename, (text, error) => {
      if (error) reject(error);
      else resolve(text);
    });
  });
}

function parseFileToDates(file) {
  return file.split("\n").map((line) => new Date(parseInt(line)));
}

function countDatesPerHourPerDay(dates) {
  let weekDaysToDates = new Map();
  for (let i = 0; i < 7; i++) {
    weekDaysToDates.set(i, []);
  }

  dates.forEach((date) => {
    let day = date.getDay();
    let data = weekDaysToDates.get(day);
    data.push(date);
    weekDaysToDates.set(day, data);
  });

  let weekDaysToHours = new Map();
  for (let i = 0; i < 7; i++) {
    weekDaysToHours.set(i, Array(24).fill(0));
  }

  weekDaysToDates.entries().forEach(([day, dates]) => {
    let dayMap = weekDaysToHours.get(day);

    dates.forEach((date) => {
      let hour = date.getHours();
      dayMap[hour] += 1;
    });

    weekDaysToHours.set(day, dayMap);
  });

  return weekDaysToHours;
}

function combineCounts(countsPerDayPerHour) {
  let weekDaysToHours = new Map();
  for (let i = 0; i < 7; i++) {
    weekDaysToHours.set(i, Array(24).fill(0));
  }

  countsPerDayPerHour.forEach((countPerDayPerHour) => {
    countPerDayPerHour.entries().forEach(([day, countsPerHour]) => {
      let currCounts = weekDaysToHours.get(day);
      countsPerHour.forEach((count, idx) => {
        currCounts[idx] += count;
      });
      weekDaysToHours.set(day, currCounts);
    });
  });

  return weekDaysToHours;
}

async function activityTable(day) {
  let logFileList = await textFile("camera_logs.txt");
  // Your code here
  let logFiles = await Promise.all(
    logFileList.split("\n").map((logFileName) => textFile(logFileName)),
  );

  let logDatesPerFile = logFiles.map((file) => parseFileToDates(file));

  let datesPerHourPerDayCounts = logDatesPerFile.map((logDates) =>
    countDatesPerHourPerDay(logDates),
  );

  let counts = combineCounts(datesPerHourPerDayCounts);

  return counts.get(day);
}

activityTable(1).then((table) => console.log(activityGraph(table)));
