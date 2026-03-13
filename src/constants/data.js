import { GREEN, GOLD, RED } from "./colors.js";

export const tranches = [
  { id: "VGOLD-T1", name: "VGOLD — Anchor", status: "Open", totalOz: 2000000, reserved: 1460000, allocLeft: 27, pricePerToken: "$2,150", minInvest: "$1,000,000", investors: "Strategic Anchor", vesting: "25% TGE, qtly/12mo", jurisdiction: "Tier 1", grade: "4.6 g/t", certification: "JORC/43-101" },
  { id: "VGOLD-T2", name: "VGOLD — Institutional", status: "Open", totalOz: 2500000, reserved: 875000, allocLeft: 65, pricePerToken: "$2,185", minInvest: "$500,000", investors: "Qualified Institutional", vesting: "25% TGE, qtly/9mo", jurisdiction: "Tier 1", grade: "4.6 g/t", certification: "JORC/43-101" },
  { id: "VGOLD-T3", name: "VGOLD — Strategic", status: "Coming Soon", totalOz: 2000000, reserved: 0, allocLeft: 100, pricePerToken: "$2,210", minInvest: "$250,000", investors: "Mining & Commodity", vesting: "33% TGE, qtly/6mo", jurisdiction: "Tier 1", grade: "5.1 g/t", certification: "JORC/43-101" },
  { id: "VGOLD-T4", name: "VGOLD — Accredited", status: "Pipeline", totalOz: 2000000, reserved: 0, allocLeft: 100, pricePerToken: "$2,235", minInvest: "$50,000", investors: "HNW / Accredited", vesting: "50% TGE, mthly/6mo", jurisdiction: "Tier 1", grade: "3.9 g/t", certification: "JORC/43-101" },
  { id: "VGOLD-T5", name: "VGOLD — Public", status: "Pipeline", totalOz: 1500000, reserved: 0, allocLeft: 100, pricePerToken: "$2,250", minInvest: "$10,000", investors: "Qualified Public", vesting: "75% TGE, bal. 3mo", jurisdiction: "Tier 1", grade: "4.2 g/t", certification: "JORC/43-101" },
];

export const timeSteps = [6, 12, 18, 24, 30, 36];
export const riskLabels = ["Conservative", "Moderate", "Balanced", "Growth", "Aggressive"];
export const riskColors = [GREEN, "#2E8B57", GOLD, "#C97B2B", RED];

export const yieldMatrix = [
  [1.2, 2.0, 3.0, 4.0, 5.0, 6.0],
  [2.0, 3.5, 5.0, 6.5, 7.5, 8.5],
  [3.0, 5.0, 7.0, 9.0, 10.5, 11.5],
  [4.0, 6.5, 9.0, 11.0, 12.5, 13.5],
  [5.0, 8.0, 11.0, 13.0, 14.5, 15.0],
];

export const earlyExitFees = ["1–2%", "2–3%", "3–5%", "5–8%", "7–10%"];

export const portfolioAllocations = [
  { physicalGold: 35, productionContracts: 30, qualifiedReserves: 25, liquidity: 20, leverage: 0 },
  { physicalGold: 33, productionContracts: 32, qualifiedReserves: 27, liquidity: 18, leverage: 10 },
  { physicalGold: 30, productionContracts: 33, qualifiedReserves: 30, liquidity: 17, leverage: 15 },
  { physicalGold: 30, productionContracts: 35, qualifiedReserves: 33, liquidity: 15, leverage: 18 },
  { physicalGold: 30, productionContracts: 35, qualifiedReserves: 35, liquidity: 15, leverage: 20 },
];

export const strategyDescriptions = [
  "Defensive allocation with maximum physical gold weighting and no leverage. The portfolio holds 35% in physical bullion and VGOLD tokens in vaulted custody, 30% in secured production contracts (doré and refined gold purchased at $750–$2,000/oz on contracts up to 15yrs), 25% in JORC/43-101 qualified reserves, and a 20% USD/USDC liquidity buffer for mine capex funding via forward gold sales. No third-party debt leverage.",
  "Core VGOLD SP allocation with modest 10% leverage introduced against secured gold and plant/machinery. Physical gold at 33%, production contracts at 32% providing structured forward pricing, qualified reserves at 27%, and 18% liquidity buffer. Leverage enhances yield while maintaining strong collateral coverage.",
  "Balanced VGOLD SP portfolio at target weights: 30% physical/digital gold, 33% secured production contracts across global mines at $750–$2,000/oz, 30% qualified reserves (JORC/43-101), 17% liquidity buffer for capex funding, and 15% structured leverage against gold, plant, machinery, or equity.",
  "Growth-oriented allocation maximising production contract exposure at 35% to capture the full spread between contracted purchase prices ($750–$2,000/oz) and spot. Qualified reserves at 33%, physical gold floor at 30%, 15% liquidity, and 18% structured third-party debt leverage when available.",
  "Maximum yield configuration: full leverage at 20% of portfolio via structured third-party debt secured against gold, plant, machinery, and equity. Production contracts at 35%, qualified reserves at 35%, physical gold at 30%, and 15% liquid assets. Highest return potential with proportionally higher exposure to leverage and reserve-stage assets.",
];
