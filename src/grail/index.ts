import { grailNumbers } from "./grailNumbers";

const originalText = [1, 2, 3, 4]
  .map(index => grailNumbers.slice((index - 1) * 9, index * 9))
  .map(lineNumbers => lineNumbers.map(entry => `${entry[0]}:${entry[1]}`).join(" "))
  .join("\r\n");

console.log(originalText);
