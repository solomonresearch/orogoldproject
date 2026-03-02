import { motion } from "framer-motion";
import { Shield, Lock, Globe, CheckCircle } from "lucide-react";
import { GOLD, DARK, MUTED, BORDER } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

const cards = [
  { icon: Shield, title: "JORC/43-101 Certification", desc: "All underlying gold reserves are certified to JORC/43-101 international reporting standards, providing institutional-grade assurance of resource quality and quantity." },
  { icon: Lock, title: "Segregated Portfolio", desc: "OROx1 SP operates as a Segregated Portfolio, providing legal ring-fencing of assets. Each investor's position is isolated from other portfolio risks." },
  { icon: Globe, title: "Multi-Jurisdiction Custody", desc: "Physical gold is stored across accredited vaults in Tier 1 jurisdictions. Digital assets secured via institutional-grade multi-sig custody." },
  { icon: CheckCircle, title: "Independent Audit", desc: "Quarterly reserve attestations by independent auditors. On-chain proof of reserves published to ensure transparent, verifiable gold backing at all times." },
];

export default function CustodySecurity() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="custody" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#FAFAF8" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>CUSTODY & SECURITY</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 12px" }}>
            Institutional-Grade Protection
          </h2>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Rely on multi-layered security across legal, physical, and digital infrastructure.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 20 }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, transition: "box-shadow 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 20px ${GOLD}10`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ background: `${GOLD}12`, borderRadius: 8, padding: 8, display: "flex" }}>
                  <card.icon size={20} color={GOLD} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: 0 }}>{card.title}</h3>
              </div>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
