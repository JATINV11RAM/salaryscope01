import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SalaryScope",
  description: "Learn about SalaryScope, free Indian salary calculators built for transparency.",
  alternates: { canonical: "https://salaryscope.in/about" },
};

export default function AboutPage() {
  return (
    <div className="py-12 px-4" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm" style={{ border: "1px solid #E5E7EB" }}>
          <h1 className="text-3xl font-bold mb-6" style={{ color: "#1A1A2E" }}>About SalaryScope</h1>
          <div className="prose" style={{ color: "#1A1A2E", lineHeight: 1.8 }}>
            <p className="mb-4" style={{ color: "#6B7280" }}>
              SalaryScope exists because understanding your salary in India is genuinely complicated.
              Your offer letter shows one number. Your bank account shows another. And the difference —
              PF, professional tax, TDS, employer contributions — is rarely explained clearly anywhere.
            </p>
            <p className="mb-6" style={{ color: "#6B7280" }}>
              We built SalaryScope to fix that. Every calculator on this site is built specifically for
              Indian payroll, using actual tax slabs, actual PF rules, and actual deduction logic for
              FY 2025-26.
            </p>

            <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A1A2E" }}>What we do</h2>
            <ul className="mb-6 space-y-2">
              {[
                "Calculate exact take-home salary from CTC",
                "Compare old and new tax regimes side by side",
                "Break down every component of your salary",
                "Estimate gratuity using the legal formula",
                "Find your last working day instantly",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#6B7280" }}>
                  <span style={{ color: "#1A6B9A", flexShrink: 0, marginTop: "2px" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A1A2E" }}>What we do not do</h2>
            <ul className="mb-6 space-y-2">
              {[
                "Collect your salary data",
                "Require sign-up or account creation",
                "Provide personalised tax advice",
                "Guarantee accuracy for every payroll structure",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#6B7280" }}>
                  <span style={{ color: "#DC2626", flexShrink: 0, marginTop: "2px" }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mb-4 text-sm" style={{ color: "#6B7280" }}>
              All calculations are estimates for planning purposes. Your actual salary may differ based
              on your employer&apos;s specific payroll structure. Always verify important decisions with your
              HR department or a qualified tax professional.
            </p>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Information on this site is updated regularly to reflect current tax rules. If you spot an
              error or outdated information, contact us and we will fix it within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
