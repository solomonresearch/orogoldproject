import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GOLD, DARK, MUTED, BORDER } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

const faqs = [
  { q: "What is OROx1?", a: "OROx1 is a gold-backed digital asset where 1 token represents 1 troy ounce of gold. Tokens can be held for gold-price exposure or staked into the OROx1 Segregated Portfolio for yield." },
  { q: "How does staking yield work?", a: "When you stake OROx1 into the OROx1 SP portfolio, your tokens earn projected annual yield ranging from 1.2% to 15% depending on your chosen lock-up duration (6–36 months) and risk profile (Conservative to Aggressive). Yield comes from gold production contracts, qualified reserves, and structured leverage. If you do not stake, you earn zero yield." },
  { q: "What happens if I don't stake my tokens?", a: "Non-staked OROx1 tokens retain gold-price exposure and liquidity in your wallet, but earn absolutely zero yield. You must stake into the OROx1 SP portfolio to activate any returns." },
  { q: "What are the tranches?", a: "OROx1 is issued in 5 tranches (T1–T5) with different minimum investments ($10K–$1M), discounts (3–20%), and lock-up periods (3–18 months). Earlier tranches offer deeper discounts and longer lock-ups." },
  { q: "What is the OROx1 Segregated Portfolio?", a: "OROx1 SP is a Segregated Portfolio that holds a diversified pool of assets including physical gold (30–35%), production contracts (30–35%), qualified reserves (25–35%), liquid assets (15–20%), and structured leverage (up to 20%)." },
  { q: "Can I exit early?", a: "Yes, but early unstaking incurs a commission of 1–10% depending on your risk tier and remaining lock-up period. This protects long-term stakers and ensures portfolio stability." },
  { q: "How is the gold verified?", a: "All underlying reserves are JORC/43-101 certified. Physical gold is stored in accredited vaults in Tier 1 jurisdictions. Independent quarterly audits provide reserve attestation, with on-chain proof of reserves." },
  { q: "Who can invest?", a: "Eligibility varies by tranche: T1–T2 are for strategic and institutional investors, T3–T4 for mining entities and accredited/HNW individuals, and T5 for qualified public investors. All participants undergo KYC/AML verification." },
];

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState(null);
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="faq" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#FAFAF8" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>FAQ</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 0" }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "#fff", border: `1px solid ${openIdx === i ? GOLD + "40" : BORDER}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: "100%", background: "none", border: "none", padding: "16px 20px",
                  cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: openIdx === i ? GOLD : DARK }}>{faq.q}</span>
                <ChevronDown size={18} color={openIdx === i ? GOLD : MUTED} style={{ transform: openIdx === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0, marginLeft: 12 }} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 20px 16px" }}>
                      <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
