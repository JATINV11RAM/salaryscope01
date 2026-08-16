"use client";
import { useState } from "react";
import { calculateTaxRegimeComparison, formatINR, type TaxRegimeInputs } from "@/lib/calculations";

const defaultInputs: TaxRegimeInputs = {
  annualCTC: 0,
  basicPercent: 40,
  deduction80C: 0,
  deduction80D: 0,
  hraMonthly: 0,
  rentPaidMonthly: 0,
  homeLoanInterest: 0,
};

export default function TaxRegimeCalculator() {
  const [inputs, setInputs] = useState<TaxRegimeInputs>(defaultInputs);
  const [result, setResult] = useState<ReturnType<typeof calculateTaxRegimeComparison> | null>(null);
  const [error, setError] = useState("");

  function handleChange(field: keyof TaxRegimeInputs, value: number) {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setResult(null);
  }

  function handleCalculate() {
    if (!inputs.annualCTC || inputs.annualCTC <= 0) {
      setError("Please enter your Annual CTC.");
      return;
    }
    setError("");
    setResult(calculateTaxRegimeComparison(inputs));
  }

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-blue-300";
  const inputStyle = { border: "1px solid #E5E7EB", color: "#1A1A2E", minHeight: "44px" };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full max-w-xl mx-auto" style={{ border: "1px solid #E5E7EB" }}>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Annual CTC (₹)</label>
          <input type="number" className={inputClass} style={inputStyle} placeholder="e.g. 1200000"
            value={inputs.annualCTC || ""} onChange={(e) => handleChange("annualCTC", Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Basic Salary %</label>
          <input type="number" className={inputClass} style={inputStyle} placeholder="40"
            value={inputs.basicPercent} onChange={(e) => handleChange("basicPercent", Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>80C Deductions (₹) <span style={{ color: "#6B7280" }}>(max ₹1,50,000)</span></label>
          <input type="number" className={inputClass} style={inputStyle} max={150000} placeholder="0"
            value={inputs.deduction80C || ""} onChange={(e) => handleChange("deduction80C", Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>80D Health Insurance (₹) <span style={{ color: "#6B7280" }}>(max ₹25,000)</span></label>
          <input type="number" className={inputClass} style={inputStyle} max={25000} placeholder="0"
            value={inputs.deduction80D || ""} onChange={(e) => handleChange("deduction80D", Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>HRA Received Monthly (₹)</label>
          <input type="number" className={inputClass} style={inputStyle} placeholder="0"
            value={inputs.hraMonthly || ""} onChange={(e) => handleChange("hraMonthly", Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Rent Paid Monthly (₹)</label>
          <input type="number" className={inputClass} style={inputStyle} placeholder="0"
            value={inputs.rentPaidMonthly || ""} onChange={(e) => handleChange("rentPaidMonthly", Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Home Loan Interest Annual (₹) <span style={{ color: "#6B7280" }}>(max ₹2,00,000)</span></label>
          <input type="number" className={inputClass} style={inputStyle} max={200000} placeholder="0"
            value={inputs.homeLoanInterest || ""} onChange={(e) => handleChange("homeLoanInterest", Number(e.target.value))} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button onClick={handleCalculate}
          className="w-full py-3.5 rounded-lg text-white font-semibold text-base transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1A6B9A", minHeight: "44px" }}>
          Compare Both Regimes
        </button>
      </div>

      {result && (
        <div className="mt-8">
          {/* Winner Banner */}
          <div className="rounded-xl p-4 mb-6 text-center font-semibold text-base"
            style={{
              backgroundColor: result.betterRegime === "new" ? "#EFF6FF" : "#FFF8E1",
              border: `2px solid ${result.betterRegime === "new" ? "#1A6B9A" : "#F0A500"}`,
              color: result.betterRegime === "new" ? "#1A6B9A" : "#92400E",
            }}>
            {result.betterRegime === "new" ? "New" : "Old"} Regime saves you {formatINR(result.saving)} more per year
          </div>

          {/* Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {(["new", "old"] as const).map((regime) => {
              const r = regime === "new" ? result.newRegime : result.oldRegime;
              const isBetter = result.betterRegime === regime;
              return (
                <div key={regime} className="rounded-xl p-5"
                  style={{
                    border: `2px solid ${isBetter ? "#1A6B9A" : "#E5E7EB"}`,
                    backgroundColor: isBetter ? "#EFF6FF" : "#F9FAFB",
                  }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-base" style={{ color: "#1A1A2E" }}>
                      {regime === "new" ? "New Regime" : "Old Regime"}
                    </h3>
                    {isBetter && (
                      <span className="text-xs px-2 py-1 rounded-full font-medium text-white" style={{ backgroundColor: "#1A6B9A" }}>
                        Better
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: "#6B7280" }}>Tax Payable</span>
                      <span className="font-medium" style={{ color: "#1A1A2E" }}>{formatINR(r.taxPayable)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "#6B7280" }}>Monthly TDS</span>
                      <span className="font-medium" style={{ color: "#1A1A2E" }}>{formatINR(r.monthlyTDS)}</span>
                    </div>
                    <div className="flex justify-between pt-2" style={{ borderTop: "1px solid #E5E7EB" }}>
                      <span style={{ color: "#6B7280" }}>Annual In-Hand</span>
                      <span className="font-bold text-base" style={{ color: isBetter ? "#1A6B9A" : "#1A1A2E" }}>
                        {formatINR(r.annualInHand)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deduction Summary */}
          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
            <div className="px-4 py-3 font-semibold text-sm" style={{ backgroundColor: "#F5F7FA", color: "#1A1A2E" }}>
              Old Regime Deductions Entered
            </div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Standard Deduction", value: "₹50,000" },
                  { label: "80C Deductions", value: formatINR(Math.min(inputs.deduction80C, 150000)) },
                  { label: "80D Deductions", value: formatINR(Math.min(inputs.deduction80D, 25000)) },
                  { label: "Home Loan Interest", value: formatINR(Math.min(inputs.homeLoanInterest, 200000)) },
                  { label: "Employee PF (deductible)", value: formatINR(result.employeePFAnnual) },
                ].map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#F9FAFB" }}>
                    <td className="px-4 py-2.5" style={{ color: "#1A1A2E", borderBottom: "1px solid #E5E7EB" }}>{row.label}</td>
                    <td className="px-4 py-2.5 text-right" style={{ color: "#1A1A2E", borderBottom: "1px solid #E5E7EB" }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-center" style={{ color: "#6B7280" }}>
            Planning estimate only. Actual tax may vary based on your exact payroll structure.
          </p>
        </div>
      )}
    </div>
  );
}
