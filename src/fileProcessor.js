const csv = require("csv-parser");
const fs = require("fs");
const transform = require("stream-transform");
const calculatePaySlip = require("./paySlipCalculator");
const validator = require("./validator");

const stream = csv({
  raw: false, // do not decode to utf-8 strings
  separator: ",", // specify optional cell separator
  newline: "\n", // specify a newline character
  headers: [
    "firstName",
    "lastName",
    "annualSalary",
    "superRate",
    "paymentStartDate"
  ] // Specifing the headers
});

/**
 *
 *
 * @param {*} record
 * @param {*} callback
 * @returns
 */
const transformer = transform((record, callback) => {
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

/**
 *
 *
 * @param {*} data
 * @returns
 */
function format(data) {
  const values = Object.values(data);
  const output = values.join(",") + "\n";
  console.log(output);
  return output;
}

/**
 *
 *
 * @param {*} inputDir
 * @param {*} outputDir
 */
function processFile(inputDir, outputDir) {
  if (!fs.existsSync(inputDir)) {
    throw new Error("The input file is not in the following path: " + inputDir);
  }

  if (!fs.existsSync(outputDir)) {
    fs.appendFile(outputDir, "", err => {
      if (err) throw err;
      console.log("Create the output file: " + outputDir);
    });
  }

  const output = fs.createWriteStream(outputDir);
  fs
    .createReadStream(inputDir)
    .pipe(stream)
    .pipe(transformer)
    .pipe(output);
}

module.exports = processFile;
