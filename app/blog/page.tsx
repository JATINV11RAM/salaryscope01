import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary & Tax Guides | SalaryScope",
  description: "Plain English guides on salary, tax, and payroll for Indian professionals",
  alternates: { canonical: "https://salaryscope.in/blog" },
};

export default function BlogPage() {
  const articles = [
    "CTC vs In-Hand Salary: Why There Is Always a Big Difference",
    "Old vs New Tax Regime: Which Saves You More Tax in FY 2025-26",
    "How to Read Your Salary Slip: Every Component Explained",
  ];

  return (
    <div className="py-12 px-4" style={{ backgroundColor: "#F5F7FA", minHeight: "calc(100vh - 64px - 300px)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
            Salary & Tax Guides
          </h1>
          <p style={{ color: "#6B7280" }}>
            Plain English guides on salary, tax, and payroll for Indian professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {articles.map((title, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 relative overflow-hidden"
              style={{
                border: "1px solid #E5E7EB",
                opacity: 0.7,
                cursor: "not-allowed",
              }}
            >
              <div className="mb-4 inline-block px-2 py-1 text-xs font-semibold rounded"
                style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>
                Coming Soon
              </div>
              <h2 className="text-lg font-semibold leading-snug" style={{ color: "#1A1A2E" }}>
                {title}
              </h2>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: "#6B7280" }}>
            Guides coming soon. Calculators are live now.
          </p>
        </div>
      </div>
    </div>
  );
}
