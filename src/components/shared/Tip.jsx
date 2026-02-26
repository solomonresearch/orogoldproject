import { useState } from "react";
import { DARK } from "../../constants/colors.js";

export default function Tip({ children, text }) {
  const [s, set] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }} onMouseEnter={() => set(true)} onMouseLeave={() => set(false)}>
      {children}
      {s && (
        <span style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: DARK, color: "#fff", fontSize: 11, padding: "8px 14px", borderRadius: 6, zIndex: 50, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", lineHeight: 1.5, maxWidth: 300, textAlign: "center" }}>
          {text}
          <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${DARK}` }} />
        </span>
      )}
    </span>
  );
}
