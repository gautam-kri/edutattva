"use client";

import { useEffect, useRef, useState } from "react";
import { homeStats } from "@/lib/data";

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Guarantee the final value even if rAF is throttled (e.g. a background tab).
    const settle = window.setTimeout(() => setValue(target), duration + 600);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, [target, run, duration]);
  return value;
}

function StatItem({
  value,
  suffix,
  label,
  run,
  combined = false,
  compact = false,
}: {
  value: number;
  suffix: string;
  label: string;
  run: boolean;
  combined?: boolean;
  compact?: boolean;
}) {
  const n = useCountUp(value, run);
  return (
    <div className={`text-center ${compact ? "px-2" : "px-3"}`}>
      <div
        className={`font-extrabold leading-none text-white ${
          compact ? "text-[clamp(1.6rem,3.6vw,2.6rem)]" : "text-[clamp(2.2rem,4.5vw,3.4rem)]"
        }`}
        style={{ fontFamily: "var(--font-condensed)" }}
      >
        {n.toLocaleString("en-IN")}
        {combined && (
          <sup className="align-super text-[0.32em] font-normal text-white/35" aria-hidden="true">
            *
          </sup>
        )}
        <span style={{ color: "var(--color-gold)" }}>{suffix}</span>
      </div>
      <div
        className={`font-medium uppercase text-white/70 ${
          compact
            ? "mt-1.5 text-[0.66rem] leading-tight tracking-[0.08em] sm:text-[0.74rem]"
            : "mt-2 text-[0.82rem] tracking-[0.1em]"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatStrip({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    // Failsafe: counters must never stay stuck at 0 if the observer never fires.
    const failsafe = window.setTimeout(() => setRun(true), 1800);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className={`grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/15 ${
          compact ? "gap-x-4 gap-y-4 sm:gap-y-5" : "gap-x-4 gap-y-8"
        }`}
      >
        {homeStats.map((s) => (
          <StatItem key={s.label} {...s} run={run} compact={compact} />
        ))}
      </div>
      <p
        className={`text-center tracking-wide text-white/25 ${
          compact ? "mt-3 text-[0.65rem] sm:mt-4" : "mt-7 text-[0.7rem]"
        }`}
      >
        *Combined across faculty.
      </p>
    </div>
  );
}
