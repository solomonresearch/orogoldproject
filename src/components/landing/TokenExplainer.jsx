import { motion } from "framer-motion";
import { Coins, TrendingUp, ArrowRight } from "lucide-react";
import { GOLD, LIME, DARK, MUTED, BORDER } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function TokenExplainer() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="token" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>THE VGOLD TOKEN</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 12px" }}>
            1 Token = 1 Troy Ounce of Gold
          </h2>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 650, margin: "0 auto", lineHeight: 1.6 }}>
            Each VGOLD token is backed 1:1 by a troy ounce of JORC/43-101 certified gold reserves. Hold it for pure gold exposure, or stake it to earn yield — the choice is yours.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr", gap: isMobile ? 24 : 0, alignItems: "center", maxWidth: 900, margin: "0 auto" }}>
          {/* Step 1: Hold */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: 28, textAlign: "center" }}
          >
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${LIME}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Coins size={24} color={GOLD} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 8, fontFamily: "Georgia, serif" }}>Hold VGOLD</h3>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 12 }}>
              Your token tracks the gold price 1:1. Each VGOLD is redeemable for one troy ounce of physical gold. Pure, transparent, gold-price exposure.
            </p>
            <div style={{ background: `${LIME}10`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>YIELD</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: MUTED, fontFamily: "Georgia, serif" }}>0%</div>
              <div style={{ fontSize: 10, color: MUTED }}>Gold-price exposure only</div>
            </div>
          </motion.div>

          {/* Arrow */}
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 24px" }}>
              <ArrowRight size={24} color={LIME} />
              <span style={{ fontSize: 10, color: MUTED, fontWeight: 600, letterSpacing: 1 }}>STAKE</span>
            </div>
          )}
          {isMobile && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ transform: "rotate(90deg)" }}><ArrowRight size={24} color={LIME} /></div>
            </div>
          )}

          {/* Step 2: Stake */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ background: "#fff", border: `2px solid ${GOLD}25`, borderRadius: 14, padding: 28, textAlign: "center" }}
          >
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${LIME}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", border: `2px solid ${LIME}40` }}>
              <TrendingUp size={24} color={GOLD} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 8, fontFamily: "Georgia, serif" }}>Stake VGOLD</h3>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, marginBottom: 12 }}>
              Lock your tokens into the VGOLD Segregated Portfolio. Your gold continues to back your position whilst earning projected yield from production contracts and reserves.
            </p>
            <div style={{ background: `${GOLD}08`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>PROJECTED YIELD</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: GOLD, fontFamily: "Georgia, serif" }}>Up to 15%</div>
              <div style={{ fontSize: 10, color: MUTED }}>Annual · duration & risk dependent</div>
            </div>
          </motion.div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p style={{ fontSize: 12, color: MUTED, fontStyle: "italic" }}>
            No staking, no yield. Your tokens retain full gold-price exposure whether staked or unstaked.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
