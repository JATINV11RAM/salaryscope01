"use client";
import { useState } from "react";
import { calculateGratuity, formatINR, type GratuityInputs } from "@/lib/calculations";

const defaultInputs: GratuityInputs = {
  basicMonthly: 0,
  yearsOfService: 0,
  coveredUnderAct: true,
};

export default function GratuityCalc() {
  const [inputs, setInputs] = useState<GratuityInputs>(defaultInputs);
  const [result, setResult] = useState<ReturnType<typeof calculateGratuity> | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!inputs.basicMonthly || inputs.basicMonthly <= 0) {
      setError("Please enter your monthly basic salary.");
      return;
    }
    if (!inputs.yearsOfService || inputs.yearsOfService < 0) {
      setError("Please enter valid years of service.");
      return;
    }
    setError("");
    setResult(calculateGratuity(inputs));
  }

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-blue-300";
  const inputStyle = { border: "1px solid #E5E7EB", color: "#1A1A2E", minHeight: "44px" };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full max-w-xl mx-auto" style={{ border: "1px solid #E5E7EB" }}>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Last Drawn Monthly Basic Salary (₹)</label>
          <input type="number" className={inputClass} style={inputStyle} placeholder="e.g. 50000"
            value={inputs.basicMonthly || ""} onChange={(e) => setInputs(p => ({ ...p, basicMonthly: Number(e.target.value) }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Years of Service</label>
          <input type="number" step="0.5" className={inputClass} style={inputStyle} placeholder="e.g. 5.5"
            value={inputs.yearsOfService || ""} onChange={(e) => setInputs(p => ({ ...p, yearsOfService: Number(e.target.value) }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A2E" }}>Covered under Gratuity Act?</label>
          <div className="flex gap-4">
            {[{ label: "Yes", value: true }, { label: "No", value: false }].map((opt) => (
              <label key={String(opt.value)} className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "#1A1A2E" }}>
                <input type="radio" name="coveredUnderAct" checked={inputs.coveredUnderAct === opt.value}
                  onChange={() => setInputs(p => ({ ...p, coveredUnderAct: opt.value }))}
                  className="w-4 h-4" style={{ accentColor: "#1A6B9A" }} />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button onClick={handleCalculate}
          className="w-full py-3.5 rounded-lg text-white font-semibold text-base transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1A6B9A", minHeight: "44px" }}>
          Calculate My Gratuity
        </button>
      </div>

      {result && (
        <div className="mt-8">
          {!result.isEligible && (
            <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: "#FFF8E1", border: "1px solid #F0A500" }}>
              <p className="text-sm font-medium" style={{ color: "#92400E" }}>
                ⚠️ You need a minimum of 5 years of continuous service to be eligible for gratuity under the Payment of Gratuity Act.
              </p>
            </div>
          )}

          <div className="text-center rounded-xl p-6 mb-6" style={{ backgroundColor: "#EFF6FF", border: "1px solid #1A6B9A" }}>
            <div className="text-3xl font-bold mb-1" style={{ color: "#1A6B9A" }}>
              {formatINR(result.gratuityAmount)}
            </div>
            <div className="font-semibold text-base mb-1" style={{ color: "#1A1A2E" }}>Your Gratuity</div>
            <div className="text-sm font-mono" style={{ color: "#6B7280" }}>
              Formula: (Basic × 15 × Years) ÷ {inputs.coveredUnderAct ? "26" : "30"}
            </div>
          </div>

          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Basic Salary", value: `${formatINR(inputs.basicMonthly)}/month` },
                  { label: "Years of Service", value: `${inputs.yearsOfService} years` },
                  { label: "Gratuity Amount", value: formatINR(result.gratuityAmount) },
                  { label: "Tax Exempt (up to ₹20 lakh)", value: formatINR(result.taxExemptAmount) },
                  { label: "Taxable Amount", value: formatINR(result.taxableAmount) },
                ].map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#F9FAFB" }}>
                    <td className="px-4 py-3" style={{ color: "#1A1A2E", borderBottom: "1px solid #E5E7EB" }}>{row.label}</td>
                    <td className="px-4 py-3 text-right font-medium" style={{ color: "#1A1A2E", borderBottom: "1px solid #E5E7EB" }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-center" style={{ color: "#6B7280" }}>
            Maximum tax-exempt gratuity is ₹20,00,000 as per current rules.
          </p>
        </div>
      )}
    </div>
  );
}
