import { grailNumbers } from "./grailNumbers";
import * as fs from "fs";
const originalText = [1, 2, 3, 4]
  .map(index => grailNumbers.slice((index - 1) * 9, index * 9))
  .map(lineNumbers => lineNumbers.map(entry => `${entry[0]}:${entry[1]}`).join(" "))
  .join("\r\n");

console.log(originalText);

const f = fs.readFileSync("./src/grail/cretien-fr.txt").toString();
const lines = f.toString().split("\r\n");

const d = grailNumbers
  .map(coord => {
    const row = coord[0];
    const line = lines[row - 1];
    const words = line.split(" ");
    return line.charAt(coord[1]);
  })
  .join("");

console.log(d);
