"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const numeric = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const prefix = value.match(/^[^\d]*/)?.[0] ?? "";
  const suffix = value.match(/[^\d]*$/)?.[0] ?? "";

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(numeric);
  }, [inView, numeric, motionValue]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        const isInt = Number.isInteger(numeric);
        ref.current.textContent = `${prefix}${isInt ? Math.floor(v) : v.toFixed(1)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix, numeric]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
