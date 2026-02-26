import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({ end, duration = 1.5, prefix = "", suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = 0;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setValue(start + (end - start) * eased);
      if (elapsed < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{value.toFixed(decimals)}{suffix}</span>;
}
