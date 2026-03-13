import { Layers, Coins, Package, Briefcase, TrendingUp } from "lucide-react";
import { GOLD, LIME, DARK, MUTED, BORDER } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function MetricsStrip() {
  const isMobile = useIsMobile();

  const kpis = [
    { label: "Total Reserve", value: "TBD", icon: Layers, sub: "TBD" },
    { label: "Allocated", value: "TBD", icon: Coins, sub: "TBD" },
    { label: "Open Tranches", value: "TBD", icon: Package, sub: "TBD" },
    { label: "Staking Vehicle", value: "TBD", icon: Briefcase, sub: "TBD" },
    { label: "Max Annual Yield", value: "TBD", icon: TrendingUp, sub: "TBD" },
  ];

  return (
    <SectionWrapper id="metrics" style={{ background: "#FAFAF5", padding: isMobile ? "40px 20px" : "50px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 14 }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "18px 20px", transition: "box-shadow 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 20px ${GOLD}12`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ background: `${LIME}20`, borderRadius: 6, padding: 6, display: "flex" }}>
                <kpi.icon size={15} color={GOLD} strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase" }}>{kpi.label}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", marginBottom: 3 }}>{kpi.value}</div>
            <div style={{ fontSize: 10, color: MUTED }}>{kpi.sub}</div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
