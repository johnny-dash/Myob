const csv = require("csv-parser");
const fs = require("fs");
const transform = require("stream-transform");
const calculatePaySlip = require("./paySlipCalculator");
const validator = require("./validator");

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

const transformer = transform(function(record, callback) {
  //validation
  const input = validator.validate(record, validator.schema);

  if (input.error === null) {
    const result = calculatePaySlip(record);
    if (result) {
      return callback(null, format(result));
    }
  } else {
    throw input.error;
  }
});

const format = data => {
  const values = Object.values(data);
  return values.join(",") + "\n";
};

function processFile(inputDir, outputDir) {
  const output = fs.createWriteStream(outputDir);
  fs
    .createReadStream(inputDir)
    .pipe(stream)
    .pipe(transformer)
    .pipe(output);
}

module.exports = processFile;
