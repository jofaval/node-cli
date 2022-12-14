import { readFileSync } from "fs";

try {
  // A buffer can be directly converted to string
  const content = readFileSync("./examples/file-read/foo-bar.txt").toString();
  console.log("Content:", content);
} catch (error) {
  console.error(error);
}
