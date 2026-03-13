import { Info } from "lucide-react";
import { GOLD, LIME, DARK, MUTED, BORDER } from "./constants/colors.js";
import HeroSection from "./components/landing/HeroSection.jsx";
import MetricsStrip from "./components/landing/MetricsStrip.jsx";
import TokenExplainer from "./components/landing/TokenExplainer.jsx";
import OpportunitySection from "./components/landing/OpportunitySection.jsx";
import HowItWorks from "./components/landing/HowItWorks.jsx";
import PortfolioComposition from "./components/landing/PortfolioComposition.jsx";
import TrancheTableSection from "./components/landing/TrancheTableSection.jsx";
import StakingConfigurator from "./components/landing/StakingConfigurator.jsx";
import CustodySecurity from "./components/landing/CustodySecurity.jsx";
import MilestoneRoadmap from "./components/landing/MilestoneRoadmap.jsx";
import ForMiners from "./components/landing/ForMiners.jsx";
import RegulatoryCompliance from "./components/landing/RegulatoryCompliance.jsx";
import FAQAccordion from "./components/landing/FAQAccordion.jsx";
import CTAFooter from "./components/landing/CTAFooter.jsx";
import StickyNav from "./components/landing/StickyNav.jsx";

export default function LandingPage({ onNavigate }) {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <StickyNav onNavigate={onNavigate} />
      <HeroSection onNavigate={onNavigate} />

      {/* Disclaimer strip */}
      <div style={{ background: `${LIME}08`, borderBottom: `1px solid ${LIME}20`, padding: "10px 32px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Info size={13} color={GOLD} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: MUTED }}>
          All information, figures, and projections are subject to change. This material is for informational purposes only and does not constitute financial advice.
        </span>
      </div>

      <MetricsStrip />
      <TokenExplainer />
      <OpportunitySection />
      <HowItWorks />
      <PortfolioComposition />
      <TrancheTableSection />
      <StakingConfigurator />
      <CustodySecurity />
      <MilestoneRoadmap />
      <ForMiners />
      <RegulatoryCompliance />
      <FAQAccordion />
      <CTAFooter onNavigate={onNavigate} />
    </div>
  );
}
