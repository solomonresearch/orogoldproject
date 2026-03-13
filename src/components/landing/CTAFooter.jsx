import { ArrowUpRight, Mail } from "lucide-react";
import { GOLD, GOLD_LIGHT, LIME, DARK, MUTED, BORDER } from "../../constants/colors.js";
import VGoldMark from "../shared/VGoldMark.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function CTAFooter({ onNavigate }) {
  const isMobile = useIsMobile();

  return (
    <section id="contact" style={{ background: "#fff", borderTop: `1px solid ${BORDER}`, padding: isMobile ? "60px 20px" : "80px 40px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
          <VGoldMark size={32} color={LIME} />
          <span style={{ fontSize: 32, fontWeight: 700, color: GOLD, letterSpacing: 4, fontFamily: "Georgia, serif" }}>VGold</span>
        </div>

        <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "0 0 12px", lineHeight: 1.2 }}>
          Ready to Invest in Gold-Backed Digital Assets?
        </h2>
        <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6, marginBottom: 32 }}>
          Explore the dashboard to view live tranche data, configure your staking parameters, and model your projected yield. No staking, no yield — your returns start when you stake.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          <button
            onClick={() => onNavigate("dashboard")}
            style={{ background: GOLD, color: "#fff", border: "none", borderRadius: 8, padding: "16px 36px", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 8 }}
            onMouseEnter={e => e.currentTarget.style.background = GOLD_LIGHT}
            onMouseLeave={e => e.currentTarget.style.background = GOLD}
          >
            OPEN DASHBOARD <ArrowUpRight size={16} />
          </button>
          <a href="#tranches" style={{ color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: 8, padding: "16px 36px", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            VIEW TRANCHES
          </a>
        </div>

        {/* Contact CTA */}
        <div style={{ marginBottom: 48 }}>
          <a href="mailto:info@vgold.io" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: GOLD, fontSize: 15, fontWeight: 600, textDecoration: "none", letterSpacing: 0.5 }}>
            <Mail size={16} color={GOLD} />
            Contact us on info@vgold.io
          </a>
        </div>

        {/* Legal */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24 }}>
          <div style={{ fontSize: 10, color: MUTED, lineHeight: 1.8, marginBottom: 12 }}>
            CONFIDENTIAL · FOR QUALIFIED INVESTORS ONLY · VGOLD Segregated Portfolio
          </div>
          <div style={{ fontSize: 10, color: "#999", lineHeight: 1.8 }}>
            This material does not constitute an offer to sell or a solicitation of an offer to buy any securities. VGOLD tokens are offered only to qualified investors under applicable exemptions. Past performance is not indicative of future results. Projected yields are targets and are not guaranteed. Staking is required to earn yield — non-staked tokens earn zero returns. All information is subject to change without notice.
          </div>
          <div style={{ fontSize: 10, color: MUTED, marginTop: 16 }}>
            VGold Gold-Backed Digital Asset © 2026. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
}
