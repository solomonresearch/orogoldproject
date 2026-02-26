import { RED, GOLD, GREEN, DARK } from "../../constants/colors.js";

export default function AllocationBar({ pct }) {
  const f = 100 - pct;
  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 7, background: "#E8E8E6", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${f}%`, height: "100%", background: f > 80 ? RED : f > 50 ? GOLD : GREEN, borderRadius: 4, transition: "width 0.6s" }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: pct < 30 ? RED : DARK, minWidth: 34, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}
