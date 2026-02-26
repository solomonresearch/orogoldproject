import { Layers, Coins, Package, Briefcase, TrendingUp } from "lucide-react";
import { GOLD, DARK, MUTED, BORDER } from "../../constants/colors.js";
import { tranches } from "../../constants/data.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import CountUp from "../shared/CountUp.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function MetricsStrip() {
  const isMobile = useIsMobile();
  const totalReserved = tranches.reduce((a, b) => a + b.reserved, 0);
  const pctDeployed = (totalReserved / 10000000) * 100;
  const openTranches = tranches.filter(i => i.status === "Open").length;

  const kpis = [
    { label: "Total Reserve", value: <CountUp end={10} suffix="M oz" decimals={0} />, icon: Layers, sub: "JORC 2012 Certified" },
    { label: "Allocated", value: <><CountUp end={pctDeployed} suffix="%" decimals={1} /> committed</>, icon: Coins, sub: `${totalReserved.toLocaleString()} oz reserved` },
    { label: "Open Tranches", value: <><CountUp end={openTranches} decimals={0} /> of 5</>, icon: Package, sub: "T1 Anchor + T2 Institutional" },
    { label: "Staking Vehicle", value: "V-Gold SP", icon: Briefcase, sub: "Cayman Segregated Portfolio" },
    { label: "Max Annual Yield", value: <CountUp end={15} suffix="%" decimals={0} />, icon: TrendingUp, sub: "Via V-Gold staking" },
  ];

  return (
    <SectionWrapper id="metrics" style={{ background: "#FAFAF8", padding: isMobile ? "40px 20px" : "50px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 14 }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "18px 20px", transition: "box-shadow 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 20px ${GOLD}12`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ background: `${GOLD}12`, borderRadius: 6, padding: 6, display: "flex" }}>
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
