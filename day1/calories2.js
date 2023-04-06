"use strict";

const fs = require('node:fs');
const readline = require('node:readline');

let caloriesArr = [];
let max1 = 0;
let max2 = 0;
let max3 = 0;
let tempTotal = 0;

async function processCaloriesLine(path) {
  /** takes an input text file and reads the calorie value on each line
   * if the line is blank it finds the max of tempCalories compares to the top3
   * calorie total and modifies accordingly
   * resets the tempCalorie value to 0
   * consoles the total of the top 3 calories values
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
    let temp1;
    let temp2;
    if (calories == "") {
      if (tempTotal >= max1) {
        max3 = max2;
        max2 = max1;
        max1 = tempTotal;
      }
      else if (tempTotal >= max2) {
        max3 = max2;
        max2 = tempTotal;
      }
      else if (tempTotal >= max3) {
        max3 = tempTotal;
      }
      tempTotal = 0;
    }
    tempTotal = tempTotal + Number(calories);
  }
  console.log(max1 + max2 + max3);
}

processCaloriesLine(process.argv[2]);