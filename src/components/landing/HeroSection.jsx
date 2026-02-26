import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Shield, Globe, CheckCircle } from "lucide-react";
import { GOLD, GOLD_LIGHT, MUTED } from "../../constants/colors.js";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function HeroSection({ onNavigate }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} id="hero" style={{ position: "relative", overflow: "hidden", background: "#0D0D0B", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Gold gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${GOLD}18 0%, transparent 70%)`, pointerEvents: "none" }} />

      <motion.div style={{ y, position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, padding: isMobile ? "60px 20px" : "80px 40px" }}>
        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${GOLD}15`, border: `1px solid ${GOLD}30`, borderRadius: 24, padding: "6px 18px", marginBottom: 32 }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
          <span style={{ fontSize: 11, color: GOLD, fontWeight: 600, letterSpacing: 1.5 }}>LIVE · AUSTRALIAN GOLD-BACKED DIGITAL ASSET</span>
        </motion.div>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <h1 style={{ fontSize: isMobile ? 72 : 120, fontWeight: 700, color: GOLD, fontFamily: "Georgia, serif", letterSpacing: 16, lineHeight: 1, margin: 0 }}>
            ORO<span style={{ fontSize: isMobile ? 36 : 52, color: "#fff", letterSpacing: 2, fontWeight: 400 }}>x1</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ fontSize: isMobile ? 18 : 24, color: "#B0B0A8", fontWeight: 300, lineHeight: 1.5, margin: "24px auto 8px", maxWidth: 700, fontFamily: "Georgia, serif" }}
        >
          1 Token = 1 Troy Ounce of Australian Gold
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ fontSize: isMobile ? 14 : 16, color: MUTED, lineHeight: 1.6, margin: "0 auto 40px", maxWidth: 600 }}
        >
          10,000,000 oz JORC-certified reserve. Stake into the V-Gold Segregated Portfolio for up to 15% annual yield. No staking = no yield.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}
        >
          <button
            onClick={() => onNavigate("dashboard")}
            style={{ background: GOLD, color: "#fff", border: "none", borderRadius: 8, padding: "16px 36px", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 8 }}
            onMouseEnter={e => e.currentTarget.style.background = GOLD_LIGHT}
            onMouseLeave={e => e.currentTarget.style.background = GOLD}
          >
            VIEW DASHBOARD <ArrowUpRight size={16} />
          </button>
          <a
            href="#tranches"
            style={{ background: "transparent", color: GOLD, border: `1px solid ${GOLD}50`, borderRadius: 8, padding: "16px 36px", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1.5, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
          >
            EXPLORE TRANCHES
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={{ display: "flex", gap: isMobile ? 16 : 32, justifyContent: "center", flexWrap: "wrap" }}
        >
          {[
            { icon: Shield, text: "JORC 2012 Certified" },
            { icon: Globe, text: "Australian Jurisdiction" },
            { icon: CheckCircle, text: "Cayman SP Structure" },
          ].map((badge, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <badge.icon size={14} color={GOLD} strokeWidth={1.5} />
              <span style={{ fontSize: 10, color: "#8A8A82", letterSpacing: 1.2, fontWeight: 500 }}>{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(transparent, #0D0D0B)", pointerEvents: "none" }} />
    </section>
  );
}
