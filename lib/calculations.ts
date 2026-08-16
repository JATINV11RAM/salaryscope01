// SalaryScope India — Pure JS Calculation Logic

function applySlabs(income: number, slabs: [number, number, number][]): number {
  let tax = 0;
  for (const [lower, upper, rate] of slabs) {
    if (income <= lower) break;
    const taxable = Math.min(income, upper) - lower;
    tax += taxable * rate;
  }
  return tax;
}

export function calculateNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  const slabs: [number, number, number][] = [
    [0, 300000, 0],
    [300000, 600000, 0.05],
    [600000, 900000, 0.1],
    [900000, 1200000, 0.15],
    [1200000, 1500000, 0.2],
    [1500000, Infinity, 0.3],
  ];
  let tax = applySlabs(taxableIncome, slabs);
  if (taxableIncome <= 700000) tax = 0;
  return Math.round(tax * 1.04);
}

export function calculateOldRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  const slabs: [number, number, number][] = [
    [0, 250000, 0],
    [250000, 500000, 0.05],
    [500000, 1000000, 0.2],
    [1000000, Infinity, 0.3],
  ];
  let tax = applySlabs(taxableIncome, slabs);
  if (taxableIncome <= 500000) tax = 0;
  return Math.round(tax * 1.04);
}

export function calculateHRAExemption(
  hraReceivedMonthly: number,
  rentPaidMonthly: number,
  basicMonthly: number,
  isMetro: boolean = true
): number {
  if (rentPaidMonthly <= 0 || hraReceivedMonthly <= 0) return 0;
  const annualHRA = hraReceivedMonthly * 12;
  const annualRent = rentPaidMonthly * 12;
  const annualBasic = basicMonthly * 12;
  const metroFactor = isMetro ? 0.5 : 0.4;
  const exemption = Math.min(annualHRA, annualRent - 0.1 * annualBasic, metroFactor * annualBasic);
  return Math.max(0, Math.round(exemption));
}

export interface InHandInputs {
  annualCTC: number; variablePay: number; basicPercent: number;
  professionalTaxMonthly: number; taxRegime: 'new' | 'old';
  hraMonthly: number; rentPaidMonthly: number;
  deduction80C: number; deduction80D: number;
}

export interface InHandResult {
  annualCTC: number; basicMonthly: number; basicAnnual: number;
  employerPFAnnual: number; gratuityProvisionAnnual: number;
  annualGrossSalary: number; employeePFAnnual: number;
  professionalTaxAnnual: number; taxableIncome: number;
  incomeTaxAnnual: number; annualInHand: number; monthlyInHand: number;
}

export function calculateInHandSalary(inputs: InHandInputs): InHandResult {
  const { annualCTC, variablePay, basicPercent, professionalTaxMonthly,
    taxRegime, hraMonthly, rentPaidMonthly, deduction80C, deduction80D } = inputs;
  const basicMonthly = (annualCTC * (basicPercent / 100)) / 12;
  const basicAnnual = basicMonthly * 12;
  const employerPFAnnual = Math.round(basicAnnual * 0.12);
  const gratuityProvisionAnnual = Math.round(basicAnnual * 0.0481);
  const annualGrossSalary = Math.round(annualCTC - employerPFAnnual - gratuityProvisionAnnual - variablePay);
  const employeePFAnnual = Math.round(basicAnnual * 0.12);
  const professionalTaxAnnual = professionalTaxMonthly * 12;
  let taxableIncome: number;
  let incomeTaxAnnual: number;
  if (taxRegime === 'new') {
    taxableIncome = Math.max(0, annualGrossSalary - 75000 - employeePFAnnual);
    incomeTaxAnnual = calculateNewRegimeTax(taxableIncome);
  } else {
    const hraExemption = calculateHRAExemption(hraMonthly, rentPaidMonthly, basicMonthly);
    const cap80C = Math.min(deduction80C, 150000);
    const cap80D = Math.min(deduction80D, 25000);
    taxableIncome = Math.max(0, annualGrossSalary - 50000 - employeePFAnnual - cap80C - cap80D - hraExemption);
    incomeTaxAnnual = calculateOldRegimeTax(taxableIncome);
  }
  const annualInHand = Math.round(annualGrossSalary - employeePFAnnual - professionalTaxAnnual - incomeTaxAnnual);
  const monthlyInHand = Math.round(annualInHand / 12);
  return {
    annualCTC, basicMonthly: Math.round(basicMonthly), basicAnnual: Math.round(basicAnnual),
    employerPFAnnual, gratuityProvisionAnnual, annualGrossSalary, employeePFAnnual,
    professionalTaxAnnual, taxableIncome, incomeTaxAnnual, annualInHand, monthlyInHand
  };
}

