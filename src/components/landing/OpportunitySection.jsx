import { AlertTriangle, CheckCircle } from "lucide-react";
import { GOLD, DARK, MUTED, RED, GREEN } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function OpportunitySection() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="opportunity" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>THE OPPORTUNITY</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 12px" }}>
            Why Gold Needs a Digital Layer
          </h2>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Traditional gold investment is fragmented, illiquid, and locked behind high minimums. OROx1 solves this.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
          {/* Problem */}
          <div style={{ background: `${RED}06`, border: `1px solid ${RED}15`, borderRadius: 14, padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <AlertTriangle size={18} color={RED} />
              <span style={{ fontSize: 13, fontWeight: 700, color: RED, letterSpacing: 1 }}>THE PROBLEM</span>
            </div>
            {[
              "Gold ETFs charge 0.4–0.75% annual fees with no yield",
              "Physical bullion requires storage, insurance, and verification",
              "Mining equities carry operational risk without direct gold exposure",
              "Minimum investments of $500K+ for institutional gold products",
              "No transparent on-chain proof of reserves",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <span style={{ color: RED, fontSize: 14, lineHeight: 1.6 }}>×</span>
                <span style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Solution */}
          <div style={{ background: `${GREEN}06`, border: `1px solid ${GREEN}15`, borderRadius: 14, padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <CheckCircle size={18} color={GREEN} />
              <span style={{ fontSize: 13, fontWeight: 700, color: GREEN, letterSpacing: 1 }}>THE OROx1 SOLUTION</span>
            </div>
            {[
              "1 token = 1 troy oz backed by Tier I certified reserves",
              "Stake to earn up to 15% annual yield via OROx1 SP",
              "No yield without staking — you choose your participation",
              "Entry from $10,000 (Public tranche) to $1M (Anchor)",
              "On-chain transparency with Segregated Portfolio structure",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <CheckCircle size={13} color={GREEN} style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
