import Link from "next/link";

type CalculatorDetailsProps = { title: string; summary: string; trend: string; assumptions: readonly string[]; excludes: readonly string[]; relatedHref: string; relatedLabel: string };

export default function CalculatorDetails({ title, summary, trend, assumptions, excludes, relatedHref, relatedLabel }: CalculatorDetailsProps) {
  return (
    <section className="mt-10 rounded-2xl border border-border bg-background p-6 text-left shadow-sm md:p-8" aria-labelledby="calculator-details-title">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">SalaryScope guide</p>
      <h2 id="calculator-details-title" className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="mt-3 leading-7 text-muted">{summary}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-light-bg p-4"><h3 className="font-semibold text-foreground">Market context</h3><p className="mt-2 text-sm leading-6 text-muted">{trend}</p></div>
        <div className="rounded-xl border border-border p-4"><h3 className="font-semibold text-foreground">What we assume</h3><ul className="mt-2 flex flex-col gap-2 text-sm leading-6 text-muted">{assumptions.map((item) => <li key={item}>• {item}</li>)}</ul></div>
        <div className="rounded-xl border border-border p-4"><h3 className="font-semibold text-foreground">What is not included</h3><ul className="mt-2 flex flex-col gap-2 text-sm leading-6 text-muted">{excludes.map((item) => <li key={item}>• {item}</li>)}</ul></div>
      </div>
      <Link href={relatedHref} className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">{relatedLabel} →</Link>
    </section>
  );
}

export function calculatorDetailData(kind: "inhand" | "breakup" | "tax" | "gratuity" | "notice") {
  const data = {
    inhand: { title: "How to read your in-hand salary", summary: "CTC is not the same as cash in your bank account. This estimate separates employer benefits, employee deductions, tax and variable pay so you can compare offers more confidently.", trend: "More Indian offers now include performance-linked pay, employer PF and gratuity inside CTC. Always compare fixed pay and realistic variable payout separately.", assumptions: ["FY 2025–26 tax estimate", "PF and gratuity based on basic pay", "Professional tax as entered"], excludes: ["Company-specific payroll rules", "Bonus payout timing", "Stock grants and reimbursements"], relatedHref: "/compare-offers", relatedLabel: "Compare two offers" },
    breakup: { title: "Salary breakup explained", summary: "Use this view to understand how basic pay, HRA, special allowance and statutory deductions combine into monthly net pay and total employer cost.", trend: "Many employers structure CTC with a 40–50% basic salary, while flexible benefits and variable pay can materially change take-home pay.", assumptions: ["Basic and HRA percentages from your inputs", "Employee PF at 12% of basic", "New-regime TDS estimate"], excludes: ["Employer-specific allowances", "State payroll differences", "Actual payslip rounding"], relatedHref: "/in-hand-salary-calculator", relatedLabel: "Calculate in-hand salary" },
    tax: { title: "Old vs new tax regime", summary: "The right regime depends on taxable income, eligible deductions and how much HRA or home-loan benefit you actually claim—not just the headline slab rates.", trend: "For FY 2025–26, the new regime is often simpler for people with limited deductions; the old regime can still win with substantial HRA, 80C, 80D and home-loan claims.", assumptions: ["FY 2025–26 slabs", "Standard deduction included", "Deductions limited to entered values"], excludes: ["Employer tax planning advice", "Unentered exemptions", "Capital gains or other income"], relatedHref: "/in-hand-salary-calculator", relatedLabel: "See monthly take-home" },
    gratuity: { title: "Gratuity eligibility and estimate", summary: "Gratuity is an employer-funded statutory benefit calculated from last drawn basic salary and eligible service—not from total CTC.", trend: "Treat gratuity as deferred compensation when comparing offers, but confirm eligibility, service continuity and the basic-pay definition with HR.", assumptions: ["Payment of Gratuity Act formula", "26 working days per month", "Completed years rounded per applicable rule"], excludes: ["Contract-specific eligibility", "Tax treatment at payout", "Forfeiture or special cases"], relatedHref: "/salary-breakup", relatedLabel: "Inspect salary components" },
    notice: { title: "Notice period planning", summary: "Your last working day depends on the resignation date, contractual notice length and whether your company counts calendar days or working days.", trend: "Notice periods are increasingly negotiated as part of offer closure. Get buyout, garden leave and early-release terms in writing before resigning.", assumptions: ["Calendar-day counting", "Start date counted as day one", "No holidays excluded"], excludes: ["HR approval delays", "Buyout calculations", "Company holiday calendars"], relatedHref: "/contact", relatedLabel: "Ask a question" },
  } as const;
  return data[kind];
}
