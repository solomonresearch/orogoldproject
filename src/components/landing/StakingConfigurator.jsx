import { useState } from "react";
import { Shield, TrendingUp, Lock, Unlock, Clock, AlertTriangle, Zap, Briefcase, BarChart3, Coins } from "lucide-react";
import { GOLD, LIME, DARK, MUTED, CARD_BG, BORDER, RED } from "../../constants/colors.js";
import { timeSteps, riskLabels, riskColors, yieldMatrix, earlyExitFees, portfolioAllocations, strategyDescriptions } from "../../constants/data.js";
import StepSlider from "../shared/StepSlider.jsx";
import PortfolioBar from "../shared/PortfolioBar.jsx";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function StakingConfigurator() {
  const [timeIdx, setTimeIdx] = useState(2);
  const [riskIdx, setRiskIdx] = useState(2);
  const [stakeAmount, setStakeAmount] = useState("");
  const isMobile = useIsMobile();

  const currentYield = yieldMatrix[riskIdx][timeIdx];
  const currentTime = timeSteps[timeIdx];
  const riskColor = riskColors[riskIdx];
  const earlyFee = earlyExitFees[riskIdx];
  const strategy = strategyDescriptions[riskIdx];
  const alloc = portfolioAllocations[riskIdx];

  const amt = parseFloat((stakeAmount || "0").replace(/,/g, ""));
  const estEarnings = amt > 0 ? (amt * (currentYield / 100) * (currentTime / 12)).toFixed(2) : null;

  return (
    <SectionWrapper id="staking" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>VGOLD STAKING</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 12px" }}>
            Configure Your Yield
          </h2>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Stake your VGOLD into the Segregated Portfolio. Adjust duration and risk to see your projected returns. No staking = no yield.
          </p>
        </div>

        {/* Warning banner */}
        <div style={{ background: `${LIME}12`, border: `1px solid ${LIME}30`, borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24, maxWidth: 800, margin: "0 auto 24px" }}>
          <AlertTriangle size={16} color={GOLD} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: DARK, lineHeight: 1.5 }}>
            <strong>Early unstaking</strong> incurs a 1–10% commission depending on risk tier and remaining lock-up. Annual yield: <strong>1.2%–15%</strong> depending on configuration. Non-staked tokens earn <strong>zero yield</strong>.
          </span>
        </div>

        {/* Sliders */}
        <div style={{ background: "#FAFAF5", border: `1px solid ${BORDER}`, borderRadius: 12, padding: isMobile ? "20px 16px 12px" : "24px 32px 16px", marginBottom: 24, maxWidth: 800, margin: "0 auto 24px" }}>
          <StepSlider idx={timeIdx} count={6} onChange={setTimeIdx} stepLabels={timeSteps.map(t => `${t}mo`)} color={GOLD} title="Lock-Up Duration" icon={Clock} displayValue={`${currentTime} Months`} />
          <div style={{ height: 1, background: BORDER, margin: "12px 0 16px" }} />
          <StepSlider idx={riskIdx} count={5} onChange={setRiskIdx} stepLabels={riskLabels} color={riskColor} title="Risk Profile" icon={AlertTriangle} displayValue={riskLabels[riskIdx]} />
        </div>

        {/* Result card */}
        <div style={{ background: "#fff", border: `2px solid ${riskColor}25`, borderRadius: 14, overflow: "hidden", maxWidth: 1000, margin: "0 auto", transition: "border-color 0.3s" }}>
          <div style={{ height: 4, background: riskColor, transition: "background 0.3s" }} />
          <div style={{ padding: isMobile ? "20px 16px" : "24px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 28 }}>
              {/* Left */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{ background: `${riskColor}15`, borderRadius: 10, padding: 8, display: "flex", transition: "background 0.3s" }}>
                    {riskIdx <= 1 ? <Shield size={20} color={riskColor} /> : riskIdx <= 2 ? <BarChart3 size={20} color={riskColor} /> : <TrendingUp size={20} color={riskColor} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: DARK }}>{riskLabels[riskIdx]} · {currentTime} Months</div>
                    <div style={{ fontSize: 11, color: MUTED }}>VGOLD Segregated Portfolio</div>
                  </div>
                </div>

                {/* Yield display */}
                <div style={{ background: `${riskColor}08`, borderRadius: 10, padding: "18px 22px", marginBottom: 20, display: "flex", alignItems: "baseline", justifyContent: "space-between", transition: "background 0.3s" }}>
                  <div>
                    <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>PROJECTED ANNUAL YIELD</div>
                    <div style={{ fontSize: 46, fontWeight: 700, color: riskColor, fontFamily: "Georgia, serif", lineHeight: 1, transition: "color 0.3s" }}>{currentYield.toFixed(1)}%</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 4 }}>EARLY EXIT FEE</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif" }}>{earlyFee}</div>
                  </div>
                </div>

                {[
                  { label: "Lock-Up Period", value: `${currentTime} months`, icon: Lock },
                  { label: "Risk Profile", value: riskLabels[riskIdx], icon: AlertTriangle },
                  { label: "Early Exit Commission", value: earlyFee, icon: Unlock },
                  { label: "Leverage", value: alloc.leverage > 0 ? `${alloc.leverage}% of portfolio` : "None", icon: Zap },
                  { label: "Production Contracts", value: `$750–$2,000/oz · up to 15yr`, icon: Briefcase },
                ].map((d, j) => (
                  <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: j < 4 ? `1px solid ${BORDER}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}><d.icon size={13} color={MUTED} /><span style={{ fontSize: 12, color: MUTED }}>{d.label}</span></div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: DARK }}>{d.value}</span>
                  </div>
                ))}
              </div>

              {/* Right */}
              <div>
                <div style={{ background: CARD_BG, borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                  <div style={{ fontSize: 9, color: riskColor, fontWeight: 700, letterSpacing: 1.2, marginBottom: 8, transition: "color 0.3s" }}>VGOLD SP PORTFOLIO ALLOCATION</div>
                  <PortfolioBar alloc={alloc} />
                  <div style={{ marginTop: 12, fontSize: 11, color: MUTED, lineHeight: 1.6 }}>{strategy}</div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 10, color: MUTED, letterSpacing: 0.5, display: "block", marginBottom: 5 }}>STAKE AMOUNT (VGOLD)</label>
                  <div style={{ display: "flex", border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
                    <input type="text" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} placeholder="0.00"
                      style={{ flex: 1, border: "none", padding: "11px 14px", fontSize: 16, fontWeight: 600, fontFamily: "Georgia, serif", outline: "none", color: DARK, background: "transparent" }} />
                    <button onClick={() => setStakeAmount("1250")} style={{ background: CARD_BG, border: "none", borderLeft: `1px solid ${BORDER}`, padding: "0 14px", fontSize: 10, fontWeight: 700, color: GOLD, cursor: "pointer", letterSpacing: 1 }}>MAX</button>
                  </div>
                  <div style={{ fontSize: 10, color: MUTED, marginTop: 5 }}>Available: 1,250.00 VGOLD</div>
                </div>

                {estEarnings && (
                  <div style={{ background: `${riskColor}08`, borderRadius: 8, padding: "10px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.3s" }}>
                    <span style={{ fontSize: 11, color: MUTED }}>Est. earnings over {currentTime}mo</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: riskColor, fontFamily: "Georgia, serif" }}>{estEarnings} VGOLD</span>
                  </div>
                )}

                <button style={{
                  width: "100%", background: riskColor, color: "#fff", border: "none", borderRadius: 8,
                  padding: "14px", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "opacity 0.2s, background 0.3s",
                }} onMouseEnter={e => e.currentTarget.style.opacity = "0.9"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <Lock size={14} /> STAKE INTO VGOLD PORTFOLIO
                </button>

                {/* No staking reminder */}
                <div style={{ background: "#fff", border: `1px dashed ${BORDER}`, borderRadius: 8, padding: "10px 14px", marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <Coins size={14} color={MUTED} />
                  <span style={{ fontSize: 11, color: MUTED }}>Holding without staking earns <strong style={{ color: RED }}>zero yield</strong>. Stake to activate returns.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
