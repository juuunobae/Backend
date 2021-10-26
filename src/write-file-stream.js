// @ts-check

// 스트림으로 큰 파일 처리하기!

// a, b
// a의 연속 구간: a chunk = a block
// b의 연속 구간: b chunk = b block
// 각각의 개수 세는 프로그램

const fs = require("fs");

const ws = fs.createWriteStream("local/big-file");

const NUB_BLOCKS = 500;

/** @type {Object.<string, number>} */
const numBlocksPerCharacter = {
  a: 0,
  b: 0,
};

for (let i = 0; i < NUB_BLOCKS; i += 1) {
  const blockLangth = Math.floor(800 + Math.random() * 200);
  const charater = i % 2 === 0 ? "a" : "b";
  numBlocksPerCharacter[charater] += 1;
  ws.write(charater.repeat(1024 * blockLangth));
}

console.log(numBlocksPerCharacter);