export interface TaxRegimeInputs {
  annualCTC: number; basicPercent: number; deduction80C: number;
  deduction80D: number; hraMonthly: number; rentPaidMonthly: number; homeLoanInterest: number;
}

export interface RegimeResult {
  taxableIncome: number; taxPayable: number; monthlyTDS: number; annualInHand: number;
}

export interface TaxRegimeComparison {
  newRegime: RegimeResult; oldRegime: RegimeResult;
  betterRegime: 'new' | 'old'; saving: number;
  grossSalary: number; employeePFAnnual: number;
}

export function calculateTaxRegimeComparison(inputs: TaxRegimeInputs): TaxRegimeComparison {
  const { annualCTC, basicPercent, deduction80C, deduction80D, hraMonthly, rentPaidMonthly, homeLoanInterest } = inputs;
  const basicMonthly = (annualCTC * (basicPercent / 100)) / 12;
  const basicAnnual = basicMonthly * 12;
  const employerPFAnnual = Math.round(basicAnnual * 0.12);
  const gratuityProvisionAnnual = Math.round(basicAnnual * 0.0481);
  const grossSalary = Math.round(annualCTC - employerPFAnnual - gratuityProvisionAnnual);
  const employeePFAnnual = Math.round(basicAnnual * 0.12);
  const newTaxableIncome = Math.max(0, grossSalary - 75000 - employeePFAnnual);
  const newTax = calculateNewRegimeTax(newTaxableIncome);
  const newAnnualInHand = Math.round(grossSalary - employeePFAnnual - newTax);
  const hraExemption = calculateHRAExemption(hraMonthly, rentPaidMonthly, basicMonthly);
  const cap80C = Math.min(deduction80C, 150000);
  const cap80D = Math.min(deduction80D, 25000);
  const capHomeLoan = Math.min(homeLoanInterest, 200000);
  const oldTaxableIncome = Math.max(0, grossSalary - 50000 - employeePFAnnual - cap80C - cap80D - hraExemption - capHomeLoan);
  const oldTax = calculateOldRegimeTax(oldTaxableIncome);
  const oldAnnualInHand = Math.round(grossSalary - employeePFAnnual - oldTax);
  const betterRegime = newAnnualInHand >= oldAnnualInHand ? 'new' : 'old';
  const saving = Math.abs(newAnnualInHand - oldAnnualInHand);
  return {
    newRegime: { taxableIncome: newTaxableIncome, taxPayable: newTax, monthlyTDS: Math.round(newTax / 12), annualInHand: newAnnualInHand },
    oldRegime: { taxableIncome: oldTaxableIncome, taxPayable: oldTax, monthlyTDS: Math.round(oldTax / 12), annualInHand: oldAnnualInHand },
    betterRegime, saving, grossSalary, employeePFAnnual
  };
}

export interface SalaryBreakupInputs {
  annualCTC: number; basicPercent: number; hraPercent: number; professionalTaxMonthly: number;
}

export interface SalaryBreakupResult {
  basicMonthly: number; basicAnnual: number; hraMonthly: number; hraAnnual: number;
  specialAllowanceMonthly: number; specialAllowanceAnnual: number;
  grossEarningsMonthly: number; grossEarningsAnnual: number;
  employeePFMonthly: number; employeePFAnnual: number;
  professionalTaxMonthly: number; professionalTaxAnnual: number;
  incomeTaxMonthly: number; incomeTaxAnnual: number;
  totalDeductionsMonthly: number; totalDeductionsAnnual: number;
  netPayMonthly: number; netPayAnnual: number;
  employerPFAnnual: number; gratuityProvisionAnnual: number; totalCTCAnnual: number;
}

