"use client";
import { useState } from "react";
import { calculateInHandSalary, formatINR, type InHandInputs } from "@/lib/calculations";

const defaultInputs: InHandInputs = {
  annualCTC: 0,
  variablePay: 0,
  basicPercent: 40,
  professionalTaxMonthly: 200,
  taxRegime: "new",
  hraMonthly: 0,
  rentPaidMonthly: 0,
  deduction80C: 0,
  deduction80D: 0,
};

export default function InHandCalculator() {
  const [inputs, setInputs] = useState<InHandInputs>(defaultInputs);
  const [result, setResult] = useState<ReturnType<typeof calculateInHandSalary> | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState("");

  function handleChange(field: keyof InHandInputs, value: string | number | "new" | "old") {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setResult(null);
  }

  function handleCalculate() {
    if (!inputs.annualCTC || inputs.annualCTC <= 0) {
      setError("Please enter your Annual CTC.");
      return;
    }
    setError("");
    setResult(calculateInHandSalary(inputs));
  }

  const inputClass =
    "w-full rounded-lg px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-blue-300";
  const inputStyle = {
    border: "1px solid #E5E7EB",
    color: "#1A1A2E",
    minHeight: "44px",
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full max-w-xl mx-auto"
      style={{ border: "1px solid #E5E7EB" }}
    >
      <div className="space-y-5">
        {/* Annual CTC */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>
            Annual CTC (₹)
          </label>
          <input
            type="number"
            className={inputClass}
            style={inputStyle}
            placeholder="e.g. 1000000"
            value={inputs.annualCTC || ""}
            onChange={(e) => handleChange("annualCTC", Number(e.target.value))}
          />
        </div>

        {/* Variable Pay */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>
            Variable Pay Annual (₹)
            <span className="ml-1 text-xs font-normal text-muted">(exclude if not guaranteed)</span>
          </label>
          <input
            type="number"
            className={inputClass}
            style={inputStyle}
            placeholder="0 if none"
            value={inputs.variablePay || ""}
            onChange={(e) => handleChange("variablePay", Number(e.target.value))}
          />
        </div>

        {/* Basic % */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>
            Basic Salary %
          </label>
          <input
            type="number"
            className={inputClass}
            style={inputStyle}
            placeholder="              Usually 40–50% of fixed salary"
            value={inputs.basicPercent}
            onChange={(e) => handleChange("basicPercent", Number(e.target.value))}
          />
        </div>

        {/* Professional Tax */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>
            Professional Tax Monthly (₹)
          </label>
          <input
            type="number"
            className={inputClass}
            style={inputStyle}
            placeholder="0 if your state has no PT"
            value={inputs.professionalTaxMonthly}
            onChange={(e) => handleChange("professionalTaxMonthly", Number(e.target.value))}
          />
        </div>

        {/* Tax Regime */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A2E" }}>
            Tax Regime
          </label>
          <div className="flex gap-4">
            {(["new", "old"] as const).map((regime) => (
              <label
                key={regime}
                className="flex items-center gap-2 cursor-pointer text-sm"
                style={{ color: "#1A1A2E" }}
              >
                <input
                  type="radio"
                  name="taxRegime"
                  value={regime}
                  checked={inputs.taxRegime === regime}
                  onChange={() => handleChange("taxRegime", regime)}
                  className="w-4 h-4"
                  style={{ accentColor: "#1A6B9A" }}
                />
                {regime === "new" ? "New Regime" : "Old Regime"}
              </label>
            ))}
          </div>
        </div>

        {/* Advanced Toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium flex items-center gap-1"
          style={{ color: "#1A6B9A" }}
        >
          {showAdvanced ? "▲" : "▼"} Advanced Assumptions
        </button>

        {showAdvanced && (
          <div className="space-y-4 p-4 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>
                HRA Monthly (₹)
              </label>
              <input
                type="number"
                className={inputClass}
                style={{ ...inputStyle, backgroundColor: "#fff" }}
                placeholder="0"
                value={inputs.hraMonthly || ""}
                onChange={(e) => handleChange("hraMonthly", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>
                Rent Paid Monthly (₹)
              </label>
              <input
                type="number"
                className={inputClass}
                style={{ ...inputStyle, backgroundColor: "#fff" }}
                placeholder="0"
                value={inputs.rentPaidMonthly || ""}
                onChange={(e) => handleChange("rentPaidMonthly", Number(e.target.value))}
              />
            </div>
            {inputs.taxRegime === "old" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>
                    80C Deductions (₹) <span style={{ color: "#6B7280" }}>(max ₹1,50,000)</span>
                  </label>
                  <input
                    type="number"
                    className={inputClass}
                    style={{ ...inputStyle, backgroundColor: "#fff" }}
                    placeholder="0"
                    max={150000}
                    value={inputs.deduction80C || ""}
                    onChange={(e) => handleChange("deduction80C", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>
                    80D Deductions (₹) <span style={{ color: "#6B7280" }}>(max ₹25,000)</span>
                  </label>
                  <input
                    type="number"
                    className={inputClass}
                    style={{ ...inputStyle, backgroundColor: "#fff" }}
                    placeholder="0"
                    max={25000}
                    value={inputs.deduction80D || ""}
                    onChange={(e) => handleChange("deduction80D", Number(e.target.value))}
                  />
                </div>
              </>
            )}
          </div>
        )}

        <div className="rounded-lg border border-border bg-light-bg p-4 text-sm leading-6 text-muted">
          <strong className="text-foreground">FY 2025–26 assumptions:</strong> new-regime standard deduction ₹75,000, employee PF at 12% of basic, gratuity provision at 4.81% of basic, and professional tax as entered. Expand advanced assumptions for HRA and old-regime deductions.
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full py-3.5 rounded-lg text-white font-semibold text-base transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1A6B9A", minHeight: "44px" }}
        >
          Calculate My In-Hand Salary
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8">
          <div
            className="text-center rounded-xl p-6 mb-6"
            style={{ backgroundColor: "#EFF6FF", border: "1px solid #1A6B9A" }}
          >
            <div className="text-3xl font-bold mb-1" style={{ color: "#1A6B9A" }}>
              {formatINR(result.monthlyInHand)}
            </div>
            <div className="font-semibold text-base mb-1" style={{ color: "#1A1A2E" }}>
              Estimated Monthly In-Hand
            </div>
            <div className="text-sm" style={{ color: "#6B7280" }}>
              FY 2025-26 estimate
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid #E5E7EB" }}>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Annual CTC", value: formatINR(result.annualCTC), deduct: false },
                  { label: "Less: Employer PF (12% of basic)", value: formatINR(result.employerPFAnnual), deduct: true },
                  { label: "Less: Gratuity Provision (4.81% of basic)", value: formatINR(result.gratuityProvisionAnnual), deduct: true },
                  { label: "Annual Gross Salary", value: formatINR(result.annualGrossSalary), deduct: false, bold: true },
                  { label: "Less: Employee PF (12% of basic)", value: formatINR(result.employeePFAnnual), deduct: true },
                  { label: "Less: Professional Tax", value: formatINR(result.professionalTaxAnnual), deduct: true },
                  { label: "Less: Income Tax (TDS)", value: formatINR(result.incomeTaxAnnual), deduct: true },
                  { label: "Annual In-Hand", value: formatINR(result.annualInHand), deduct: false, bold: true },
                  { label: "Monthly In-Hand", value: formatINR(result.monthlyInHand), deduct: false, bold: true, highlight: true },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: row.highlight ? "#EFF6FF" : i % 2 === 0 ? "#fff" : "#F9FAFB",
                    }}
                  >
                    <td
                      className="px-4 py-3"
                      style={{
                        color: "#1A1A2E",
                        fontWeight: row.bold ? 600 : 400,
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      {row.label}
                    </td>
                    <td
                      className="px-4 py-3 text-right"
                      style={{
                        color: row.deduct ? "#DC2626" : row.highlight ? "#1A6B9A" : "#1A1A2E",
                        fontWeight: row.bold ? 600 : 400,
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      {row.deduct ? "-" : ""}{row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-center" style={{ color: "#6B7280" }}>
            This is a planning estimate. Actual amount may vary based on exact payroll structure.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => window.print()} className="flex-1 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-light-bg">Print / save PDF</button>
            <button type="button" onClick={() => navigator.share?.({ title: "My SalaryScope estimate", text: `Estimated monthly in-hand: ${formatINR(result.monthlyInHand)}` })} className="flex-1 rounded-lg bg-light-bg px-4 py-3 text-sm font-semibold text-primary hover:brightness-95">Share estimate</button>
          </div>
        </div>
      )}
    </div>
  );
}
