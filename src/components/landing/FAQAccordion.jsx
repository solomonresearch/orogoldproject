import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GOLD, LIME, DARK, MUTED, BORDER } from "../../constants/colors.js";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

const faqs = [
  { q: "What is VGOLD?", a: "VGOLD is a gold-backed digital asset where 1 token represents 1 troy ounce of gold, backed by 10,000,000 oz of JORC/43-101 certified reserves in Tier 1 jurisdictions. Tokens can be held for gold-price exposure or staked into the VGOLD Segregated Portfolio for yield of up to 15% per annum." },
  { q: "How can the token offer a 15% IRR?", a: "The staked token funds are invested into the entire gold ecosystem. Based on agreed portfolio risk management allocations, proceeds are allocated to gold bullion, in-ground and above-ground (tailings) production gold mines, accredited reserve (NI 43-101 and JORC) mines, late-stage exploration development sites, and some secured (20%+ IRR) capex lending for heavy plant and mining machinery." },
  { q: "High return normally means high risk?", a: "More than 70% of the portfolio is focused towards Tier 1 jurisdictions (e.g. North America, Australia, and government-backed mining sites) and Tier 1 of the ecosystem (e.g. physical gold bullion in vaults, active gold mines where we have negotiated a forward purchase of gold at a discount of more than 60% to the current gold price, or where we have provided secured equity-backed lending at an IRR greater than 15%)." },
  { q: "How can you charge such a high cost of capital or debt?", a: "Finding and developing viable gold mines has always been a risky proposition, going back hundreds of years, and has mainly been undertaken by private capital. Bank capital for the mining sector largely dried up after the 2007 financial crisis, when risk-weighted assets for banks tripled to reflect the underlying risk. The market for debt and equity in this sector, even in Tier 1 jurisdictions, has migrated to reflect this, with debt returns trading above 12% and equity requiring an IRR greater than 25%." },
  { q: "Why launch this token now?", a: "Most gold mining sites have been unviable for many years as the cost of ownership and environmentally sustainable extraction has been too close to the price of bullion (refined gold doré). Even less than a year ago, gold only crossed $3,000/oz in March 2025 for the first time. This has led to a rush of mine owners and producers reviving their sites and operations on the core premise that they can extract gold for between $750 and $1,500/oz, and adding in the cost of security, transportation and refining — now leaves them with a 50% to 80% net margin. This is appealing to private capital." },
  { q: "What investor protections are in place?", a: "There are stringent controls, checks and balances in place across the entire ecosystem. Mine owners and exploration companies must provide comprehensive proof of ownership, production capacity, capability, and third-party verification of production or reserves — all subject to rigorous independent assessment. Physical gold is managed by trusted security firms in transit and held in accredited (LBMA) vaults with daily auditing. Every part of the tokenomics lifecycle is verifiable and available to view on the token website in real time, or accessible via API." },
  { q: "How does staking yield work?", a: "When you stake VGOLD into the VGOLD SP portfolio, your tokens earn projected annual yield ranging from 1.2% to 15% depending on your chosen lock-up duration (6–36 months) and risk profile (Conservative to Aggressive). Yield is generated from gold production contracts, qualified reserves, and structured leverage. If you do not stake, you earn zero yield." },
  { q: "Who can invest?", a: "Eligibility varies by tranche: T1–T2 are for strategic and institutional investors, T3–T4 for mining entities and accredited/HNW individuals, and T5 for qualified public investors. All participants undergo KYC/AML verification." },
];

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState(null);
  const isMobile = useIsMobile();

  return (
    <SectionWrapper id="faq" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#FAFAF5" }}>
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
