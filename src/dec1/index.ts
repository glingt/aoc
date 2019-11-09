
import * as fs from "fs";

const content = fs.readFileSync("./src/dec1/input.txt");
const terms = content.toString().split('\r\n').map(line => parseInt(line, 10));

const n = terms.reduce((sum, term) => sum + term, 0);

console.log(n);

let cuml = 0;
const cumls: number[] = [0];

for (let i = 0; i < terms.length; i++) {
  cuml += terms[i];
  if (cumls.indexOf(cuml) !== -1) {
    console.log(cuml);
    break;
  } else {
  }
  cumls.push(cuml);
}

console.log(cumls.slice(0, 10));