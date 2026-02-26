import { motion } from "framer-motion";
import { Coins, Lock, TrendingUp } from "lucide-react";
import { GOLD, DARK, MUTED, BORDER } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

const steps = [
  { icon: Coins, title: "Acquire OROx1", desc: "Purchase tokens during an open tranche. Each token represents 1 troy oz of JORC-certified Australian gold." },
  { icon: Lock, title: "Stake into V-Gold", desc: "Lock your tokens into the V-Gold Segregated Portfolio. Choose duration (6–36 months) and risk profile for yields from 1.2% to 15%." },
  { icon: TrendingUp, title: "Earn Yield", desc: "Your staked tokens earn projected annual yield from gold production contracts, reserves, and structured leverage. No staking = no yield." },
];

export default function HowItWorks() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="how-it-works" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#FAFAF8" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>HOW IT WORKS</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 0" }}>
            Three Steps to Gold-Backed Yield
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 24, position: "relative" }}>
          {/* Connecting line */}
          {!isMobile && (
            <div style={{ position: "absolute", top: 52, left: "20%", right: "20%", height: 2, background: `${GOLD}25`, zIndex: 0 }} />
          )}
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "32px 24px", textAlign: "center", position: "relative", zIndex: 1 }}
            >
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${GOLD}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", border: `2px solid ${GOLD}30` }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: GOLD, fontFamily: "Georgia, serif" }}>{i + 1}</span>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${GOLD}10`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <step.icon size={18} color={GOLD} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: DARK, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
