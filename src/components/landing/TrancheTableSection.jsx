import { useState } from "react";
import { ChevronRight, Info, MapPin, Gem, BarChart3, CheckCircle, Clock, DollarSign, ArrowUpRight } from "lucide-react";
import { GOLD, GOLD_LIGHT, GOLD_DIM, DARK, MUTED, CARD_BG, BORDER, GREEN } from "../../constants/colors.js";
import { tranches } from "../../constants/data.js";
import StatusBadge from "../shared/StatusBadge.jsx";
import AllocationBar from "../shared/AllocationBar.jsx";
import Tip from "../shared/Tip.jsx";
import SectionWrapper from "../shared/SectionWrapper.jsx";
import useIsMobile from "../../hooks/useIsMobile.js";

export default function TrancheTableSection() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const isMobile = useIsMobile();

  const totalReserved = tranches.reduce((a, b) => a + b.reserved, 0);
  const pctDeployed = ((totalReserved / 10000000) * 100).toFixed(1);

  return (
    <SectionWrapper id="tranches" style={{ padding: isMobile ? "60px 20px" : "80px 40px", background: "#FAFAF8" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2 }}>INVESTMENT TRANCHES</span>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: DARK, fontFamily: "Georgia, serif", margin: "10px 0 12px" }}>
            OROx1 Gold Reserve Tranches
          </h2>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            5 tranches · 10,000,000 total ounces · JORC 2012 · 1 ORO = 1 troy oz
          </p>
        </div>

        {isMobile ? (
          /* Mobile card view */
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tranches.map((t, i) => (
              <div key={t.id} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16, cursor: "pointer" }} onClick={() => setExpandedRow(expandedRow === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.status === "Open" ? GOLD : GOLD_DIM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>T{i + 1}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{t.name}</div>
                      <div style={{ fontSize: 10, color: MUTED }}>{t.investors}</div>
                    </div>
                  </div>
                  <StatusBadge status={t.status} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <div><div style={{ fontSize: 10, color: MUTED }}>Price</div><div style={{ fontSize: 13, fontWeight: 700, color: GOLD, fontFamily: "Georgia, serif" }}>{t.pricePerToken}</div></div>
                  <div><div style={{ fontSize: 10, color: MUTED }}>Discount</div><div style={{ fontSize: 12, fontWeight: 700, color: GREEN }}>{t.discount}</div></div>
                  <div><div style={{ fontSize: 10, color: MUTED }}>Lock-up</div><div style={{ fontSize: 12, color: DARK }}>{t.lockup}</div></div>
                </div>
                <div style={{ marginTop: 10 }}><AllocationBar pct={t.allocLeft} /></div>
                {expandedRow === i && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {[{ l: "Region", v: t.mineArea }, { l: "Type", v: t.mineType }, { l: "Grade", v: t.grade }, { l: "Cert", v: t.certification }, { l: "Vesting", v: t.vesting }, { l: "Min.", v: t.minInvest }].map((d, j) => (
                        <div key={j}><span style={{ fontSize: 9, color: MUTED }}>{d.l}: </span><span style={{ fontSize: 11, fontWeight: 600, color: DARK }}>{d.v}</span></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Desktop table */
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
        )}
      </div>
    </SectionWrapper>
  );
}
