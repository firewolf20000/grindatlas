import { useState } from "react";
export default function IdleCalculator() {
  const [mode, setMode] = useState("time");
  const [current, setCurrent] = useState("1000");
  const [cps, setCps] = useState("50");
  const [growth, setGrowth] = useState("0");
  const [target, setTarget] = useState("100000");
  const [win, setWin] = useState("60");
  const c = parseFloat(current) || 0;
  const p = parseFloat(cps) || 0;
  const g = parseFloat(growth) || 0;
  const t = parseFloat(target) || 0;
  const w = parseFloat(win) || 1;
  const fmt = (n: number) => {
    if (!isFinite(n) || isNaN(n)) return "-";
    if (n < 1000) return n.toFixed(2);
    if (n < 1e6) return (n / 1e3).toFixed(2) + "K";
    if (n < 1e9) return (n / 1e6).toFixed(2) + "M";
    if (n < 1e12) return (n / 1e9).toFixed(2) + "B";
    return n.toExponential(2);
  };
  const fmtTime = (s: number) => {
    if (!isFinite(s) || isNaN(s) || s < 0) return "-";
    if (s < 60) return s.toFixed(1) + "s";
    if (s < 3600) return (s / 60).toFixed(1) + " min";
    if (s < 86400) return (s / 3600).toFixed(1) + " h";
    if (s < 2592000) return (s / 86400).toFixed(1) + " days";
    if (s < 31536000) return (s / 2592000).toFixed(1) + " mo";
    return (s / 31536000).toFixed(1) + " yr";
  };
  let resultLabel = "";
  let resultValue = "";
  if (mode === "time") {
    if (p <= 0) { resultLabel = "Time to target"; resultValue = "Set positive production"; }
    else if (g === 0) { resultLabel = "Time to target"; resultValue = fmtTime((t - c) / p); }
    else {
      const r = g / 100 / 60;
      const v = (s: number) => c + (p / r) * (Math.exp(r * s) - 1);
      if (v(0) >= t) { resultLabel = "Time to target"; resultValue = "0s (already there)"; }
      else {
        let lo = 0, hi = 86400 * 365 * 100;
        for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (v(m) < t) lo = m; else hi = m; }
        resultLabel = "Time to target (with growth)"; resultValue = fmtTime((lo + hi) / 2);
      }
    }
  } else if (mode === "cps") {
    const need = w > 0 ? (t - c) / w : 0;
    resultLabel = "CpS required"; resultValue = fmt(need) + " /s";
  } else {
    const r = g / 100 / 60;
    const final = r === 0 ? c + p * w : c + (p / r) * (Math.exp(r * w) - 1);
    resultLabel = "Projected after " + fmtTime(w); resultValue = fmt(final);
  }
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap gap-2 mb-5">
        {[["time","Time -> Target"],["cps","CpS Required"],["grow","Growth Forecast"]].map(([k,l]) => (
          <button key={k} onClick={() => setMode(k as string)}
            className={"px-3 py-1.5 text-sm rounded-full border " + (mode===k ? "bg-brand-600 text-white border-brand-600" : "bg-white text-ink-700 border-ink-300 hover:bg-ink-50")}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <NumField label="Current amount" value={current} onChange={setCurrent} />
        <NumField label="Production per second" value={cps} onChange={setCps} suffix="/s" />
        <NumField label="Growth rate (per minute)" value={growth} onChange={setGrowth} suffix="%" />
        {mode !== "grow" ? <NumField label="Target amount" value={target} onChange={setTarget} /> : <NumField label="Window (seconds)" value={win} onChange={setWin} />}
        {mode === "cps" && <NumField label="Within (seconds)" value={win} onChange={setWin} />}
      </div>
      <div className="mt-6 rounded-xl bg-brand-50 border border-brand-200 p-4">
        <div className="text-xs uppercase tracking-wide text-brand-700 font-semibold">{resultLabel}</div>
        <div className="mt-1 text-3xl font-extrabold text-ink-900">{resultValue}</div>
      </div>
      <p className="mt-3 text-xs text-ink-500">Estimates only. Real game economies have caps and multipliers.</p>
    </div>
  );
}
function NumField({label,value,onChange,suffix}:{label:string;value:string;onChange:(v:string)=>void;suffix?:string}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-ink-600 mb-1">{label}</span>
      <div className="flex rounded-lg border border-ink-300 bg-white focus-within:ring-2 focus-within:ring-brand-500">
        <input type="number" inputMode="decimal" value={value} onChange={(e)=>onChange(e.target.value)} className="flex-1 px-3 py-2 text-sm bg-transparent outline-none" />
        {suffix && <span className="px-3 py-2 text-sm text-ink-500 border-l border-ink-200 bg-ink-50 rounded-r-lg">{suffix}</span>}
      </div>
    </label>
  );
}

