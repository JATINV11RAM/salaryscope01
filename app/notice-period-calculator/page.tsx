import type { Metadata } from "next";
import NoticePeriodCalc from "@/components/NoticePeriodCalc";

export const metadata: Metadata = {
  title: "Notice Period Calculator India",
  description:
    "Enter resignation date and notice period to find your exact last working day. Free and instant.",
  alternates: { canonical: "https://salaryscope.in/notice-period-calculator" },
};

export default function NoticePeriodPage() {
  return (
    <div className="py-12 px-4" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
            Notice Period Calculator
          </h1>
          <p style={{ color: "#6B7280" }}>Find your exact last working day</p>
        </div>
        <NoticePeriodCalc />
      </div>
    </div>
  );
}
