"use client";
import { useState } from "react";
import { calculateSalaryBreakup, formatINR, type SalaryBreakupInputs } from "@/lib/calculations";

const defaultInputs: SalaryBreakupInputs = {
  annualCTC: 0,
  basicPercent: 40,
  hraPercent: 50,
  professionalTaxMonthly: 200,
};

export default function SalaryBreakupCalc() {
  const [inputs, setInputs] = useState<SalaryBreakupInputs>(defaultInputs);
  const [result, setResult] = useState<ReturnType<typeof calculateSalaryBreakup> | null>(null);
  const [error, setError] = useState("");

  function handleChange(field: keyof SalaryBreakupInputs, value: number) {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setResult(null);
  }

  function handleCalculate() {
    if (!inputs.annualCTC || inputs.annualCTC <= 0) {
      setError("Please enter your Annual CTC.");
      return;
    }
    setError("");
    setResult(calculateSalaryBreakup(inputs));
  }

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-blue-300";
  const inputStyle = { border: "1px solid #E5E7EB", color: "#1A1A2E", minHeight: "44px" };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full max-w-xl mx-auto" style={{ border: "1px solid #E5E7EB" }}>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Annual CTC (₹)</label>
          <input type="number" className={inputClass} style={inputStyle} placeholder="e.g. 1000000"
            value={inputs.annualCTC || ""} onChange={(e) => handleChange("annualCTC", Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Basic Salary %</label>
          <input type="number" className={inputClass} style={inputStyle} placeholder="40"
            value={inputs.basicPercent} onChange={(e) => handleChange("basicPercent", Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>HRA % <span style={{ color: "#6B7280" }}>(of Basic)</span></label>
          <input type="number" className={inputClass} style={inputStyle} placeholder="50"
            value={inputs.hraPercent} onChange={(e) => handleChange("hraPercent", Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Professional Tax Monthly (₹)</label>
          <input type="number" className={inputClass} style={inputStyle} placeholder="200"
            value={inputs.professionalTaxMonthly} onChange={(e) => handleChange("professionalTaxMonthly", Number(e.target.value))} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button onClick={handleCalculate}
          className="w-full py-3.5 rounded-lg text-white font-semibold text-base transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1A6B9A", minHeight: "44px" }}>
          Show My Salary Breakup
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-4">
          {/* Earnings */}
          <BreakupSection title="EARNINGS" rows={[
            { label: "Basic Salary", monthly: result.basicMonthly, annual: result.basicAnnual },
            { label: "HRA", monthly: result.hraMonthly, annual: result.hraAnnual },
            { label: "Special Allowance", monthly: result.specialAllowanceMonthly, annual: result.specialAllowanceAnnual },
          ]} subtotal={{ label: "Gross Earnings", monthly: result.grossEarningsMonthly, annual: result.grossEarningsAnnual }} />

          {/* Deductions */}
          <BreakupSection title="DEDUCTIONS" rows={[
            { label: "Employee PF", monthly: result.employeePFMonthly, annual: result.employeePFAnnual },
            { label: "Professional Tax", monthly: result.professionalTaxMonthly, annual: result.professionalTaxAnnual },
            { label: "Income Tax (TDS, New Regime)", monthly: result.incomeTaxMonthly, annual: result.incomeTaxAnnual },
          ]} subtotal={{ label: "Total Deductions", monthly: result.totalDeductionsMonthly, annual: result.totalDeductionsAnnual }} negative />

          {/* Net Pay */}
          <div className="rounded-lg overflow-hidden" style={{ border: "2px solid #1A6B9A" }}>
            <div className="px-4 py-2 font-bold text-xs uppercase tracking-wider" style={{ backgroundColor: "#1A6B9A", color: "#fff" }}>
              NET PAY
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F5F7FA" }}>
                  <th className="px-4 py-2 text-left text-xs font-medium" style={{ color: "#6B7280" }}>Component</th>
                  <th className="px-4 py-2 text-right text-xs font-medium" style={{ color: "#6B7280" }}>Monthly</th>
                  <th className="px-4 py-2 text-right text-xs font-medium" style={{ color: "#6B7280" }}>Annual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 font-bold" style={{ color: "#1A1A2E" }}>Monthly In-Hand</td>
                  <td className="px-4 py-3 text-right font-bold" style={{ color: "#1A6B9A" }}>{formatINR(result.netPayMonthly)}</td>
                  <td className="px-4 py-3 text-right font-bold" style={{ color: "#1A6B9A" }}>{formatINR(result.netPayAnnual)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Employer Cost */}
          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
            <div className="px-4 py-2 font-bold text-xs uppercase tracking-wider" style={{ backgroundColor: "#FFF8E1", color: "#92400E" }}>
              EMPLOYER COST
            </div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Employer PF", value: result.employerPFAnnual },
                  { label: "Gratuity Provision", value: result.gratuityProvisionAnnual },
                  { label: "Total CTC", value: result.totalCTCAnnual, bold: true },
                ].map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#F9FAFB" }}>
                    <td className="px-4 py-2.5" style={{ color: "#1A1A2E", fontWeight: row.bold ? 600 : 400, borderBottom: "1px solid #E5E7EB" }}>{row.label}</td>
                    <td className="px-4 py-2.5 text-right" style={{ color: "#1A1A2E", fontWeight: row.bold ? 600 : 400, borderBottom: "1px solid #E5E7EB" }} colSpan={2}>{formatINR(row.value)}/year</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-center" style={{ color: "#6B7280" }}>
            Income tax estimated using New Regime for FY 2025-26. For old regime, use the Tax Regime Comparison tool.
          </p>
        </div>
      )}
    </div>
  );
}

function BreakupSection({
  title, rows, subtotal, negative = false
}: {
  title: string;
  rows: { label: string; monthly: number; annual: number }[];
  subtotal: { label: string; monthly: number; annual: number };
  negative?: boolean;
}) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
      <div className="px-4 py-2 font-bold text-xs uppercase tracking-wider"
        style={{ backgroundColor: negative ? "#FEF2F2" : "#EFF6FF", color: negative ? "#DC2626" : "#1A6B9A" }}>
        {title}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "#F5F7FA" }}>
            <th className="px-4 py-2 text-left text-xs font-medium" style={{ color: "#6B7280" }}>Component</th>
            <th className="px-4 py-2 text-right text-xs font-medium" style={{ color: "#6B7280" }}>Monthly</th>
            <th className="px-4 py-2 text-right text-xs font-medium" style={{ color: "#6B7280" }}>Annual</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <td className="px-4 py-2.5" style={{ color: "#1A1A2E" }}>{row.label}</td>
              <td className="px-4 py-2.5 text-right" style={{ color: negative ? "#DC2626" : "#1A1A2E" }}>{formatINR(row.monthly)}</td>
              <td className="px-4 py-2.5 text-right" style={{ color: negative ? "#DC2626" : "#1A1A2E" }}>{formatINR(row.annual)}</td>
            </tr>
          ))}
          <tr style={{ backgroundColor: "#F5F7FA" }}>
            <td className="px-4 py-2.5 font-semibold" style={{ color: "#1A1A2E" }}>{subtotal.label}</td>
            <td className="px-4 py-2.5 text-right font-semibold" style={{ color: negative ? "#DC2626" : "#1A6B9A" }}>{formatINR(subtotal.monthly)}</td>
            <td className="px-4 py-2.5 text-right font-semibold" style={{ color: negative ? "#DC2626" : "#1A6B9A" }}>{formatINR(subtotal.annual)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
