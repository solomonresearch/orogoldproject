import { Shield, Globe, CheckCircle, Lock, ArrowLeft, BarChart3, Database } from "lucide-react";
import { GOLD, GOLD_LIGHT, LIME, DARK, MUTED, BORDER } from "./constants/colors.js";
import VGoldMark from "./components/shared/VGoldMark.jsx";

export default function ProofOfReserves({ onNavigate }) {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#fff", minHeight: "100vh", color: DARK }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <VGoldMark size={24} color={LIME} />
            <span style={{ fontSize: 20, fontWeight: 700, color: GOLD, letterSpacing: 3, fontFamily: "Georgia, serif" }}>VGold</span>
          </div>
          <button onClick={() => onNavigate("landing")} style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "6px 14px", fontSize: 11, fontWeight: 600, color: MUTED, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            <ArrowLeft size={12} /> Back to Home
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 32px 80px" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${LIME}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Database size={28} color={GOLD} />
          </div>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>TRANSPARENCY</span>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 16px", lineHeight: 1.2 }}>
            Proof of Reserves
          </h1>
          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
            Verifiable, audited proof that every VGOLD token is backed 1:1 by certified gold reserves in Tier 1 jurisdictions.
          </p>
        </div>

        {/* Coming Soon Card */}
        <div style={{ background: `${LIME}08`, border: `2px solid ${LIME}25`, borderRadius: 16, padding: "48px 40px", textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${LIME}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <BarChart3 size={22} color={GOLD} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", marginBottom: 12 }}>
            More Details Coming Soon
          </h2>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 24px" }}>
            We are finalising our on-chain proof of reserves system. This page will provide real-time, independently verified attestation of all gold reserves backing VGOLD tokens — including reserve locations, certification status, and audit history.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${LIME}15`, borderRadius: 20, padding: "6px 16px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: LIME }} />
            <span style={{ fontSize: 11, color: GOLD, fontWeight: 600, letterSpacing: 1 }}>IN DEVELOPMENT</span>
          </div>
        </div>

        {/* What to expect */}
        <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", marginBottom: 20 }}>What to Expect</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
          {[
            { icon: Shield, title: "Reserve Attestation", desc: "Quarterly independent audits verifying total gold reserves against outstanding VGOLD tokens." },
            { icon: Globe, title: "Jurisdiction Transparency", desc: "Breakdown of reserves by Tier 1 jurisdiction, including vault locations and custodian details." },
            { icon: CheckCircle, title: "JORC/43-101 Reports", desc: "Access to certified resource reports for all underlying mines and reserve assets." },
            { icon: Lock, title: "On-Chain Verification", desc: "Real-time on-chain data enabling independent verification of the 1:1 gold backing ratio." },
          ].map((item, i) => (
            <div key={i} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ background: `${LIME}15`, borderRadius: 6, padding: 6, display: "flex" }}>
                  <item.icon size={16} color={GOLD} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{item.title}</span>
              </div>
              <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ textAlign: "center", padding: "24px 0", borderTop: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: 13, color: MUTED, marginBottom: 8 }}>
            For enquiries about our reserve verification process, please contact us.
          </p>
          <a href="mailto:info@vgold.io" style={{ color: GOLD, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            info@vgold.io
          </a>
        </div>
      </div>
    </div>
  );
}
