import { useMemo, useState } from "react";

export default function PrestigeCalculator() {
  const [current, setCurrent] = useState("1000000");
  const [cps, setCps] = useState("100");
  const [prestigeBonus, setPrestigeBonus] = useState("0");
  const [hoursToCheck, setHoursToCheck] = useState("24");

  const c = parseFloat(current.replace(/,/g, "")) || 0;
  const p = parseFloat(cps) || 0;
  const b = parseFloat(prestigeBonus) / 100 || 0;
  const h = parseFloat(hoursToCheck) || 1;
  const checkSec = h * 3600;

  const result = useMemo(() => {
    if (p <= 0) return null;
    const noPrestige = c + p * checkSec;
    const withPrestigeNow = (c + p * checkSec) * (1 + b);
    const withPrestigeAt = (c * 1.0) * (1 + b) + p * checkSec;
    const hoursSaved = noPrestige > 0 ? Math.log(withPrestigeNow / noPrestige) / Math.log(1.0001) : 0;
    const worth = withPrestigeAt > noPrestige;
    return {
      noPrestige,
      withPrestigeNow,
      withPrestigeAt,
      hoursSaved,
      worth,
    };
  }, [c, p, b, h]);

  const fmt = (n: number) => {
    if (!isFinite(n) || isNaN(n)) return "—";
    if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
    return n.toFixed(2);
  };

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="block text-xs font-semibold text-ink-600 mb-1">Current resources (in bank)</span>
          <input
            type="text"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-ink-600 mb-1">Production per second</span>
          <input
            type="text"
            value={cps}
            onChange={(e) => setCps(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-ink-600 mb-1">Prestige bonus % (after reset)</span>
          <input
            type="text"
            value={prestigeBonus}
            onChange={(e) => setPrestigeBonus(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-ink-600 mb-1">Time horizon (hours)</span>
          <input
            type="text"
            value={hoursToCheck}
            onChange={(e) => setHoursToCheck(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </label>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="rounded-xl bg-ink-50 border border-ink-200 p-4">
            <div className="text-xs uppercase tracking-wide text-ink-500 font-semibold">
              No prestige (keep current run)
            </div>
            <div className="text-2xl font-bold text-ink-900">{fmt(result.noPrestige)}</div>
            <div className="text-xs text-ink-500">after {hoursToCheck} hours of production</div>
          </div>
          <div className="rounded-xl bg-brand-50 border border-brand-200 p-4">
            <div className="text-xs uppercase tracking-wide text-brand-700 font-semibold">
              Prestige now + replay
            </div>
            <div className="text-2xl font-bold text-ink-900">{fmt(result.withPrestigeNow)}</div>
            <div className="text-xs text-brand-700">
              {result.worth
                ? "Prestiging now is worth it. You come out ahead over the time horizon."
                : "Not worth it yet. Keep playing this run a bit longer."}
            </div>
          </div>
          <div className="rounded-xl bg-ink-50 border border-ink-200 p-4 text-sm text-ink-700">
            <strong>How to read this:</strong> if the prestige-now value is higher than the no-prestige value, you should reset. If not, wait. This calculator assumes your prestige bonus is exactly the value you entered — actual game formulas may differ slightly, so treat this as a guide, not a rule.
          </div>
        </div>
      )}
    </div>
  );
}
