const taxTable = [
  {
    minAnnualSalary: 0,
    maxAnnualSalary: 18200,
    taxRate: 0,
    baseTax: 0
  },
  {
    minAnnualSalary: 18201,
    maxAnnualSalary: 37000,
    taxRate: 0.19,
    baseTax: 0
  },
  {
    minAnnualSalary: 37001,
    maxAnnualSalary: 87000,
    taxRate: 0.325,
    baseTax: 3572
  },
  {
    minAnnualSalary: 87001,
    maxAnnualSalary: 180000,
    taxRate: 0.37,
    baseTax: 19822
  },
  {
    minAnnualSalary: 180001,
    maxAnnualSalary: Number.POSITIVE_INFINITY,
    taxRate: 0.45,
    baseTax: 54232
  }
];

module.exports = taxTable;
