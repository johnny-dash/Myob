const processFile = require("./src/fileProcessor");
const config = require("./config");
const path = require("path");

console.log("Welcome to the employee monthly pay slip application!");
console.log();
console.log("The input csv file is under: " + config.input);
console.log("The input csv file is under: " + config.output);
console.log("You can change the input/output file path in ./config.json file");
console.log();

try {
  processFile(
    path.resolve(__dirname, config.input),
    path.resolve(__dirname, config.output)
  );
} catch (error) {
  console.Error(error);
}
