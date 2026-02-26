import { motion } from "framer-motion";
import { Gem, Briefcase, ArrowUpRight } from "lucide-react";
import { GOLD, GOLD_LIGHT, DARK, MUTED, BORDER } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function ForMiners() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="for-miners" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#FAFAF8" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>DUAL AUDIENCE</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 0" }}>
            Built for Investors & Miners
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
          {[
            {
              icon: Briefcase,
              title: "For Investors",
              sub: "Access institutional gold-backed digital assets",
              points: [
                "Gold-price exposure + staking yield (up to 15%)",
                "5 tranches from $10K to $1M minimum",
                "JORC/43-101 certified, legally segregated assets",
                "Transparent on-chain reserve attestation",
                "No yield without staking — you choose",
              ],
              cta: "EXPLORE TRANCHES",
              href: "#tranches",
            },
            {
              icon: Gem,
              title: "For Mining Operations",
              sub: "Unlock capital from proven reserves",
              points: [
                "Monetize JORC/43-101 certified reserves",
                "Access forward gold sale agreements",
                "Non-dilutive funding for capex and expansion",
                "Global portfolio across Tier 1 jurisdictions",
                "Structured leverage against gold and plant assets",
              ],
              cta: "PARTNER WITH US",
              href: "#contact",
            },
          ].map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: 28 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ background: `${GOLD}12`, borderRadius: 8, padding: 8, display: "flex" }}>
                  <col.icon size={20} color={GOLD} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, margin: 0 }}>{col.title}</h3>
              </div>
              <p style={{ fontSize: 13, color: MUTED, marginBottom: 18 }}>{col.sub}</p>

              {col.points.map((p, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <span style={{ color: GOLD, fontSize: 11, marginTop: 2 }}>●</span>
                  <span style={{ fontSize: 13, color: DARK, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}

              <a href={col.href} style={{
                display: "inline-flex", alignItems: "center", gap: 6, background: GOLD, color: "#fff",
                border: "none", borderRadius: 6, padding: "11px 24px", fontSize: 11, fontWeight: 700,
                cursor: "pointer", letterSpacing: 1, marginTop: 12, textDecoration: "none",
              }}
                onMouseEnter={e => e.currentTarget.style.background = GOLD_LIGHT}
                onMouseLeave={e => e.currentTarget.style.background = GOLD}
              >
                {col.cta} <ArrowUpRight size={13} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
