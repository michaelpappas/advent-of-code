"use strict";

const fs = require('node:fs');
const readline = require('node:readline');

let caloriesArr = [];
let maxCalories = 0;
let tempTotal = 0;

async function processCaloriesLine(path) {
  /** takes an input text file and reads the calorie value on each line
   * if the line is blank it finds the max of tempCalories and maxCalories
   * and resets the tempCalorie value to 0
   * consoles the maxCalories value when it reaches the end of the text file
   */
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    caloriesArr.push(line);
  }
  for (let calories of caloriesArr) {
    if (calories == "") {
      maxCalories = Math.max(Number(tempTotal), Number(maxCalories));
      tempTotal = 0;
    }
    tempTotal = tempTotal + Number(calories);
  }
  console.log(maxCalories);
}

processCaloriesLine(process.argv[2]);