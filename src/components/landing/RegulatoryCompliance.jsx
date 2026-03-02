import { motion } from "framer-motion";
import { Shield, Globe, CheckCircle, Lock } from "lucide-react";
import { GOLD, DARK, MUTED, BORDER } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

const badges = [
  { icon: Shield, label: "JORC/43-101", sub: "Reserve Certification" },
  { icon: Globe, label: "Segregated Portfolio", sub: "Ring-Fenced Structure" },
  { icon: CheckCircle, label: "Accredited Vaults", sub: "Tier 1 Custody" },
  { icon: Lock, label: "KYC / AML", sub: "Compliance Framework" },
  { icon: Shield, label: "Tier I Certified", sub: "International Standard" },
  { icon: CheckCircle, label: "Quarterly Audit", sub: "Independent Attestation" },
];

export default function RegulatoryCompliance() {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="compliance" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>REGULATORY FRAMEWORK</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 12px" }}>
            Compliance & Standards
          </h2>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Built on internationally recognised certification and compliance frameworks.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(6, 1fr)", gap: 14 }}>
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              style={{ background: "#FAFAF8", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 14px", textAlign: "center", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
              onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
            >
              <div style={{ background: `${GOLD}10`, borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                <badge.icon size={18} color={GOLD} strokeWidth={1.5} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: DARK, marginBottom: 2 }}>{badge.label}</div>
              <div style={{ fontSize: 10, color: MUTED }}>{badge.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
