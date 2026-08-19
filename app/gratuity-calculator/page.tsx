import type { Metadata } from "next";
import GratuityCalc from "@/components/GratuityCalc";
import CalculatorDetails, { calculatorDetailData } from "@/components/CalculatorDetails";

export const metadata: Metadata = {
  title: "Gratuity Calculator India 2026",
  description:
    "Calculate gratuity using the Payment of Gratuity Act formula. Instant result based on basic salary and years of service.",
  alternates: { canonical: "https://salaryscope.in/gratuity-calculator" },
};

export default function GratuityPage() {
  return (
    <div className="py-12 px-4" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
            Gratuity Calculator India
          </h1>
          <p style={{ color: "#6B7280" }}>Estimate your gratuity as per the Payment of Gratuity Act 1972</p>
        </div>
        <GratuityCalc />
        <CalculatorDetails {...calculatorDetailData("gratuity")} />
      </div>
    </div>
  );
}
