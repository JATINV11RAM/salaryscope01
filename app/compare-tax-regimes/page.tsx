import type { Metadata } from "next";
import TaxRegimeCalculator from "@/components/TaxRegimeCalculator";

export const metadata: Metadata = {
  title: "Old vs New Tax Regime Calculator FY 2025-26",
  description:
    "Compare old and new income tax regimes side by side. See which saves you more tax based on your salary and deductions.",
  alternates: { canonical: "https://salaryscope.in/compare-tax-regimes" },
};

export default function TaxRegimePage() {
  return (
    <div className="py-12 px-4" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
            Old vs New Tax Regime Calculator
          </h1>
          <p style={{ color: "#6B7280" }}>
            See which regime saves you more tax for FY 2025-26
          </p>
        </div>
        <TaxRegimeCalculator />
      </div>
    </div>
  );
}
