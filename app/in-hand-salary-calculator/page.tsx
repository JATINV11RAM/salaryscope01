import type { Metadata } from "next";
import Link from "next/link";
import InHandCalculator from "@/components/InHandCalculator";
import CalculatorDetails, { calculatorDetailData } from "@/components/CalculatorDetails";

export const metadata: Metadata = {
  title: "In-Hand Salary Calculator India 2025-26",
  description:
    "Find out exactly how much salary lands in your bank account. Enter CTC and get full breakdown of tax, PF, and all deductions.",
  alternates: { canonical: "https://salaryscope.in/in-hand-salary-calculator" },
};

export default function InHandSalaryPage() {
  return (
    <main className="bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
            In-Hand Salary Calculator India
          </h1>
          <p style={{ color: "#6B7280" }}>
            Find out exactly how much salary lands in your bank account each month
          </p>
        </div>

        <InHandCalculator />
        <CalculatorDetails {...calculatorDetailData("inhand")} />

        <div className="text-center mt-8">
          <Link
            href="/compare-tax-regimes"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm"
            style={{
              border: "1px solid #1A6B9A",
              color: "#1A6B9A",
              textDecoration: "none",
              minHeight: "44px",
            }}
          >
            Compare with old tax regime →
          </Link>
        </div>
      </div>
    </main>
  );
}
