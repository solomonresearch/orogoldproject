import { LIME } from "../../constants/colors.js";

export default function VGoldMark({ size = 28, color = LIME }) {
  return (
    <svg width={size} height={size * (114.76 / 126.76)} viewBox="63.38 57.38 126.76 114.76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="63.38 57.38 93.72 109.93 184.74 57.38 63.38 57.38" fill={color} />
      <polygon points="99.39 119.74 129.64 172.14 190.14 67.34 99.39 119.74" fill={color} />
    </svg>
  );
}
