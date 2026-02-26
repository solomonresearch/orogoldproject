import { GOLD, DARK, MUTED } from "../../constants/colors.js";

export default function StepSlider({ idx, count, onChange, stepLabels, color, title, icon: Icon, displayValue }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon size={14} color={GOLD} />
          <span style={{ fontSize: 11, fontWeight: 700, color: DARK, letterSpacing: 0.8, textTransform: "uppercase" }}>{title}</span>
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "Georgia, serif", transition: "color 0.2s" }}>{displayValue}</span>
      </div>
      <div style={{ position: "relative", height: 48, userSelect: "none", padding: "0 16px" }}>
        <div style={{ position: "relative", height: "100%" }}>
          <div style={{ position: "absolute", top: 14, left: 0, right: 0, height: 6, background: "#E8E8E6", borderRadius: 3 }} />
          <div style={{ position: "absolute", top: 14, left: 0, width: `${(idx / (count - 1)) * 100}%`, height: 6, background: color, borderRadius: 3, transition: "width 0.25s ease", pointerEvents: "none" }} />
          {stepLabels.map((label, i) => {
            const left = count === 1 ? 50 : (i / (count - 1)) * 100;
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
    </div>
  );
}
