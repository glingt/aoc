import { grailNumbers } from "./grailNumbers";
import * as fs from "fs";
const originalText = grailNumbers
  .map(lineNumbers => lineNumbers.map(entry => `${entry[0]}:${entry[1]}`).join(" "))
  .join("\r\n");

console.log(originalText);

interface Method {
  name: string;
  translate: (coord: [number, number]) => string;
}

const files = ["cretien-fr.txt", "cretien-en.txt"];

const decryptionMethods: Method[] = files.reduce<Method[]>((all, file) => {
  const f = fs.readFileSync(`./src/grail/${file}`).toString();
  const lines = f.toString().split("\r\n");

  const ms: Method[] = [
    {
      name: "Take row[1].word[2]",
      translate: coord => {
        const line = lines[-1 + coord[0]];
        if (!line) {
          return "_ ";
        }
        const words = line.split(" ");
        const word = words[-1 + coord[1]];
        return word + " ";
      },
    },
    {
      name: "Take row[1].word[2].firstChar",
      translate: coord => {
        const line = lines[-1 + coord[0]];
        if (!line) {
          return "_ ";
        }
        const words = line.split(" ");
        const word = words[-1 + coord[1]];
        return word ? word.charAt(0) : "_";
      },
    },
    {
      name: "Take row[1].char[2]",
      translate: coord => {
        const line = lines[-1 + coord[0]];
        if (!line) {
          return "_";
        }
        return line.charAt(-1 + coord[1]);
      },
    },
    {
      name: "Take row[1].letter[2]",
      translate: coord => {
        let line = lines[-1 + coord[0]];
        if (!line) {
          return "_";
        }
        line = line.replace("[^A-Za-z]+", "");
        line = line.replace(" ", "");
        line = line.replace("'", "");
        return line.charAt(-1 + coord[1]);
      },
    },
  ];
  return [...all, ...ms.map(m => ({ ...m, name: file + ": " + m.name }))];
}, []);

decryptionMethods.forEach(method => {
  const decrypted = grailNumbers
    .map(rowCoords => rowCoords.map(c => method.translate([c[0], c[1]])).join(""))
    .join("\r\n");
  console.log();
  console.log(method.name);
  console.log("----------");
  console.log(decrypted);
});
