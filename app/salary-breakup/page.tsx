import type { Metadata } from "next";
import SalaryBreakupCalc from "@/components/SalaryBreakupCalc";
import CalculatorDetails, { calculatorDetailData } from "@/components/CalculatorDetails";

export const metadata: Metadata = {
  title: "Salary Breakup Calculator India",
  description:
    "Break down your CTC into basic, HRA, PF, and take-home. Understand every component of your Indian salary.",
  alternates: { canonical: "https://salaryscope.in/salary-breakup" },
};

export default function SalaryBreakupPage() {
  return (
    <div className="py-12 px-4" style={{ backgroundColor: "var(--color-background)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
            Salary Breakup Calculator
          </h1>
          <p style={{ color: "#6B7280" }}>Understand every component inside your CTC</p>
        </div>
        <SalaryBreakupCalc />
        <CalculatorDetails {...calculatorDetailData("breakup")} />
      </div>
    </div>
  );
}
