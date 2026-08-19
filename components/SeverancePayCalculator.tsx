"use client";

import { useMemo, useState } from "react";
import { formatINR } from "@/lib/calculations";

export default function SeverancePayCalculator() {
  const [basic, setBasic] = useState(60000);
  const [da, setDa] = useState(0);
  const [years, setYears] = useState(5);
  const [noticeDays, setNoticeDays] = useState(60);
  const [leaveDays, setLeaveDays] = useState(15);
  const [exGratia, setExGratia] = useState(0);
  const result = useMemo(() => {
    const monthlyBasicDA = basic + da;
    const daily = monthlyBasicDA / 26;
    const gratuity = years >= 5 ? (monthlyBasicDA * 15 * years) / 26 : 0;
    const noticePay = daily * noticeDays;
    const leavePay = daily * leaveDays;
    const total = gratuity + noticePay + leavePay + exGratia;
    return { gratuity, noticePay, leavePay, total };
  }, [basic, da, years, noticeDays, leaveDays, exGratia]);
  const field = (label: string, value: number, setValue: (value: number) => void, suffix = "₹") => <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">{label}<div className="flex items-center rounded-lg border border-border bg-card px-3"><span className="text-muted">{suffix}</span><input className="min-w-0 flex-1 bg-transparent px-2 py-3 outline-none" type="number" min="0" value={value} onChange={(event) => setValue(Number(event.target.value) || 0)} /></div></label>;
  return <div>
    <div className="mb-6"><p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Severance estimate</p><h2 className="mt-2 text-2xl font-bold text-foreground">Estimate your exit payout</h2><p className="mt-2 text-sm leading-6 text-muted">Model common components separately so your final settlement conversation starts with clear numbers.</p></div>
    <div className="grid gap-4 md:grid-cols-2">
      {field("Monthly basic salary", basic, setBasic)}{field("Monthly DA", da, setDa)}{field("Completed service years", years, setYears, "#")}{field("Notice period", noticeDays, setNoticeDays, "days")}{field("Unused leave", leaveDays, setLeaveDays, "days")}{field("Ex-gratia / severance", exGratia, setExGratia)}
    </div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Stat label="Gratuity estimate" value={result.gratuity} /><Stat label="Notice pay" value={result.noticePay} /><Stat label="Leave encashment" value={result.leavePay} /><Stat label="Estimated total" value={result.total} strong /></div>
    <p className="mt-5 text-xs leading-5 text-muted">Planning estimate only. Appointment terms, company policy, earned leave rules, tax treatment and applicable labour law can change the final settlement.</p>
  </div>;
}
function Stat({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) { return <div className={`rounded-xl border border-border p-4 ${strong ? "bg-light-bg" : "bg-card"}`}><p className="text-xs text-muted">{label}</p><p className={`mt-2 text-xl font-bold ${strong ? "text-primary" : "text-foreground"}`}>{formatINR(value)}</p></div>; }
