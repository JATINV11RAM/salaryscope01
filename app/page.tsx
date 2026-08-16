import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "In-Hand Salary Calculator India FY 2025-26 | SalaryScope",
  description:
    "Calculate your exact take-home salary after tax, PF, and deductions. Free CTC to in-hand calculator and tax tools for Indian professionals.",
  alternates: { canonical: "https://salaryscope.in" },
};

const tools = [
  {
    icon: "₹",
    title: "In-Hand Salary Calculator",
    desc: "See exactly what lands in your bank account each month",
    href: "/in-hand-salary-calculator",
  },
  {
    icon: "≋",
    title: "Compare Tax Regimes",
    desc: "Compare old and new tax regimes side by side",
    href: "/compare-tax-regimes",
  },
  {
    icon: "◫",
    title: "Salary Breakup Calculator",
    desc: "Understand every component inside your CTC",
    href: "/salary-breakup",
  },
  {
    icon: "◌",
    title: "Gratuity Calculator",
    desc: "Estimate your gratuity with the exact formula",
    href: "/gratuity-calculator",
  },
  {
    icon: "◷",
    title: "Notice Period Calculator",
    desc: "Find your expected last working day instantly",
    href: "/notice-period-calculator",
  },
];

const faqs = [
  {
    q: "What is the difference between CTC and in-hand salary?",
    a: "CTC includes the total annual cost to your employer including employer PF and gratuity provisions. In-hand salary is what remains after income tax, employee PF, and professional tax are deducted.",
  },
  {
    q: "Which tax regime should I choose?",
    a: "It depends on your income and deductions. If you have high 80C investments, HRA, or a home loan, the old regime often saves more tax. If you have fewer deductions, the new regime usually wins. Use our comparison tool to check your specific situation.",
  },
  {
    q: "Do you store my salary details?",
    a: "No. All calculations run entirely in your browser. We do not collect, store, or transmit your salary information.",
  },
  {
    q: "Are these calculations exact?",
    a: "They are close estimates for planning purposes. Your actual in-hand salary may vary based on your employer's payroll structure, exact exemptions claimed, and current tax rules. Always verify with your HR or a tax professional.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-white">
        <div className="container-site text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Know Your Salary. Plan With Confidence.
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Simple, transparent calculators for take-home pay, tax regimes, gratuity and more.
            Built for Indian salaries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link
              href="/in-hand-salary-calculator"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1A6B9A", minHeight: "44px" }}
            >
              Calculate In-Hand Salary
            </Link>
            <Link
              href="/compare-tax-regimes"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base transition-colors hover:bg-amber-50"
              style={{
                border: "2px solid #F0A500",
                color: "#F0A500",
                minHeight: "44px",
              }}
            >
              Compare Tax Regimes
            </Link>
          </div>
          <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>
            Private by design · No data stored · Estimates not tax advice
          </p>
        </div>
      </section>

      {/* Toolkit */}
      <section className="py-16" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
              The Toolkit
            </h2>
            <p style={{ color: "#6B7280" }}>Everything you need to understand your pay</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white rounded-lg p-6 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  border: "1px solid #E5E7EB",
                  textDecoration: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                }}
              >
                <span
                  className="text-3xl w-12 h-12 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#EFF6FF", color: "#1A6B9A" }}
                >
                  {tool.icon}
                </span>
                <h3 className="font-semibold text-base" style={{ color: "#1A1A2E" }}>
                  {tool.title}
                </h3>
                <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>{tool.desc}</p>
                <span
                  className="text-sm font-medium mt-auto"
                  style={{ color: "#1A6B9A" }}
                >
                  Calculate →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: "#1A1A2E" }}>
            CTC is not your take-home.
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-10" style={{ color: "#6B7280" }}>
            Your CTC includes employer PF, gratuity provisions, and variable pay that never reach
            your bank account. SalaryScope shows you the real numbers.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { label: "Gross Pay", sub: "Before deductions", color: "#EFF6FF", border: "#1A6B9A" },
              { label: "→", sub: "", color: "transparent", border: "transparent" },
              { label: "Deductions", sub: "Tax, PF and PT", color: "#FFF8E1", border: "#F0A500" },
              { label: "→", sub: "", color: "transparent", border: "transparent" },
              { label: "In-Hand", sub: "What you actually receive", color: "#F0FDF4", border: "#16A34A" },
            ].map((box, i) =>
              box.border === "transparent" ? (
                <div key={i} className="text-2xl font-light hidden md:block" style={{ color: "#6B7280" }}>
                  →
                </div>
              ) : (
                <div
                  key={i}
                  className="flex-1 max-w-xs w-full rounded-lg p-6 text-center"
                  style={{ backgroundColor: box.color, border: `2px solid ${box.border}` }}
                >
                  <div className="font-bold text-lg mb-1" style={{ color: "#1A1A2E" }}>
                    {box.label}
                  </div>
                  <div style={{ color: "#6B7280", fontSize: "0.875rem" }}>{box.sub}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="container-site">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: "#1A1A2E" }}>
            Clear answers in three steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Enter your salary details",
                desc: "Use fields that match your offer letter or payslip",
              },
              {
                num: "02",
                title: "Review the breakdown",
                desc: "See taxes and deductions in plain language",
              },
              {
                num: "03",
                title: "Make a better decision",
                desc: "Compare offers, plan expenses, negotiate with context",
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-3">
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#1A6B9A", opacity: 0.3 }}
                >
                  {step.num}
                </div>
                <h3 className="font-semibold text-lg" style={{ color: "#1A1A2E" }}>
                  {step.title}
                </h3>
                <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: "#1A1A2E" }}>
            Salary questions, answered
          </h2>
          <div className="divide-y" style={{ borderColor: "#E5E7EB" }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Strip */}
      <div
        style={{
          backgroundColor: "#FFF8E1",
          borderTop: "1px solid #F0A500",
        }}
      >
        <div className="container-site py-4 text-center">
          <p style={{ color: "#1A1A2E", fontSize: "0.85rem" }}>
            SalaryScope provides estimates for planning purposes only. Results are not tax or
            financial advice. Always verify with your employer or a qualified tax professional.
          </p>
        </div>
      </div>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="py-4 group cursor-pointer" style={{ listStyle: "none" }}>
      <summary
        className="flex items-center justify-between font-medium text-base cursor-pointer"
        style={{ color: "#1A1A2E", listStyle: "none" }}
      >
        {question}
        <span className="ml-4 text-xl font-light group-open:rotate-45 transition-transform" style={{ color: "#1A6B9A" }}>
          +
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
        {answer}
      </p>
    </details>
  );
}
