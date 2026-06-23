"use client";
import { useEffect, useRef, useState } from "react";
import { useAnimateOnViewHook } from "@/hooks/useAnimateOnView";

interface AnimatedCounterProps {
  targetValue: number;
  suffix?: string;
  durationMs?: number;
}

export default function AnimatedCounter({
  targetValue,
  suffix = "",
  durationMs = 1500,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useAnimateOnViewHook<HTMLSpanElement>();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    const steps = 60;
    const increment = targetValue / steps;
    const interval = durationMs / steps;
    let current = 0;
    const timer = window.setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);
    return () => window.clearInterval(timer);
  }, [isInView, targetValue, durationMs]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
