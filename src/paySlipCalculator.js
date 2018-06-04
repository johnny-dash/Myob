const taxTable = require("./taxTable");

/**
 *
 *
 * @param {*} data
 * @returns
 */
function calculatePaySlip(data) {
  const annualSalary = parseInt(data.annualSalary);
  const superRate = parseFloat(data.superRate) / 100;

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
 *
 *
 * @param {*} annualSalary
 * @returns
 */
function calculateGrossIncome(annualSalary) {
  return Math.round(annualSalary / 12);
}

/**
 *
 *
 * @param {*} annualSalary
 * @returns
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
 *
 *
 * @param {*} grossIncome
 * @param {*} incomeTax
 * @returns
 */
function calculateNetIncome(grossIncome, incomeTax) {
  return grossIncome - incomeTax;
}

/**
 *
 *
 * @param {*} grossIncome
 * @param {*} superRate
 * @returns
 */
function calculateSuperannuation(grossIncome, superRate) {
  return Math.round(grossIncome * superRate);
}

module.exports = calculatePaySlip;
