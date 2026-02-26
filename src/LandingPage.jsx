import HeroSection from "./components/landing/HeroSection.jsx";
import MetricsStrip from "./components/landing/MetricsStrip.jsx";
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
      <MetricsStrip />
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
