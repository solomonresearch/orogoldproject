import { useState } from "react";
import { Shield, TrendingUp, Lock, Unlock, Globe, MapPin, Coins, ChevronRight, ChevronDown, Info, Clock, AlertTriangle, CheckCircle, ArrowUpRight, Layers, BarChart3, Gem, Wallet, Zap, DollarSign, Package, Briefcase } from "lucide-react";

const GOLD = "#9E7C2B";
const GOLD_LIGHT = "#B8942F";
const GOLD_DIM = "#C4AA5A";
const DARK = "#1A1A1A";
const MUTED = "#7A7A7A";
const CARD_BG = "#F5F5F3";
const BORDER = "#D8D8D5";
const GREEN = "#1E7A4B";
const RED = "#B85042";
const BG = "#FAFAF8";

const tranches = [
  { id: "OROx1-T1", name: "OROx1 — Anchor", status: "Open", totalOz: 2000000, reserved: 1460000, allocLeft: 27, pricePerToken: "$2,150", discount: "15–20%", lockup: "18 months", minInvest: "$1,000,000", investors: "Strategic Anchor", vesting: "25% TGE, qtly/12mo", mineArea: "Western Australia", mineType: "Open Pit", grade: "4.6 g/t", certification: "JORC 2012" },
  { id: "OROx1-T2", name: "OROx1 — Institutional", status: "Open", totalOz: 2500000, reserved: 875000, allocLeft: 65, pricePerToken: "$2,185", discount: "10–12%", lockup: "12 months", minInvest: "$500,000", investors: "Qualified Institutional", vesting: "25% TGE, qtly/9mo", mineArea: "Western Australia", mineType: "Open Pit", grade: "4.6 g/t", certification: "JORC 2012" },
  { id: "OROx1-T3", name: "OROx1 — Strategic", status: "Coming Soon", totalOz: 2000000, reserved: 0, allocLeft: 100, pricePerToken: "$2,210", discount: "8–10%", lockup: "12 months", minInvest: "$250,000", investors: "Mining & Commodity", vesting: "33% TGE, qtly/6mo", mineArea: "South Australia", mineType: "Underground", grade: "5.1 g/t", certification: "JORC 2012" },
  { id: "OROx1-T4", name: "OROx1 — Accredited", status: "Pipeline", totalOz: 2000000, reserved: 0, allocLeft: 100, pricePerToken: "$2,235", discount: "5–7%", lockup: "6 months", minInvest: "$50,000", investors: "HNW / Accredited", vesting: "50% TGE, mthly/6mo", mineArea: "Queensland", mineType: "Open Pit", grade: "3.9 g/t", certification: "JORC 2012" },
  { id: "OROx1-T5", name: "OROx1 — Public", status: "Pipeline", totalOz: 1500000, reserved: 0, allocLeft: 100, pricePerToken: "$2,250", discount: "3–5%", lockup: "3 months", minInvest: "$10,000", investors: "Qualified Public", vesting: "75% TGE, bal. 3mo", mineArea: "Victoria", mineType: "Underground", grade: "4.2 g/t", certification: "JORC 2012" },
];

const timeSteps = [6, 12, 18, 24, 30, 36];
const riskLabels = ["Conservative", "Moderate", "Balanced", "Growth", "Aggressive"];
const riskColors = [GREEN, "#2E8B57", GOLD, "#C97B2B", RED];

// Yield matrix: minimum 15% at baseline, scaling with duration and risk
const yieldMatrix = [
  [15.0, 15.5, 16.0, 16.5, 17.0, 17.5],
  [15.5, 16.5, 17.5, 18.5, 19.0, 20.0],
  [16.0, 17.5, 19.0, 20.5, 21.5, 22.5],
  [17.0, 19.0, 21.0, 23.0, 24.5, 26.0],
  [18.0, 21.0, 24.0, 27.0, 29.0, 31.0],
];

const earlyExitFees = ["1–2%", "2–3%", "3–5%", "5–8%", "7–10%"];

