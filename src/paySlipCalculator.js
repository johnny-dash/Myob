const helper = require("./helper");
const taxTable = require("./taxTable");

function calculatePaySlip(data) {
  const annualSalary = parseInt(data.annualSalary);
  const superRate = helper.precisionRound(parseFloat(data.superRate) / 100, 2);

  const name = data.firstName + " " + data.lastName;
  const payPeriod = data.paymentStartDate;
  const grossIncome = calculateGrossIncome(annualSalary);
  const superannuation = calculateSuperannuation(grossIncome, superRate);

  return {
    name: name,
    payPeriod: payPeriod,
    grossIncome: grossIncome,
    incomeTax: superRate,
    netIncome: "b",
    superannuation: superannuation
  };
}

function calculateGrossIncome(annualSalary) {
  return Math.floor(annualSalary / 12);
}

function calculateIncomeTax() {
  return 0;
}

function calculateNetIncome() {}

function calculateSuperannuation(grossIncome, superRate) {
  return Math.floor(grossIncome * superRate);
}

module.exports = calculatePaySlip;
