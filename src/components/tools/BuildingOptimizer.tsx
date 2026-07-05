import { useMemo, useState } from "react";

interface Building {
  name: string;
  baseCost: number;
  baseCps: number;
  growth: number;
}

const BUILDINGS: Building[] = [
  { name: "Cursor", baseCost: 15, baseCps: 0.1, growth: 1.15 },
  { name: "Grandma", baseCost: 100, baseCps: 1, growth: 1.15 },
  { name: "Farm", baseCost: 1100, baseCps: 8, growth: 1.15 },
  { name: "Mine", baseCost: 12000, baseCps: 47, growth: 1.15 },
  { name: "Factory", baseCost: 130000, baseCps: 260, growth: 1.15 },
  { name: "Bank", baseCost: 1400000, baseCps: 1400, growth: 1.15 },
  { name: "Temple", baseCost: 20000000, baseCps: 7800, growth: 1.15 },
  { name: "Wizard Tower", baseCost: 330000000, baseCps: 44000, growth: 1.15 },
];

function costAt(base: number, growth: number, owned: number) {
  return Math.ceil(base * Math.pow(growth, owned));
}

export default function BuildingOptimizer() {
  const [cookies, setCookies] = useState("1000000");
  const [owned, setOwned] = useState("10,10,5,2,1,0,0,0");
  const cookiesNum = parseFloat(cookies.replace(/,/g, "")) || 0;
  const ownedList = owned.split(",").map((s) => parseInt(s.trim()) || 0);

  const ranked = useMemo(() => {
    return BUILDINGS.map((b, i) => {
      const count = ownedList[i] ?? 0;
      const nextCost = costAt(b.baseCost, b.growth, count);
      const cps = b.baseCps * (count + 1);
      const costPerCps = nextCost / Math.max(cps, 0.001);
      return { ...b, count, nextCost, cps, costPerCps };
    }).sort((a, b) => a.costPerCps - b.costPerCps);
  }, [owned]);

  const affordable = ranked.filter((b) => b.nextCost <= cookiesNum);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="block text-xs font-semibold text-ink-600 mb-1">Current cookies (in bank)</span>
          <input
            type="text"
            value={cookies}
            onChange={(e) => setCookies(e.target.value)}
            placeholder="1000000"
            className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-ink-600 mb-1">
            Buildings owned (Cursor, Grandma, Farm, Mine, Factory, Bank, Temple, Wizard)
          </span>
          <input
            type="text"
            value={owned}
            onChange={(e) => setOwned(e.target.value)}
            placeholder="10,10,5,2,1,0,0,0"
            className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none font-mono"
          />
        </label>
      </div>

      {affordable.length > 0 && (
        <div className="mb-4 rounded-xl bg-brand-50 border border-brand-200 p-4">
          <div className="text-xs uppercase tracking-wide text-brand-700 font-semibold">
            Best next purchase
          </div>
          <div className="mt-1 text-2xl font-extrabold text-ink-900">
            {affordable[0].name}
          </div>
          <div className="text-sm text-ink-700">
            Cost: {affordable[0].nextCost.toLocaleString()} cookies. Adds {affordable[0].cps.toFixed(2)} CpS. Best cost-per-CpS ratio in your current state.
          </div>
        </div>
      )}

      {affordable.length === 0 && (
        <div className="mb-4 rounded-xl bg-ink-50 border border-ink-200 p-4 text-sm text-ink-600">
          You cannot afford any building right now. Wait for more cookies, then refresh the recommendation.
        </div>
      )}

      <div className="text-xs uppercase tracking-wide text-ink-500 font-semibold mb-2">
        All buildings ranked by cost-efficiency
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink-500">
              <th className="py-1 pr-3">Building</th>
              <th className="py-1 pr-3">Owned</th>
              <th className="py-1 pr-3">Next cost</th>
              <th className="py-1 pr-3">CpS after</th>
              <th className="py-1 pr-3">Cost per CpS</th>
              <th className="py-1 pr-3">Buy?</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((b) => {
              const canAfford = b.nextCost <= cookiesNum;
              const isBest = canAfford && b.name === affordable[0]?.name;
              return (
                <tr key={b.name} className={isBest ? "bg-brand-50" : ""}>
                  <td className="py-1 pr-3 font-semibold">{b.name}</td>
                  <td className="py-1 pr-3">{b.count}</td>
                  <td className="py-1 pr-3 font-mono text-xs">{b.nextCost.toLocaleString()}</td>
                  <td className="py-1 pr-3 font-mono text-xs">{b.cps.toFixed(2)}</td>
                  <td className="py-1 pr-3 font-mono text-xs">{Math.round(b.costPerCps).toLocaleString()}</td>
                  <td className="py-1 pr-3">
                    {canAfford ? (
                      <span className={isBest ? "text-brand-700 font-bold" : "text-green-700"}>
                        {isBest ? "Best" : "Afford"}
                      </span>
                    ) : (
                      <span className="text-ink-400">No</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink-500">
        Cost per CpS is the standard Cookie Clicker optimization metric. Lower is better. The cheapest cost-per-CpS building is always the optimal next buy, given infinite patience.
      </p>
    </div>
  );
}
