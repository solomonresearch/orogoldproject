import { useState } from "react";
import { Shield, TrendingUp, Lock, Unlock, Globe, Coins, ChevronRight, ChevronDown, Info, Clock, AlertTriangle, CheckCircle, ArrowUpRight, Layers, BarChart3, Gem, Wallet, Zap, DollarSign, Package, Briefcase, ExternalLink, FileText } from "lucide-react";

import { GOLD, GOLD_LIGHT, GOLD_DIM, DARK, MUTED, CARD_BG, BORDER, GREEN, RED, BG } from "./constants/colors.js";
import { tranches, timeSteps, riskLabels, riskColors, yieldMatrix, earlyExitFees, portfolioAllocations, strategyDescriptions } from "./constants/data.js";
import StatusBadge from "./components/shared/StatusBadge.jsx";
import AllocationBar from "./components/shared/AllocationBar.jsx";
import Tip from "./components/shared/Tip.jsx";
import PortfolioBar from "./components/shared/PortfolioBar.jsx";
import StepSlider from "./components/shared/StepSlider.jsx";

export default function ORODashboard({ onNavigate }) {
  const [tab, setTab] = useState("staking");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [timeIdx, setTimeIdx] = useState(2);
  const [riskIdx, setRiskIdx] = useState(2);
  const [stakeAmount, setStakeAmount] = useState("");
  const [showMatrix, setShowMatrix] = useState(false);

  const totalOz = 10000000;
  const totalReserved = tranches.reduce((a, b) => a + b.reserved, 0);
  const pctDeployed = ((totalReserved / totalOz) * 100).toFixed(1);
  const openTranches = tranches.filter(i => i.status === "Open").length;

  const currentYield = yieldMatrix[riskIdx][timeIdx];
  const currentTime = timeSteps[timeIdx];
  const riskColor = riskColors[riskIdx];
  const earlyFee = earlyExitFees[riskIdx];
  const strategy = strategyDescriptions[riskIdx];
  const alloc = portfolioAllocations[riskIdx];

  const amt = parseFloat((stakeAmount || "0").replace(/,/g, ""));
  const estEarnings = amt > 0 ? (amt * (currentYield / 100) * (currentTime / 12)).toFixed(2) : null;

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: BG, minHeight: "100vh", color: DARK }}>
      {/* HEADER */}
      <div style={{ background: "#fff", borderBottom: `3px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Gem size={28} color={GOLD} strokeWidth={1.5} />
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: GOLD, letterSpacing: 4, fontFamily: "Georgia, serif" }}>ORO</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: DARK, letterSpacing: 1 }}>x1</span>
              </div>
              <div style={{ fontSize: 9, color: MUTED, letterSpacing: 2, marginTop: -2 }}>GOLD-BACKED DIGITAL ASSET · 10,000,000 oz</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {onNavigate && (
              <button onClick={() => onNavigate("landing")} style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: MUTED, cursor: "pointer" }}>
                Back to Home
              </button>
            )}
            <a href="https://docsend.com" target="_blank" rel="noopener noreferrer" style={{ background: GOLD, color: "#fff", border: "none", borderRadius: 6, padding: "5px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, letterSpacing: 0.5, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.background = GOLD_LIGHT}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >
              <FileText size={12} /> Data Room <ExternalLink size={10} />
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#E8F5E9", borderRadius: 6, padding: "5px 12px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN }} /><span style={{ fontSize: 11, fontWeight: 600, color: GREEN }}>Live</span>
            </div>
            <div style={{ background: CARD_BG, borderRadius: 8, padding: "7px 14px", display: "flex", alignItems: "center", gap: 6 }}>
              <Wallet size={13} color={GOLD} /><span style={{ fontSize: 11, color: MUTED }}>0x7a3...f82d</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, padding: "18px 32px 0" }}>
          {[
            { label: "Total Reserve", value: "10,000,000 oz", icon: Layers, sub: "JORC/43-101 Certified" },
            { label: "Allocated", value: `${totalReserved.toLocaleString()} oz`, icon: Coins, sub: `${pctDeployed}% committed` },
            { label: "Open Tranches", value: `${openTranches} of 5`, icon: Package, sub: "T1 Anchor + T2 Institutional" },
            { label: "Staking Vehicle", value: "OROx1 SP", icon: Briefcase, sub: "Segregated Portfolio" },
            { label: "Gold Spot", value: "$2,185.40", icon: TrendingUp, sub: "+1.2% MTD" },
          ].map((kpi, i) => (
            <div key={i} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 16px", transition: "box-shadow 0.2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 2px 12px ${GOLD}15`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ background: `${GOLD}12`, borderRadius: 6, padding: 6, display: "flex" }}><kpi.icon size={15} color={GOLD} strokeWidth={1.5} /></div>
                <span style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase" }}>{kpi.label}</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", marginBottom: 2 }}>{kpi.value}</div>
              <div style={{ fontSize: 10, color: MUTED }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* DISCLAIMER */}
        <div style={{ margin: "14px 32px 0", background: `${GOLD}08`, border: `1px solid ${GOLD}20`, borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <Info size={14} color={GOLD} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: MUTED, lineHeight: 1.5 }}>
            <strong style={{ color: DARK }}>Disclaimer:</strong> All figures, yields, allocations, and projections displayed on this dashboard are for <strong style={{ color: DARK }}>illustrative and display purposes only</strong>. They do not constitute financial advice or a guarantee of returns. Please refer to the{" "}
            <a href="https://docsend.com" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, fontWeight: 600, textDecoration: "underline" }}>Data Room</a>{" "}
            for official documentation.
          </span>
        </div>

        {/* TABS */}
        <div style={{ padding: "18px 32px 0", display: "flex", gap: 0, borderBottom: `1px solid ${BORDER}` }}>
          {[{ id: "issuances", label: "OROx1 Tranches", icon: Globe }, { id: "staking", label: "OROx1 Staking", icon: Lock }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none", padding: "10px 24px", cursor: "pointer",
              fontSize: 13, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? GOLD : MUTED,
              borderBottom: tab === t.id ? `2.5px solid ${GOLD}` : "2.5px solid transparent",
              display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s", marginBottom: -1,
            }}><t.icon size={15} /> {t.label}</button>
          ))}
        </div>

        <div style={{ padding: "20px 32px 40px" }}>

          {/* TRANCHES */}
          {tab === "issuances" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: DARK }}>OROx1 — Tier 1 Jurisdiction Gold Reserve Tranches</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>5 tranches · 10,000,000 total ounces · JORC/43-101 · 1 ORO = 1 troy oz</div>
                </div>
                <Tip text="Each OROx1 token = 1 troy oz. Stake into the OROx1 Segregated Portfolio for up to 15% annual yield. No staking = no yield."><Info size={16} color={MUTED} style={{ cursor: "help" }} /></Tip>
              </div>
              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "0.35fr 1.3fr 0.7fr 0.85fr 0.7fr 0.65fr 0.7fr 1.1fr 0.55fr", padding: "12px 16px", background: GOLD, gap: 6 }}>
                  {["", "TRANCHE", "STATUS", "OUNCES", "PRICE", "DISCOUNT", "LOCK-UP", "REMAINING", ""].map((h, i) => (<div key={i} style={{ fontSize: 9, fontWeight: 700, color: "#fff", letterSpacing: 1.2 }}>{h}</div>))}
                </div>
                {tranches.map((t, i) => (
                  <div key={t.id}>
                    <div style={{ display: "grid", gridTemplateColumns: "0.35fr 1.3fr 0.7fr 0.85fr 0.7fr 0.65fr 0.7fr 1.1fr 0.55fr", padding: "12px 16px", gap: 6, alignItems: "center", background: hoveredRow === i ? `${GOLD}08` : i % 2 === 0 ? "#fff" : CARD_BG, borderBottom: `1px solid ${BORDER}`, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={() => setHoveredRow(i)} onMouseLeave={() => setHoveredRow(null)} onClick={() => setExpandedRow(expandedRow === i ? null : i)}>
                      <div style={{ display: "flex", justifyContent: "center" }}><div style={{ width: 28, height: 28, borderRadius: "50%", background: t.status === "Open" ? GOLD : t.status === "Coming Soon" ? GOLD_DIM : BORDER, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>T{i + 1}</div></div>
                      <div><div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{t.name}</div><div style={{ fontSize: 10, color: MUTED }}>{t.investors} · Min. {t.minInvest}</div></div>
                      <StatusBadge status={t.status} />
                      <div><div style={{ fontSize: 13, fontWeight: 600, color: DARK, fontFamily: "Georgia, serif" }}>{(t.totalOz / 1000000).toFixed(1)}M</div><div style={{ fontSize: 10, color: MUTED }}>{t.reserved > 0 ? `${(t.reserved / 1000).toFixed(0)}K sold` : "—"}</div></div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: GOLD, fontFamily: "Georgia, serif" }}>{t.pricePerToken}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: GREEN }}>{t.discount}</div>
                      <div style={{ fontSize: 12, color: DARK }}>{t.lockup}</div>
                      <AllocationBar pct={t.allocLeft} />
                      <div style={{ display: "flex", justifyContent: "center" }}><ChevronRight size={15} color={MUTED} style={{ transform: expandedRow === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} /></div>
                    </div>
                    {expandedRow === i && (
                      <div style={{ background: `${GOLD}05`, borderBottom: `1px solid ${BORDER}`, padding: "18px 20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 16 }}>
                          {[{ l: "Jurisdiction", v: t.jurisdiction, i: Globe }, { l: "Grade", v: t.grade, i: BarChart3 }, { l: "Certification", v: t.certification, i: CheckCircle }, { l: "Vesting", v: t.vesting, i: Clock }, { l: "Min. Invest", v: t.minInvest, i: DollarSign }].map((d, j) => (
                            <div key={j} style={{ background: "#fff", borderRadius: 8, padding: "10px 12px", border: `1px solid ${BORDER}` }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><d.i size={12} color={GOLD} /><span style={{ fontSize: 9, color: MUTED, letterSpacing: 0.8, textTransform: "uppercase" }}>{d.l}</span></div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{d.v}</div>
                            </div>
                          ))}
                        </div>
                        {t.status === "Open" && <button style={{ background: GOLD, color: "#fff", border: "none", borderRadius: 6, padding: "11px 28px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, letterSpacing: 1 }} onMouseEnter={e => e.currentTarget.style.background = GOLD_LIGHT} onMouseLeave={e => e.currentTarget.style.background = GOLD}>PARTICIPATE <ArrowUpRight size={14} /></button>}
                        {t.status !== "Open" && <div style={{ display: "flex", alignItems: "center", gap: 8, color: t.status === "Coming Soon" ? GOLD : MUTED, fontSize: 12, fontWeight: 600 }}><Clock size={14} /> {t.status === "Coming Soon" ? "Opening soon — milestone trigger pending" : "Opens upon prior tranche completion"}</div>}
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "0.35fr 1.3fr 0.7fr 0.85fr 0.7fr 0.65fr 0.7fr 1.1fr 0.55fr", padding: "12px 16px", background: GOLD, gap: 6, alignItems: "center" }}>
                  <div /><div style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>TOTAL OROx1</div><div /><div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>10.0M</div><div /><div /><div /><div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{pctDeployed}% committed</div><div />
                </div>
              </div>
            </div>
          )}

          {/* V-GOLD STAKING */}
          {tab === "staking" && (
            <div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: DARK, display: "flex", alignItems: "center", gap: 8 }}>
                  Stake into the OROx1 Portfolio
                  <Tip text="OROx1 SP is a Segregated Portfolio holding a globally balanced and diverse pool of assets including physical gold, production contracts, qualified reserves, liquid assets, and structured leverage.">
                    <Info size={14} color={MUTED} style={{ cursor: "help" }} />
                  </Tip>
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>OROx1 Segregated Portfolio · Up to 15% annual yield · Adjust duration and risk below</div>
              </div>

              {/* V-Gold portfolio summary banner */}
              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Briefcase size={16} color={GOLD} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: DARK, letterSpacing: 0.5 }}>OROx1 SP PORTFOLIO COMPOSITION</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                  {[
                    { pct: "30–35%", label: "Physical & Digital Gold", sub: "Bullion + OROx tokens", color: GOLD },
                    { pct: "30–35%", label: "Production Contracts", sub: "$750–$2,000/oz · up to 15yr", color: "#2E8B57" },
                    { pct: "25–35%", label: "Qualified Reserves", sub: "JORC/43-101 certified", color: "#5B6ABF" },
                    { pct: "15–20%", label: "Liquid Assets", sub: "USD/USDC buffer + mine capex", color: "#4A90D9" },
                    { pct: "Up to 20%", label: "Structured Leverage", sub: "3rd party debt (when avail.)", color: "#8B5E3C" },
                  ].map((item, i) => (
                    <div key={i} style={{ borderLeft: `3px solid ${item.color}`, paddingLeft: 10 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: item.color, fontFamily: "Georgia, serif" }}>{item.pct}</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: DARK, marginTop: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 10, color: MUTED, marginTop: 1 }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div style={{ background: "#FFF8E1", border: `1px solid ${GOLD_DIM}40`, borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 22 }}>
                <AlertTriangle size={16} color={GOLD} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 12, color: DARK, lineHeight: 1.5 }}>
                  <strong>Early unstaking</strong> incurs a 1–10% commission depending on risk tier and remaining lock-up. Non-staked tokens earn <strong>zero yield</strong>. Annual yield: <strong>1.2%–15%</strong> depending on duration and risk profile. Non-staked tokens earn <strong>zero yield</strong>.
                </span>
              </div>

              {/* SLIDERS */}
              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "24px 32px 16px", marginBottom: 22 }}>
                <StepSlider idx={timeIdx} count={6} onChange={setTimeIdx} stepLabels={timeSteps.map(t => `${t}mo`)} color={GOLD} title="Lock-Up Duration" icon={Clock} displayValue={`${currentTime} Months`} />
                <div style={{ height: 1, background: BORDER, margin: "12px 0 16px" }} />
                <StepSlider idx={riskIdx} count={5} onChange={setRiskIdx} stepLabels={riskLabels} color={riskColor} title="Risk Profile" icon={AlertTriangle} displayValue={riskLabels[riskIdx]} />
              </div>

              {/* RESULT CARD */}
              <div style={{ background: "#fff", border: `2px solid ${riskColor}25`, borderRadius: 14, overflow: "hidden", marginBottom: 22, transition: "border-color 0.3s" }}>
                <div style={{ height: 4, background: riskColor, transition: "background 0.3s" }} />
                <div style={{ padding: "24px 28px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                    {/* Left */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                        <div style={{ background: `${riskColor}15`, borderRadius: 10, padding: 8, display: "flex", transition: "background 0.3s" }}>
                          {riskIdx <= 1 ? <Shield size={20} color={riskColor} /> : riskIdx <= 2 ? <BarChart3 size={20} color={riskColor} /> : <TrendingUp size={20} color={riskColor} />}
                        </div>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: DARK }}>{riskLabels[riskIdx]} · {currentTime} Months</div>
                          <div style={{ fontSize: 11, color: MUTED }}>OROx1 Segregated Portfolio</div>
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
                        <div style={{ fontSize: 9, color: riskColor, fontWeight: 700, letterSpacing: 1.2, marginBottom: 8, transition: "color 0.3s" }}>OROx1 SP PORTFOLIO ALLOCATION</div>
                        <PortfolioBar alloc={alloc} riskIdx={riskIdx} />
                        <div style={{ marginTop: 12, fontSize: 11, color: MUTED, lineHeight: 1.6 }}>{strategy}</div>
                      </div>

                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 10, color: MUTED, letterSpacing: 0.5, display: "block", marginBottom: 5 }}>STAKE AMOUNT (OROx1)</label>
                        <div style={{ display: "flex", border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
                          <input type="text" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} placeholder="0.00"
                            style={{ flex: 1, border: "none", padding: "11px 14px", fontSize: 16, fontWeight: 600, fontFamily: "Georgia, serif", outline: "none", color: DARK, background: "transparent" }} />
                          <button onClick={() => setStakeAmount("1250")} style={{ background: CARD_BG, border: "none", borderLeft: `1px solid ${BORDER}`, padding: "0 14px", fontSize: 10, fontWeight: 700, color: GOLD, cursor: "pointer", letterSpacing: 1 }}>MAX</button>
                        </div>
                        <div style={{ fontSize: 10, color: MUTED, marginTop: 5 }}>Available: 1,250.00 OROx1</div>
                      </div>

                      {estEarnings && (
                        <div style={{ background: `${riskColor}08`, borderRadius: 8, padding: "10px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.3s" }}>
                          <span style={{ fontSize: 11, color: MUTED }}>Est. earnings over {currentTime}mo</span>
                          <span style={{ fontSize: 16, fontWeight: 700, color: riskColor, fontFamily: "Georgia, serif" }}>{estEarnings} ORO</span>
                        </div>
                      )}

                      <button style={{
                        width: "100%", background: riskColor, color: "#fff", border: "none", borderRadius: 8,
                        padding: "14px", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "opacity 0.2s, background 0.3s",
                      }} onMouseEnter={e => e.currentTarget.style.opacity = "0.9"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                        <Lock size={14} /> STAKE INTO OROx1 PORTFOLIO
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* YIELD MATRIX */}
              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden", marginBottom: 18 }}>
                <button onClick={() => setShowMatrix(!showMatrix)} style={{
                  width: "100%", background: "none", border: "none", padding: "14px 20px", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <BarChart3 size={16} color={GOLD} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: DARK }}>Full Yield Matrix</span>
                    <span style={{ fontSize: 11, color: MUTED }}>— All duration × risk combinations (1.2%–15%)</span>
                  </div>
                  <ChevronDown size={18} color={MUTED} style={{ transform: showMatrix ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>

                {showMatrix && (
                  <div style={{ padding: "0 20px 20px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead>
                        <tr>
                          <th style={{ background: GOLD, color: "#fff", padding: "10px 14px", textAlign: "left", fontSize: 10, letterSpacing: 1, fontWeight: 700, borderRadius: "6px 0 0 0" }}>RISK \ DURATION</th>
                          {timeSteps.map((t, i) => (
                            <th key={i} style={{ background: GOLD, color: "#fff", padding: "10px 12px", textAlign: "center", fontSize: 10, letterSpacing: 1, fontWeight: 700, borderRadius: i === timeSteps.length - 1 ? "0 6px 0 0" : 0 }}>{t} MO</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {riskLabels.map((label, ri) => (
                          <tr key={ri}>
                            <td style={{ padding: "10px 14px", fontWeight: 700, color: riskColors[ri], borderBottom: `1px solid ${BORDER}`, background: ri % 2 === 0 ? "#fff" : CARD_BG, whiteSpace: "nowrap" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: riskColors[ri] }} />
                                {label}
                              </div>
                            </td>
                            {timeSteps.map((_, ti) => {
                              const isActive = ri === riskIdx && ti === timeIdx;
                              const val = yieldMatrix[ri][ti];
                              return (
                                <td key={ti}
                                  onClick={() => { setRiskIdx(ri); setTimeIdx(ti); }}
                                  style={{
                                    padding: "10px 12px", textAlign: "center", fontWeight: isActive ? 800 : 600,
                                    color: isActive ? "#fff" : DARK, cursor: "pointer",
                                    background: isActive ? riskColors[ri] : ri % 2 === 0 ? "#fff" : CARD_BG,
                                    borderBottom: `1px solid ${BORDER}`, borderRadius: isActive ? 4 : 0,
                                    transition: "all 0.15s", fontFamily: "Georgia, serif",
                                  }}
                                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = `${riskColors[ri]}15`; }}
                                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = ri % 2 === 0 ? "#fff" : CARD_BG; }}
                                >
                                  {val.toFixed(1)}%
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ marginTop: 10, fontSize: 11, color: MUTED, fontStyle: "italic" }}>
                      Click any cell to update your configuration. Highlighted = current selection. Yields range from 1.2% to 15%. Non-staked tokens earn zero yield.
                    </div>
                  </div>
                )}
              </div>

              {/* Non-staker */}
              <div style={{ background: "#fff", border: `1px dashed ${BORDER}`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ background: `${MUTED}10`, borderRadius: 8, padding: 7 }}><Coins size={16} color={MUTED} /></div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: DARK }}>Holding Without Staking</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>OROx1 tokens in your wallet retain gold-price exposure and liquidity but earn <strong style={{ color: RED }}>zero yield</strong>. Stake into the OROx1 portfolio to activate returns.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "12px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 9, color: MUTED }}>CONFIDENTIAL · FOR QUALIFIED INVESTORS ONLY · OROx1 Segregated Portfolio</span>
          <span style={{ fontSize: 9, color: MUTED }}>OROx1 Gold-Backed Digital Asset © 2026</span>
        </div>
        <div style={{ fontSize: 9, color: MUTED, lineHeight: 1.6 }}>
          All data, figures, projections, and yields shown are for display purposes only and do not constitute an offer, solicitation, or guarantee of returns.{" "}
          <a href="https://docsend.com" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "underline" }}>Access the Data Room</a> for official documentation and disclosures.
        </div>
      </div>
    </div>
  );
}
