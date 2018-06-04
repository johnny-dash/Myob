const processFile = require("./src/fileProcessor");
const path = require("path");
try {
  processFile(
    path.resolve(__dirname, "./input/input.csv"),
    path.resolve(__dirname, "./output/output.csv")
  );
} catch (error) {
  console.error(error);
}
