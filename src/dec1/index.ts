
import * as fs from "fs";

const content = fs.readFileSync("./src/dec1/input.txt");
const lines = content.toString().split('\r\n');
console.log(lines[lines.length- 1]);

const n = lines.reduce((sum, line) => sum + parseInt(line, 10), 0);

console.log(n);