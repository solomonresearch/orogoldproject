import { motion } from "framer-motion";
import { GOLD, DARK, MUTED, GREEN, BORDER } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

const milestones = [
  { phase: "Phase 1", title: "Foundation", items: ["Token architecture & legal structure", "JORC/43-101 reserve certification", "Anchor tranche (T1) launch"], status: "complete" },
  { phase: "Phase 2", title: "Growth", items: ["Institutional tranche (T2) open", "OROx1 Segregated Portfolio live", "Staking infrastructure deployed"], status: "active" },
  { phase: "Phase 3", title: "Expansion", items: ["Strategic (T3) & Accredited (T4) tranches", "Multi-mine portfolio diversification", "Secondary market listing"], status: "upcoming" },
  { phase: "Phase 4", title: "Scale", items: ["Public tranche (T5) launch", "Cross-chain bridge deployment", "Institutional API & custody integrations"], status: "upcoming" },
];

export default function MilestoneRoadmap() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="roadmap" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>ROADMAP</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 0" }}>
            Milestone Timeline
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 0, position: "relative" }}>
          {/* Connecting line */}
          {!isMobile && (
            <div style={{ position: "absolute", top: 20, left: "12.5%", right: "12.5%", height: 3, background: `${BORDER}`, zIndex: 0 }}>
              <div style={{ width: "37.5%", height: "100%", background: GREEN, borderRadius: 2 }} />
            </div>
          )}

          {milestones.map((m, i) => {
            const isComplete = m.status === "complete";
            const isActive = m.status === "active";
            const dotColor = isComplete ? GREEN : isActive ? GOLD : BORDER;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{ padding: isMobile ? "0 0 24px" : "0 16px", textAlign: "center", position: "relative", zIndex: 1 }}
              >
                {/* Dot */}
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: isActive ? `${GOLD}15` : "#fff", border: `3px solid ${dotColor}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", transition: "all 0.3s" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: dotColor }} />
                </div>

                <span style={{ fontSize: 10, color: dotColor, fontWeight: 700, letterSpacing: 1.5 }}>{m.phase}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: DARK, margin: "6px 0 10px" }}>{m.title}</h3>

                <div style={{ textAlign: "left", display: "inline-block" }}>
                  {m.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
                      <span style={{ color: dotColor, fontSize: 10, marginTop: 3 }}>{isComplete ? "✓" : "○"}</span>
                      <span style={{ fontSize: 12, color: isComplete ? MUTED : DARK, lineHeight: 1.4, textDecoration: isComplete ? "line-through" : "none" }}>{item}</span>
                    </div>
                  ))}
                </div>

                {isActive && (
                  <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 5, background: `${GOLD}12`, borderRadius: 12, padding: "3px 10px" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD }} />
                    <span style={{ fontSize: 9, color: GOLD, fontWeight: 600 }}>IN PROGRESS</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
