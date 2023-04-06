"use strict";

const fs = require('node:fs');
const readline = require('node:readline');

let gameTotal = 0;
let playValue = {
  X: 1,
  Y: 2,
  Z: 3
};

async function processRPSCheatSheet(path) {
  /** takes an input text file and reads the two characters on each line
   * depending on the characters the player will win, lose or draw
   * a running points tally is added with the win/lose/draw value and the player's
   * play value.
   */
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    let roundTotal;
    if (line[2] == "X") {
      if (line[0] == "A") roundTotal = 3;
      if (line[0] == "B") roundTotal = 1;
      if (line[0] == "C") roundTotal = 2;
    }
    if (line[2] == "Y") {
      if (line[0] == "A") roundTotal = 1 + 3;
      if (line[0] == "B") roundTotal = 2 + 3;
      if (line[0] == "C") roundTotal = 3 + 3;
    }
    if (line[2] == "Z") {
      if (line[0] == "A") roundTotal = 6 + 2;
      if (line[0] == "B") roundTotal = 6 + 3;
      if (line[0] == "C") roundTotal = 6 + 1;
    }
    gameTotal = gameTotal + roundTotal;
  }
  console.log(gameTotal);
}

processRPSCheatSheet(process.argv[2]);