const paySlipCalculator = require("../src/paySlipCalculator");

//TBD: Should have boundary test
describe("feature tests", () => {
  test("test paySlipCalculator", () => {
    const input = {
      firstName: "DI",
      lastName: "Mao",
      annualSalary: "70000",
      superRate: "10%",
      paymentStartDate: "01 July-31 July"
    };
    const output = {
      name: "DI Mao",
      payPeriod: `01 July-31 July`,
      grossIncome: 5833,
      incomeTax: 1191,
      netIncome: 4642,
      superannuation: 583
    };
    expect(paySlipCalculator.calculatePaySlip(input)).toEqual(output);
  });

  test("test gross income", () => {
    expect(paySlipCalculator.calculateGrossIncome(12000)).toBe(1000);
  });

  test("test tax income with annual salary $14000", () => {
    expect(paySlipCalculator.calculateIncomeTax(14000)).toBe(0);
  });

  test("test tax income with annual salary $20000", () => {
    expect(paySlipCalculator.calculateIncomeTax(20000)).toBe(29);
  });

  test("test tax income with annual salary $40000", () => {
    expect(paySlipCalculator.calculateIncomeTax(40000)).toBe(379);
  });

  test("test tax income with annual salary $100000", () => {
    expect(paySlipCalculator.calculateIncomeTax(100000)).toBe(2053);
  });

  test("test tax income with annual salary $200000", () => {
    expect(paySlipCalculator.calculateIncomeTax(200000)).toBe(5269);
  });

  test("test net income", () => {
    expect(paySlipCalculator.calculateNetIncome(1000, 500)).toBe(500);
  });

  test("test superannuation", () => {
    expect(paySlipCalculator.calculateSuperannuation(1000, 0.2)).toBe(200);
  });
});

describe("exception test", () => {
  test("superannuation rate is bigger than 50%", () => {
    const input = {
      firstName: "DI",
      lastName: "Mao",
      annualSalary: "70000",
      superRate: "51%",
      paymentStartDate: "01 July-31 July"
    };
    expect(() => {
      paySlipCalculator.calculatePaySlip(input);
    }).toThrow(/The superannuation rate is out of boundary/);
  });

  test("superannuation rate is lower than 0%", () => {
    const input = {
      firstName: "DI",
      lastName: "Mao",
      annualSalary: "70000",
      superRate: "-10%",
      paymentStartDate: "01 July-31 July"
    };
    expect(() => {
      paySlipCalculator.calculatePaySlip(input);
    }).toThrow(/The superannuation rate is out of boundary/);
  });
});
