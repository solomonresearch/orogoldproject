import { CheckCircle, Clock } from "lucide-react";
import { GREEN, GOLD, MUTED } from "../../constants/colors.js";

const statusMap = {
  "Open": { bg: `${GREEN}12`, color: GREEN, icon: CheckCircle },
  "Coming Soon": { bg: `${GOLD}12`, color: GOLD, icon: Clock },
  "Pipeline": { bg: "#F0F0EC", color: MUTED, icon: Clock },
};

export default function StatusBadge({ status }) {
  const s = statusMap[status] || statusMap["Pipeline"];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
      <s.icon size={11} /> {status}
    </span>
  );
}