export function calculateSalaryBreakup(inputs: SalaryBreakupInputs): SalaryBreakupResult {
  const { annualCTC, basicPercent, hraPercent, professionalTaxMonthly } = inputs;
  const basicMonthly = Math.round((annualCTC * (basicPercent / 100)) / 12);
  const basicAnnual = basicMonthly * 12;
  const hraMonthly = Math.round(basicMonthly * (hraPercent / 100));
  const hraAnnual = hraMonthly * 12;
  const employerPFAnnual = Math.round(basicAnnual * 0.12);
  const gratuityProvisionAnnual = Math.round(basicAnnual * 0.0481);
  const grossSalaryAnnual = annualCTC - employerPFAnnual - gratuityProvisionAnnual;
  const grossSalaryMonthly = Math.round(grossSalaryAnnual / 12);
  const specialAllowanceAnnual = Math.max(0, grossSalaryAnnual - basicAnnual - hraAnnual);
  const specialAllowanceMonthly = Math.round(specialAllowanceAnnual / 12);
  const employeePFMonthly = Math.round(basicMonthly * 0.12);
  const employeePFAnnual = employeePFMonthly * 12;
  const professionalTaxAnnual = professionalTaxMonthly * 12;
  const taxableIncome = Math.max(0, grossSalaryAnnual - 75000 - employeePFAnnual);
  const incomeTaxAnnual = calculateNewRegimeTax(taxableIncome);
  const incomeTaxMonthly = Math.round(incomeTaxAnnual / 12);
  const totalDeductionsAnnual = employeePFAnnual + professionalTaxAnnual + incomeTaxAnnual;
  const totalDeductionsMonthly = Math.round(totalDeductionsAnnual / 12);
  const netPayAnnual = grossSalaryAnnual - totalDeductionsAnnual;
  const netPayMonthly = Math.round(netPayAnnual / 12);
  return {
    basicMonthly, basicAnnual, hraMonthly, hraAnnual, specialAllowanceMonthly, specialAllowanceAnnual,
    grossEarningsMonthly: grossSalaryMonthly, grossEarningsAnnual: grossSalaryAnnual,
    employeePFMonthly, employeePFAnnual, professionalTaxMonthly, professionalTaxAnnual,
    incomeTaxMonthly, incomeTaxAnnual, totalDeductionsMonthly, totalDeductionsAnnual,
    netPayMonthly, netPayAnnual, employerPFAnnual, gratuityProvisionAnnual, totalCTCAnnual: annualCTC
  };
}

export interface GratuityInputs {
  basicMonthly: number; yearsOfService: number; coveredUnderAct: boolean;
}

export interface GratuityResult {
  gratuityAmount: number; taxExemptAmount: number; taxableAmount: number;
  formula: string; isEligible: boolean;
}

export function calculateGratuity(inputs: GratuityInputs): GratuityResult {
  const { basicMonthly, yearsOfService, coveredUnderAct } = inputs;
  const isEligible = yearsOfService >= 5;
  const roundedYears = Math.round(yearsOfService * 2) / 2;
  const divisor = coveredUnderAct ? 26 : 30;
  const rawGratuity = (basicMonthly * 15 * roundedYears) / divisor;
  const gratuityAmount = Math.min(Math.round(rawGratuity), 2000000);
  const taxExemptAmount = Math.min(gratuityAmount, 2000000);
  const taxableAmount = Math.max(0, gratuityAmount - 2000000);
  const formula = "(Basic x 15 x Years) / " + divisor;
  return { gratuityAmount, taxExemptAmount, taxableAmount, formula, isEligible };
}

export interface NoticePeriodInputs {
  resignationDate: string;
  noticePeriodValue: number;
  noticePeriodUnit: 'days' | 'weeks' | 'months';
  includeWeekends: boolean;
}

export interface NoticePeriodResult {
  resignationDate: Date; lastWorkingDay: Date; totalCalendarDays: number;
}

export function calculateNoticePeriod(inputs: NoticePeriodInputs): NoticePeriodResult {
  const { resignationDate, noticePeriodValue, noticePeriodUnit, includeWeekends } = inputs;
  const start = new Date(resignationDate);
  let end: Date;
  if (noticePeriodUnit === 'days') {
    if (includeWeekends) {
      end = new Date(start);
      end.setDate(end.getDate() + noticePeriodValue);
    } else {
      end = new Date(start);
      let workingDaysAdded = 0;
      while (workingDaysAdded < noticePeriodValue) {
        end.setDate(end.getDate() + 1);
        const day = end.getDay();
        if (day !== 0 && day !== 6) workingDaysAdded++;
      }
    }
  } else if (noticePeriodUnit === 'weeks') {
    end = new Date(start);
    end.setDate(end.getDate() + noticePeriodValue * 7);
  } else {
    end = new Date(start);
    end.setMonth(end.getMonth() + noticePeriodValue);
  }
  const totalCalendarDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return { resignationDate: start, lastWorkingDay: end, totalCalendarDays };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount);
}
