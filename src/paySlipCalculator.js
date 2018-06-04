const taxTable = require("./taxTable");

/**
 * This is the function that calculate the result for row data
 *
 * @param {object} data object data that represent the row of input csv
 * @returns object of result
 */
function calculatePaySlip(data) {
  const annualSalary = parseInt(data.annualSalary);
  const superRate = parseFloat(data.superRate) / 100;

  //I know I should not put the validation here = (
  if (superRate < 0 || superRate > 0.5)
    throw new Error("The superannuation rate is out of boundary");

  const name = data.firstName.trim() + " " + data.lastName.trim();
  const payPeriod = data.paymentStartDate.trim();
  const grossIncome = calculateGrossIncome(annualSalary);
  const incomeTax = calculateIncomeTax(annualSalary);
  const netIncome = calculateNetIncome(grossIncome, incomeTax);
  const superannuation = calculateSuperannuation(grossIncome, superRate);

  return {
    name: name,
    payPeriod: payPeriod,
    grossIncome: grossIncome,
    incomeTax: incomeTax,
    netIncome: netIncome,
    superannuation: superannuation
  };
}

/**
 * function to calculate gross income
 *
 * @param {Int} annualSalary
 * @returns gross income value
 */
function calculateGrossIncome(annualSalary) {
  return Math.round(annualSalary / 12);
}

/**
 * function to calculate income tax. This function will use taxTable to check
 * what tax rate and logic should be applied
 *
 * @param {int} annualSalary
 * @returns income tax value
 */
function calculateIncomeTax(annualSalary) {
  let incomeTax;
  taxTable.forEach(incomeRange => {
    if (
      annualSalary >= incomeRange.minAnnualSalary &&
      annualSalary <= incomeRange.maxAnnualSalary
    ) {
      let taxRate =
        (annualSalary - incomeRange.minAnnualSalary + 1) * incomeRange.taxRate;
      incomeTax = (taxRate + incomeRange.baseTax) / 12;
    }
  });
  return Math.round(incomeTax);
}

/**
 * function to calculate net income
 *
 * @param {int} grossIncome
 * @param {int} incomeTax
 * @returns net income value
 */
function calculateNetIncome(grossIncome, incomeTax) {
  return grossIncome - incomeTax;
}

/**
 * function to calculate superannuation
 *
 * @param {*} grossIncome
 * @param {*} superRate
 * @returns superannuation value
 */
function calculateSuperannuation(grossIncome, superRate) {
  return Math.round(grossIncome * superRate);
}

module.exports = {
  calculatePaySlip,
  calculateGrossIncome,
  calculateIncomeTax,
  calculateNetIncome,
  calculateSuperannuation
};
