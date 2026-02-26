import Tip from "./Tip.jsx";
import { GOLD, MUTED, DARK } from "../../constants/colors.js";

const segments = [
  { key: "physicalGold", label: "Physical & Digital Gold", color: GOLD, sub: "Bullion vaults + OROx tokens" },
  { key: "productionContracts", label: "Secured Production Contracts", color: "#2E8B57", sub: "Doré & refined gold · $750–$2,000/oz · up to 15yrs" },
  { key: "qualifiedReserves", label: "Qualified Reserves", color: "#5B6ABF", sub: "JORC/43-101 certified" },
  { key: "liquidity", label: "Liquid Assets (USD / USDC)", color: "#4A90D9", sub: "Liquidity buffer + mine capex funding" },
  { key: "leverage", label: "3rd Party Debt Leverage", color: "#8B5E3C", sub: "Secured against gold, plant, machinery, equity" },
];

export default function PortfolioBar({ alloc }) {
  const active = segments.filter(s => alloc[s.key] > 0);
  const total = active.reduce((a, s) => a + alloc[s.key], 0);

  return (
    <div>
      <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
        {active.map(s => (
          <Tip key={s.key} text={`${s.label}: ${alloc[s.key]}% — ${s.sub}`}>
            <div style={{ width: `${(alloc[s.key] / total) * 100}%`, height: "100%", background: s.color, transition: "width 0.4s ease", cursor: "help", minWidth: 4 }} />
          </Tip>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {active.map(s => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
            <span style={{ fontSize: 9.5, color: MUTED }}>{s.label.split("(")[0].trim()}</span>
            <span style={{ fontSize: 9.5, fontWeight: 700, color: DARK }}>{alloc[s.key]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
