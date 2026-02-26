import { ArrowUpRight, Gem } from "lucide-react";
import { GOLD, GOLD_LIGHT, MUTED } from "../../constants/colors.js";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function CTAFooter({ onNavigate }) {
  const isMobile = useIsMobile();

  return (
    <section id="contact" style={{ background: "#0D0D0B", padding: isMobile ? "60px 20px" : "80px 40px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}>
          <Gem size={28} color={GOLD} strokeWidth={1.5} />
          <span style={{ fontSize: 32, fontWeight: 700, color: GOLD, letterSpacing: 6, fontFamily: "Georgia, serif" }}>ORO</span>
          <span style={{ fontSize: 16, color: "#fff", fontWeight: 400 }}>x1</span>
        </div>

        <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", margin: "0 0 12px", lineHeight: 1.2 }}>
          Ready to Invest in Gold-Backed Digital Assets?
        </h2>
        <p style={{ fontSize: 15, color: "#8A8A82", lineHeight: 1.6, marginBottom: 32 }}>
          Explore the dashboard to view live tranche data, configure staking parameters, and model your projected yield. No staking, no yield — your returns start when you stake.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          <button
            onClick={() => onNavigate("dashboard")}
            style={{ background: GOLD, color: "#fff", border: "none", borderRadius: 8, padding: "16px 36px", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 8 }}
            onMouseEnter={e => e.currentTarget.style.background = GOLD_LIGHT}
            onMouseLeave={e => e.currentTarget.style.background = GOLD}
          >
            OPEN DASHBOARD <ArrowUpRight size={16} />
          </button>
          <a href="#tranches" style={{ color: GOLD, border: `1px solid ${GOLD}50`, borderRadius: 8, padding: "16px 36px", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            VIEW TRANCHES
          </a>
        </div>

        {/* Legal */}
        <div style={{ borderTop: `1px solid #2A2A28`, paddingTop: 24 }}>
          <div style={{ fontSize: 10, color: "#555", lineHeight: 1.8, marginBottom: 12 }}>
            CONFIDENTIAL · FOR QUALIFIED INVESTORS ONLY · OROx1 Segregated Portfolio
          </div>
          <div style={{ fontSize: 10, color: "#444", lineHeight: 1.8 }}>
            This material does not constitute an offer to sell or a solicitation of an offer to buy any securities. OROx1 tokens are offered only to qualified investors under applicable exemptions. Past performance is not indicative of future results. Projected yields are targets and are not guaranteed. Staking is required to earn yield — non-staked tokens earn zero returns.
          </div>
          <div style={{ fontSize: 10, color: "#555", marginTop: 16 }}>
            OROx1 Gold-Backed Digital Asset © 2026. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
}