// V-Gold portfolio allocation per risk tier (% of total)
const portfolioAllocations = [
  { physicalGold: 35, productionContracts: 30, qualifiedReserves: 25, liquidity: 20, leverage: 0 },
  { physicalGold: 33, productionContracts: 32, qualifiedReserves: 27, liquidity: 18, leverage: 10 },
  { physicalGold: 30, productionContracts: 33, qualifiedReserves: 30, liquidity: 17, leverage: 15 },
  { physicalGold: 30, productionContracts: 35, qualifiedReserves: 33, liquidity: 15, leverage: 18 },
  { physicalGold: 30, productionContracts: 35, qualifiedReserves: 35, liquidity: 15, leverage: 20 },
];

const strategyDescriptions = [
  "Defensive allocation with maximum physical gold weighting and no leverage. The portfolio holds 35% in LBMA-quality physical bullion and OROx tokens in vaulted custody, 30% in secured production contracts (doré and refined gold purchased at $750–$2,000/oz on contracts up to 15yrs), 25% in NI 43-101/JORC qualified reserves, and a 20% USD/USDC liquidity buffer for mine capex funding via forward gold sales. No third-party debt leverage.",
  "Core V-Gold allocation with modest 10% leverage introduced against secured gold and plant/machinery. Physical gold at 33%, production contracts at 32% providing discounted forward pricing, qualified reserves at 27%, and 18% liquidity buffer. Leverage enhances yield while maintaining strong collateral coverage.",
  "Balanced V-Gold portfolio at target weights: 30% physical/digital LBMA gold, 33% secured production contracts across global mines at $750–$2,000/oz, 30% qualified reserves (NI 43-101/JORC), 17% liquidity buffer for capex funding, and 15% structured leverage against gold, plant, machinery, or equity.",
  "Growth-oriented allocation maximizing production contract exposure at 35% to capture the full spread between contracted purchase prices ($750–$2,000/oz) and spot. Qualified reserves at 33%, physical gold floor at 30%, 15% liquidity, and 18% structured third-party debt leverage when available.",
  "Maximum yield configuration: full leverage at 20% of portfolio via structured third-party debt secured against gold, plant, machinery, and equity. Production contracts at 35%, qualified reserves at 35%, physical gold at 30%, and 15% liquid assets. Highest return potential with proportionally higher exposure to leverage and reserve-stage assets.",
];

function StatusBadge({ status }) {
  const m = { "Open": { bg: "#E8F5E9", color: GREEN, icon: CheckCircle }, "Coming Soon": { bg: "#FFF8E1", color: GOLD, icon: Clock }, "Pipeline": { bg: "#F5F5F3", color: MUTED, icon: Clock } };
  const s = m[status] || m["Pipeline"];
  return (<span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}><s.icon size={11} /> {status}</span>);
}

function AllocationBar({ pct }) {
  const f = 100 - pct;
  return (<div style={{ width: "100%", display: "flex", alignItems: "center", gap: 6 }}><div style={{ flex: 1, height: 7, background: "#E8E8E6", borderRadius: 4, overflow: "hidden" }}><div style={{ width: `${f}%`, height: "100%", background: f > 80 ? RED : f > 50 ? GOLD : GREEN, borderRadius: 4, transition: "width 0.6s" }} /></div><span style={{ fontSize: 11, fontWeight: 700, color: pct < 30 ? RED : DARK, minWidth: 34, textAlign: "right" }}>{pct}%</span></div>);
}

