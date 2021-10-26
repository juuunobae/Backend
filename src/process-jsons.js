// @ts-check

const { log } = require("console");
const fs = require("fs");

/**
 * @param {number} highWaterMark
 */
function processJSON(highWaterMark) {
  const rs = fs.createReadStream("local/jsons", {
    encoding: "utf-8",
    highWaterMark,
  });

  let totalSum = 0;

  let accumulatedJsonStr = "";

  rs.on("data", (chunk) => {
    if (typeof chunk !== "string") {
      return;
    }
    accumulatedJsonStr += chunk;

    const lastNewlineIndex = accumulatedJsonStr.lastIndexOf("\n");

    const jsonLinesStr = accumulatedJsonStr.substring(0, lastNewlineIndex);
    accumulatedJsonStr = accumulatedJsonStr.substring(lastNewlineIndex);

    totalSum += jsonLinesStr
      .split("\n")
      .map((jsonLine) => {
        try {
          return JSON.parse(jsonLine);
        } catch {
          return undefined;
        }
      })
      .filter((json) => json)
      .map((json) => json.data)
      .reduce((sum, curr) => sum + curr, 0);
  });

  rs.on("end", () => {
    log("Event: end");
    log("totalSum: ", totalSum, `(highWatarMark: ${highWaterMark})`);
  });
}

for (let watarMark = 1; watarMark <= 50; watarMark++) {
  processJSON(watarMark);
}
