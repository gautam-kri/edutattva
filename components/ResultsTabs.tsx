"use client";

import { useState } from "react";
import { results } from "@/lib/data";

export default function ResultsTabs() {
  const [year, setYear] = useState(results[0].year);
  const active = results.find((r) => r.year === year) ?? results[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Results by year"
        className="mx-auto flex w-fit gap-1 rounded-full border border-sky-200 bg-white p-1"
      >
        {results.map((r) => {
          const selected = r.year === year;
          return (
            <button
              key={r.year}
              role="tab"
              aria-selected={selected}
              onClick={() => setYear(r.year)}
              className={`rounded-full px-5 py-2 text-[0.95rem] font-bold transition-colors ${
                selected ? "bg-navy text-white" : "text-navy hover:bg-sky"
              }`}
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              {r.year}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {active.stats.map((s) => {
          const pct = Math.round((s.made / s.of) * 100);
          return (
            <div key={s.label} className="card p-7 text-center">
              <div
                className="text-[clamp(2.4rem,5vw,3.4rem)] font-extrabold leading-none text-royal"
                style={{ fontFamily: "var(--font-condensed)" }}
              >
                {pct}
                <span className="text-[0.55em] align-super">%</span>
              </div>
              <div className="mt-3 text-[0.88rem] font-semibold uppercase tracking-wide text-navy">
                {s.label}
              </div>
              <div className="mt-1.5 text-[0.85rem] text-muted">
                {s.made} of {s.of}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