function Tip({ children, text }) {
  const [s, set] = useState(false);
  return (<span style={{ position: "relative", display: "inline-flex", alignItems: "center" }} onMouseEnter={() => set(true)} onMouseLeave={() => set(false)}>{children}{s && <span style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: DARK, color: "#fff", fontSize: 11, padding: "8px 14px", borderRadius: 6, zIndex: 50, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", lineHeight: 1.5, maxWidth: 300, textAlign: "center" }}>{text}<span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${DARK}` }} /></span>}</span>);
}

function PortfolioBar({ alloc, riskIdx }) {
  const segments = [
    { key: "physicalGold", label: "Physical & Digital Gold (LBMA)", color: GOLD, sub: "Bullion vaults + OROx tokens" },
    { key: "productionContracts", label: "Secured Production Contracts", color: "#2E8B57", sub: "Doré & refined gold · $750–$2,000/oz · up to 15yrs" },
    { key: "qualifiedReserves", label: "Qualified Reserves", color: "#5B6ABF", sub: "NI 43-101 & JORC certified" },
    { key: "liquidity", label: "Liquid Assets (USD / USDC)", color: "#4A90D9", sub: "Liquidity buffer + mine capex funding" },
    { key: "leverage", label: "3rd Party Debt Leverage", color: "#8B5E3C", sub: "Secured against gold, plant, machinery, equity" },
  ];
  const active = segments.filter(s => alloc[s.key] > 0);
  const total = active.reduce((a, s) => a + alloc[s.key], 0);

  return (
    <div>
      <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
        {active.map(s => (
          <Tip key={s.key} text={`${s.label}: ${alloc[s.key]}% — ${s.sub}`}>
            <div style={{ width: `${(alloc[s.key] / total) * 100}%`, height: "100%", background: s.color, transition: "width 0.4s ease", cursor: "help", minWidth: 4 }} />
          </Tip>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {active.map(s => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
            <span style={{ fontSize: 9.5, color: MUTED }}>{s.label.split("(")[0].trim()}</span>
            <span style={{ fontSize: 9.5, fontWeight: 700, color: DARK }}>{alloc[s.key]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepSlider({ idx, count, onChange, stepLabels, color, title, icon: Icon, displayValue }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon size={14} color={GOLD} />
          <span style={{ fontSize: 11, fontWeight: 700, color: DARK, letterSpacing: 0.8, textTransform: "uppercase" }}>{title}</span>
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "Georgia, serif", transition: "color 0.2s" }}>{displayValue}</span>
      </div>
      <div style={{ position: "relative", height: 48, userSelect: "none" }}>
        <div style={{ position: "absolute", top: 14, left: 12, right: 12, height: 6, background: "#E8E8E6", borderRadius: 3 }} />
        <div style={{ position: "absolute", top: 14, left: 12, width: `${(idx / (count - 1)) * (100 - 2.4)}%`, height: 6, background: color, borderRadius: 3, transition: "width 0.25s ease", pointerEvents: "none" }} />
        {stepLabels.map((label, i) => {
          const left = count === 1 ? 50 : 12 + ((i / (count - 1)) * (100 - 2.4));
          const active = i <= idx;
          const current = i === idx;
          return (
            <div key={i} onClick={() => onChange(i)}
              style={{ position: "absolute", left: `${left}%`, top: 0, transform: "translateX(-50%)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", zIndex: current ? 3 : 1 }}>
              <div style={{
                width: current ? 24 : 14, height: current ? 24 : 14, borderRadius: "50%",
                background: current ? color : active ? color : "#ddd",
                border: current ? "3px solid #fff" : "none",
                boxShadow: current ? `0 0 0 2.5px ${color}, 0 2px 10px rgba(0,0,0,0.18)` : active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                marginTop: current ? 6 : 10, transition: "all 0.25s ease",
              }} />
              <span style={{
                fontSize: current ? 11 : 10, fontWeight: current ? 700 : 500,
                color: current ? color : active ? DARK : MUTED,
                marginTop: 5, transition: "all 0.2s", whiteSpace: "nowrap",
              }}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ORODashboard() {
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
              <div style={{ fontSize: 9, color: MUTED, letterSpacing: 2, marginTop: -2 }}>AUSTRALIAN GOLD-BACKED DIGITAL ASSET · 10,000,000 oz</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
            { label: "Total Reserve", value: "10,000,000 oz", icon: Layers, sub: "JORC 2012 Certified" },
            { label: "Allocated", value: `${totalReserved.toLocaleString()} oz`, icon: Coins, sub: `${pctDeployed}% committed` },
            { label: "Open Tranches", value: `${openTranches} of 5`, icon: Package, sub: "T1 Anchor + T2 Institutional" },
            { label: "Staking Vehicle", value: "V-Gold SP", icon: Briefcase, sub: "Cayman Segregated Portfolio" },
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

        {/* TABS */}
        <div style={{ padding: "18px 32px 0", display: "flex", gap: 0, borderBottom: `1px solid ${BORDER}` }}>
          {[{ id: "issuances", label: "OROx1 Tranches", icon: Globe }, { id: "staking", label: "V-Gold Staking", icon: Lock }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none", padding: "10px 24px", cursor: "pointer",
              fontSize: 13, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? GOLD : MUTED,
              borderBottom: tab === t.id ? `2.5px solid ${GOLD}` : "2.5px solid transparent",
              display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s", marginBottom: -1,
            }}><t.icon size={15} /> {t.label}</button>
          ))}
        </div>

        <div style={{ padding: "20px 32px 40px" }}>

          {/* ═══ TRANCHES ═══ */}
          {tab === "issuances" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: DARK }}>OROx1 — Australian Gold Reserve Tranches</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>5 tranches · 10,000,000 total ounces · JORC 2012 · 1 ORO = 1 troy oz</div>
                </div>
                <Tip text="Each OROx1 token = 1 troy oz. Stake into the V-Gold Segregated Portfolio (Cayman) for 15%+ annual yield."><Info size={16} color={MUTED} style={{ cursor: "help" }} /></Tip>
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
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, marginBottom: 16 }}>
                          {[{ l: "Region", v: t.mineArea, i: MapPin }, { l: "Mine Type", v: t.mineType, i: Gem }, { l: "Grade", v: t.grade, i: BarChart3 }, { l: "Certification", v: t.certification, i: CheckCircle }, { l: "Vesting", v: t.vesting, i: Clock }, { l: "Min. Invest", v: t.minInvest, i: DollarSign }].map((d, j) => (
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

          {/* ═══ V-GOLD STAKING ═══ */}
          {tab === "staking" && (
            <div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: DARK, display: "flex", alignItems: "center", gap: 8 }}>
                  Stake into the V-Gold Portfolio
                  <Tip text="V-Gold is a Cayman-registered Segregated Portfolio (SP) holding a globally balanced and diverse portfolio of physical gold, production contracts, qualified reserves, liquid assets, and structured leverage.">
                    <Info size={14} color={MUTED} style={{ cursor: "help" }} />
                  </Tip>
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>Cayman Segregated Portfolio · Min. 15% annual yield · Adjust duration and risk below</div>
              </div>

              {/* V-Gold portfolio summary banner */}
              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Briefcase size={16} color={GOLD} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: DARK, letterSpacing: 0.5 }}>V-GOLD PORTFOLIO COMPOSITION</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                  {[
                    { pct: "30–35%", label: "Physical & Digital Gold", sub: "LBMA bullion + OROx tokens", color: GOLD },
                    { pct: "30–35%", label: "Production Contracts", sub: "$750–$2,000/oz · up to 15yr", color: "#2E8B57" },
                    { pct: "25–35%", label: "Qualified Reserves", sub: "NI 43-101 & JORC certified", color: "#5B6ABF" },
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
                  <strong>Early unstaking</strong> incurs a 1–10% commission depending on risk tier and remaining lock-up. Non-staked tokens earn <strong>zero yield</strong>. Minimum annual yield target: <strong>15%</strong>.
                </span>
              </div>

              {/* SLIDERS — STACKED VERTICALLY */}
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
                          <div style={{ fontSize: 11, color: MUTED }}>V-Gold Segregated Portfolio · Cayman Islands</div>
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
                        <div style={{ fontSize: 9, color: riskColor, fontWeight: 700, letterSpacing: 1.2, marginBottom: 8, transition: "color 0.3s" }}>V-GOLD PORTFOLIO ALLOCATION</div>
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
                        <Lock size={14} /> STAKE INTO V-GOLD PORTFOLIO
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
                    <span style={{ fontSize: 11, color: MUTED }}>— All duration × risk combinations (min. 15%)</span>
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
                      Click any cell to update your configuration. Highlighted = current selection. All yields ≥ 15% annual minimum.
                    </div>
                  </div>
                )}
              </div>

              {/* Non-staker */}
              <div style={{ background: "#fff", border: `1px dashed ${BORDER}`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ background: `${MUTED}10`, borderRadius: 8, padding: 7 }}><Coins size={16} color={MUTED} /></div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: DARK }}>Holding Without Staking</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>OROx1 tokens in your wallet retain gold-price exposure and liquidity but earn <strong style={{ color: RED }}>zero yield</strong>. Stake into the V-Gold portfolio to activate returns.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "10px 32px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 9, color: MUTED }}>CONFIDENTIAL · FOR QUALIFIED INVESTORS ONLY · V-Gold Segregated Portfolio · Cayman Islands</span>
        <span style={{ fontSize: 9, color: MUTED }}>OROx1 Gold-Backed Digital Asset © 2026</span>
      </div>
    </div>
  );
}