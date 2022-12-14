import { writeFileSync } from "fs";

try {
  writeFileSync("./examples/file-write/output.txt", "Properly written");
  console.log("File written successfully!");
} catch (error) {
  console.error(error);
}
