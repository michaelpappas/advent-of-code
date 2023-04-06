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
    if ((line[0] == "A" && line[2] == "X") || (line[0] == "B" && line[2] == "Y") || (line[0] == "C" && line[2] == "Z")) {
      roundTotal = 3 + playValue[line[2]];
    }
    else if ((line[0] == "A" && line[2] == "Y") || (line[0] == "B" && line[2] == "Z") || (line[0] === "C" && line[2] === "X")) {
      roundTotal = 6 + playValue[line[2]];
    }
    else {
      roundTotal = 0 + playValue[line[2]];
    }
    gameTotal = gameTotal + roundTotal;
  }
  console.log(gameTotal);
}

processCaloriesLine(process.argv[2]);