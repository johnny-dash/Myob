# Introduction

# Installation & Usage

1.  Make sure Node.js(8.0+) are installed as this is a command line application are implemented by javascript
2.  `git clone https://github.com/johnny-dash/Myob`
3.  `cd Myob`
4.  `npm i`
5.  put your input csv file in the input folder or change the input/output file path in the config.json

## Run

By running the following code, you will see the result of pay slip printed in the console and these data will be written into the csv file that defined in the output path in config.json.

`npm run start`

## Test

run the following command line to run the unit test

`npm run test`

run the following command line to check the unit test coverage

`npm run test:cover`

# Design

* Save the tax rates table to a json file and could easily maintain and change in the future.
* Using Joi to do the validation.The validator could be reuse and change in the future.
* Use `Jest` for testing

# Assumption

* Both input and output file should be csv file
* There is no header for input/output file
* columns in the csv file should be separated by comma
* The input of payment start date should have correct format

# Note

## Input csv format

Please put the value of column in the following order:

`firstName, lastName, annualSalary, superRate, paymentStartDate`

## Output csv format

`name, payPeriod, grossIncome, incomeTax, netIncome, superannuation`
