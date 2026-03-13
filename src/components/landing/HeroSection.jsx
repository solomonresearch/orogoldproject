import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Vault, RefreshCw, TrendingUp } from "lucide-react";
import { GOLD, GOLD_LIGHT, LIME, DARK, MUTED } from "../../constants/colors.js";
import VGoldMark from "../shared/VGoldMark.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function HeroSection({ onNavigate }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} id="hero" style={{ position: "relative", overflow: "hidden", background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Subtle gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${LIME}08 0%, transparent 70%)`, pointerEvents: "none" }} />

      <motion.div style={{ y, position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, padding: isMobile ? "60px 20px" : "80px 40px" }}>
        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${LIME}12`, border: `1px solid ${LIME}25`, borderRadius: 24, padding: "6px 18px", marginBottom: 32 }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
          <span style={{ fontSize: 11, color: GOLD, fontWeight: 600, letterSpacing: 1.5 }}>LIVE · GOLD-BACKED DIGITAL ASSET</span>
        </motion.div>

        {/* Logo mark + wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 16 : 24, marginBottom: 8 }}
        >
          <VGoldMark size={isMobile ? 64 : 100} color={LIME} />
          <h1 style={{ fontSize: isMobile ? 64 : 100, fontWeight: 700, color: GOLD, fontFamily: "Georgia, serif", letterSpacing: 6, lineHeight: 1, margin: 0 }}>
            VGold
          </h1>
        </motion.div>

        {/* Main title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ fontSize: isMobile ? 22 : 32, color: DARK, fontWeight: 700, lineHeight: 1.3, margin: "20px auto 12px", maxWidth: 700, fontFamily: "Georgia, serif" }}
        >
          Monetising Gold Reserves
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ fontSize: isMobile ? 14 : 17, color: MUTED, lineHeight: 1.6, margin: "0 auto 40px", maxWidth: 650, fontWeight: 400 }}
        >
          The first gold-backed token combining 1:1 physical redemption with institutional-grade staking yields
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
            style={{ background: "transparent", color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: 8, padding: "16px 36px", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1.5, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
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
            { icon: Vault, text: "Top-Tier Physical Custody" },
            { icon: RefreshCw, text: "1:1 Physical Redemption" },
            { icon: TrendingUp, text: "Stake for Up to 15% Yield" },
          ].map((badge, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <badge.icon size={14} color={GOLD} strokeWidth={1.5} />
              <span style={{ fontSize: 10, color: MUTED, letterSpacing: 1.2, fontWeight: 500 }}>{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(transparent, #fff)", pointerEvents: "none" }} />
    </section>
  );
}
