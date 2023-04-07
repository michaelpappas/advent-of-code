"use strict";

const fs = require('node:fs');
const readline = require('node:readline');

let total = 0;

let letterValue = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52
};

async function processRucksack(path) {
  /** takes an input text file and splits the string on each line into two strings
   *  if there is a characte present in both strings it's associated value is added
   *  to the running total
   *  the total is logged
   */
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let compCount = 0;
  let comp1;
  let comp2;
  let comp3;

  for await (const line of rl) {
    debugger;
    if (compCount === 0) {
      console.log("compCount is 0");
      comp1 = line;
      compCount++;
      continue;
    }
    else if (compCount === 1) {
      comp2 = line;
      compCount++;
      continue;
    }
    else if (compCount === 2) {
      comp3 = line;
      compCount = 0;
      total = total + search(comp1, comp2, comp3);
      console.log("compCount", compCount);
      console.log("total", total);
      continue;
    }

  }
  console.log(total);
}

function search(input1, input2, input3) {
  for (let char of input1) {
    if (input2.indexOf(char) >= 0 && input3.indexOf(char) >= 0) {
      console.log(char);
      return letterValue[char];
    }
  }
}

processRucksack(process.argv[2]);