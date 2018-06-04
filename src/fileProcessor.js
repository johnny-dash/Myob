const csv = require("csv-parser");
const fs = require("fs");
const stream = csv({
  raw: false, // do not decode to utf-8 strings
  separator: ",", // specify optional cell separator
  quote: '"', // specify optional quote character
  escape: '"', // specify optional escape character (defaults to quote value)
  newline: "\n", // specify a newline character
  headers: [
    "firstName",
    "lastName",
    "annualSalary",
    "superRate",
    "paymentStartDate"
  ] // Specifing the headers
});

function processFiles(inputDir) {
  fs.readdir(inputDir, (err, files) => {
    if (files) {
      files.forEach(file => {
        parseCsv(inputDir, file);
      });
    } else {
      throw new Error("No input file has been found");
    }
  });
}

function parseCsv(inputDir, fileName) {
  fs
    .createReadStream(inputDir + "/" + fileName)
    .pipe(stream)
    .on("data", function(data) {
      //do logic here
    });
}

module.exports = processFiles;
