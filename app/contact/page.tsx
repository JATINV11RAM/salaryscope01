import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact SalaryScope",
  description: "Contact SalaryScope for corrections, feedback, or questions.",
  alternates: { canonical: "https://salaryscope.in/contact" },
};

export default function ContactPage() {
  return (
    <div className="py-12 px-4" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm" style={{ border: "1px solid #E5E7EB" }}>
          <h1 className="text-3xl font-bold mb-6" style={{ color: "#1A1A2E" }}>Contact Us</h1>
          <p className="mb-6 text-sm" style={{ color: "#6B7280", lineHeight: 1.8 }}>
            For corrections, feedback, or general questions about SalaryScope:
          </p>

          <div className="space-y-4 mb-6">
            <div className="rounded-lg p-4" style={{ backgroundColor: "#F5F7FA", border: "1px solid #E5E7EB" }}>
              <div className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#6B7280" }}>Email</div>
              <div className="font-medium" style={{ color: "#1A6B9A" }}>support.salaryscope@gmail.com</div>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: "#F5F7FA", border: "1px solid #E5E7EB" }}>
              <div className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#6B7280" }}>Response Time</div>
              <div className="font-medium" style={{ color: "#1A1A2E" }}>Within 48 hours on working days</div>
            </div>
          </div>

          <div className="rounded-lg p-4 text-sm" style={{ backgroundColor: "#FFF8E1", border: "1px solid #F0A500" }}>
            <p className="font-medium mb-1" style={{ color: "#92400E" }}>Before you write:</p>
            <ul className="space-y-1" style={{ color: "#92400E" }}>
              <li>• If reporting incorrect information, include the page URL so we can fix it quickly.</li>
              <li>• We cannot provide personalised tax or salary advice. For specific questions, please consult your HR or a qualified tax professional.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
