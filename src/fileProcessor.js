const csv = require("csv-parser");
const fs = require("fs");
const transform = require("stream-transform");
const paySlipCalculator = require("./paySlipCalculator");
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
 * This function is use to calculate the data in the file stream
 *
 * @param {object} record the data that read from input.csv
 * @param {callback} callback
 * @returns
 */
const transformer = transform((record, callback) => {
  //validation
  const input = validator.validate(record, validator.schema);

  if (input.error === null) {
    const result = paySlipCalculator.calculatePaySlip(record);
    if (result) {
      return callback(null, format(result));
    }
  } else {
    throw input.error;
  }
});

/**
 * This function is used to join the object attributes by comma
 *
 * @param {object} data this is the result data in an data object
 * @returns String that joint all attribute by comma
 */
function format(data) {
  const values = Object.values(data);
  const output = values.join(",") + "\n";
  //show the result in the console
  console.log(output);
  return output;
}

/**
 * This is the core function to establish the fs stream
 *
 * @param {String} inputDir
 * @param {String} outputDir
 */
function processFile(inputDir, outputDir) {
  //check file existed (Not good solution)
  if (!fs.existsSync(inputDir)) {
    throw new Error("The input file is not in the following path: " + inputDir);
  }
  //valid output file path
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
