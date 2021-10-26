// @ts-check

// 스트림으로 큰 파일 처리하기!

const { log } = require("console");
const fs = require("fs");

const rs = fs.createReadStream("local/big-file", {
  encoding: "utf-8",
  highWaterMark: 65536 * 2, // buffer의 크기 변경
});

/** @type {Object.<string, number>} */
const numBlocksPerCharacter = {
  a: 0,
  b: 0,
};

/** @type {string | undefined} */
let prevCharacter;
let chunkCount = 0;

rs.on("data", (data) => {
  chunkCount += 1;
  if (typeof data !== "string") {
    return;
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== prevCharacter) {
      const newCharacter = data[i];

      if (!newCharacter) {
        continue;
      }

      prevCharacter = newCharacter;
      numBlocksPerCharacter[newCharacter] += 1;
    }
  }
});

rs.on("end", () => {
  log("Event: end");
  log("block count: ", numBlocksPerCharacter);
  log("chunk count", chunkCount);
});
