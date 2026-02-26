import { Briefcase } from "lucide-react";
import { GOLD, DARK, MUTED, BORDER } from "../../constants/colors.js";
import { portfolioAllocations } from "../../constants/data.js";
import PortfolioBar from "../shared/PortfolioBar.jsx";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

const buckets = [
  { pct: "30–35%", label: "Physical & Digital Gold", sub: "LBMA bullion + OROx tokens in vaulted custody", color: GOLD },
  { pct: "30–35%", label: "Production Contracts", sub: "Doré & refined gold at $750–$2,000/oz · up to 15yr terms", color: "#2E8B57" },
  { pct: "25–35%", label: "Qualified Reserves", sub: "NI 43-101 & JORC certified mine resources", color: "#5B6ABF" },
  { pct: "15–20%", label: "Liquid Assets", sub: "USD/USDC buffer for mine capex funding", color: "#4A90D9" },
  { pct: "Up to 20%", label: "Structured Leverage", sub: "3rd party debt secured against gold, plant, machinery", color: "#8B5E3C" },
];

export default function PortfolioComposition() {
  const isMobile = useIsMobile();
  const alloc = portfolioAllocations[2]; // Balanced as default display

  return (
    <SectionWrapper id="portfolio" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>V-GOLD PORTFOLIO</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 12px" }}>
            Diversified Gold-Backed Portfolio
          </h2>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            The V-Gold Segregated Portfolio holds a globally balanced mix of physical gold, production contracts, and reserves.
          </p>
        </div>

        {/* Bar */}
        <div style={{ background: "#FAFAF8", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Briefcase size={16} color={GOLD} />
            <span style={{ fontSize: 12, fontWeight: 700, color: DARK, letterSpacing: 0.5 }}>BALANCED ALLOCATION (DEFAULT)</span>
          </div>
          <PortfolioBar alloc={alloc} />
        </div>

        {/* Bucket cards */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)", gap: 14 }}>
          {buckets.map((b, i) => (
            <div key={i} style={{ borderLeft: `3px solid ${b.color}`, background: "#FAFAF8", borderRadius: 8, padding: "16px 14px" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: b.color, fontFamily: "Georgia, serif", marginBottom: 4 }}>{b.pct}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 4 }}>{b.label}</div>
              <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.5 }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
