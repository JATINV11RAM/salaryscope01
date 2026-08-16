"use client";
import { useState } from "react";
import { calculateNoticePeriod, type NoticePeriodInputs } from "@/lib/calculations";

const defaultInputs: NoticePeriodInputs = {
  resignationDate: "",
  noticePeriodValue: 30,
  noticePeriodUnit: "days",
  includeWeekends: true,
};

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function NoticePeriodCalc() {
  const [inputs, setInputs] = useState<NoticePeriodInputs>(defaultInputs);
  const [result, setResult] = useState<ReturnType<typeof calculateNoticePeriod> | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (!inputs.resignationDate) {
      setError("Please select your resignation date.");
      return;
    }
    if (!inputs.noticePeriodValue || inputs.noticePeriodValue <= 0) {
      setError("Please enter a valid notice period.");
      return;
    }
    setError("");
    setResult(calculateNoticePeriod(inputs));
  }

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-blue-300";
  const inputStyle = { border: "1px solid #E5E7EB", color: "#1A1A2E", minHeight: "44px" };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full max-w-xl mx-auto" style={{ border: "1px solid #E5E7EB" }}>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Resignation Date</label>
          <input type="date" className={inputClass} style={inputStyle}
            value={inputs.resignationDate} onChange={(e) => setInputs(p => ({ ...p, resignationDate: e.target.value }))} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A2E" }}>Notice Period</label>
          <div className="flex gap-2">
            <input type="number" className={inputClass} style={{ ...inputStyle, width: "120px", flex: "none" }}
              value={inputs.noticePeriodValue} onChange={(e) => setInputs(p => ({ ...p, noticePeriodValue: Number(e.target.value) }))} />
            <select className={inputClass} style={{ ...inputStyle, flex: 1 }}
              value={inputs.noticePeriodUnit} onChange={(e) => setInputs(p => ({ ...p, noticePeriodUnit: e.target.value as "days" | "weeks" | "months" }))}>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A2E" }}>Include weekends in notice period?</label>
          <div className="flex gap-4">
            {[{ label: "Yes", value: true }, { label: "No (skip weekends)", value: false }].map((opt) => (
              <label key={String(opt.value)} className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "#1A1A2E" }}>
                <input type="radio" name="includeWeekends" checked={inputs.includeWeekends === opt.value}
                  onChange={() => setInputs(p => ({ ...p, includeWeekends: opt.value }))}
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
          Find My Last Working Day
        </button>
      </div>

      {result && (
        <div className="mt-8">
          <div className="text-center rounded-xl p-6 mb-6" style={{ backgroundColor: "#EFF6FF", border: "1px solid #1A6B9A" }}>
            <div className="text-sm font-medium mb-1" style={{ color: "#6B7280" }}>Your Last Working Day</div>
            <div className="text-2xl font-bold" style={{ color: "#1A6B9A" }}>
              {formatDate(result.lastWorkingDay)}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between gap-2 mb-4 p-4 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
            <div className="text-center">
              <div className="text-xs font-medium mb-1" style={{ color: "#6B7280" }}>Resignation</div>
              <div className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>{formatDate(result.resignationDate)}</div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-px" style={{ backgroundColor: "#1A6B9A" }} />
              <div className="text-xs" style={{ color: "#1A6B9A" }}>
                {result.totalCalendarDays} days
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium mb-1" style={{ color: "#6B7280" }}>Last Day</div>
              <div className="text-sm font-semibold" style={{ color: "#1A6B9A" }}>{formatDate(result.lastWorkingDay)}</div>
            </div>
          </div>

          <p className="text-xs text-center" style={{ color: "#6B7280" }}>
            Public holidays are not excluded from this calculation. Check with your HR for holiday adjustments.
          </p>
        </div>
      )}
    </div>
  );
}
