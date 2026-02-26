import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, ArrowUpRight } from "lucide-react";
import { GOLD, GOLD_LIGHT, DARK, MUTED, BORDER } from "../../constants/colors.js";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Tranches", href: "#tranches" },
  { label: "Staking", href: "#staking" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

export default function StickyNav({ onNavigate }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            background: "rgba(255,255,255,0.97)", borderBottom: `1px solid ${BORDER}`,
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Gem size={20} color={GOLD} strokeWidth={1.5} />
              <a href="#hero" style={{ fontSize: 18, fontWeight: 700, color: GOLD, letterSpacing: 3, fontFamily: "Georgia, serif", textDecoration: "none" }}>ORO</a>
              <span style={{ fontSize: 11, fontWeight: 600, color: DARK }}>x1</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {navLinks.map((link, i) => (
                <a key={i} href={link.href} style={{ fontSize: 11, fontWeight: 500, color: MUTED, textDecoration: "none", padding: "6px 10px", borderRadius: 4, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = MUTED}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => onNavigate("dashboard")}
              style={{ background: GOLD, color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, letterSpacing: 0.5 }}
              onMouseEnter={e => e.currentTarget.style.background = GOLD_LIGHT}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >
              DASHBOARD <ArrowUpRight size={12} />
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
