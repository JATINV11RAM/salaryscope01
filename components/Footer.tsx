import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/in-hand-salary-calculator" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

const calculatorLinks = [
  { label: "In-Hand Salary", href: "/in-hand-salary-calculator" },
  { label: "Tax Regime Comparison", href: "/compare-tax-regimes" },
  { label: "Salary Breakup", href: "/salary-breakup" },
  { label: "Gratuity Calculator", href: "/gratuity-calculator" },
  { label: "Notice Period Calculator", href: "/notice-period-calculator" },
  { label: "Compare Offers", href: "/compare-offers" },
  { label: "Percentile Estimator", href: "/percentile-estimator" },
  { label: "Severance Pay Calculator", href: "/severance-pay-calculator-india" },
  { label: "Professional Tax Guide", href: "/how-to-cut-professional-tax-on-salary" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#F5F7FA", borderTop: "1px solid #E5E7EB" }}>
      <div className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1 */}
          <div>
            <div className="mb-3">
              <span
                style={{ color: "#1A6B9A", fontWeight: 700, fontSize: "1.125rem" }}
              >
                ₹SalaryScope
              </span>
            </div>
            <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: "1.6" }}>
              Practical salary tools for Indian professionals. No sign-up. No data stored.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h3
              className="font-semibold mb-4 text-sm uppercase tracking-wider"
              style={{ color: "#1A1A2E" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{ color: "#6B7280", fontSize: "0.875rem", textDecoration: "none" }}
                    className="hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3
              className="font-semibold mb-4 text-sm uppercase tracking-wider"
              style={{ color: "#1A1A2E" }}
            >
              Calculators
            </h3>
            <ul className="space-y-2">
              {calculatorLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{ color: "#6B7280", fontSize: "0.875rem", textDecoration: "none" }}
                    className="hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: "1px solid #E5E7EB", backgroundColor: "#fff" }}>
        <div className="container-site py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>
            &copy; 2026 SalaryScope India. For planning purposes only. Not tax advice.
          </p>
          <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>
            This website is not affiliated with any government body.
          </p>
        </div>
      </div>
    </footer>
  );
}
