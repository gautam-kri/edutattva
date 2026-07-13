"use client";

import { useState } from "react";

const years = ["2026", "2025", "2024"];

const statLabels = [
  "Top AIR (JEE & NEET)",
  "Selections (JEE / NEET)",
  "90%+ in Boards",
  "State & National Toppers",
];

// Placeholder year-wise statistics — real figures drop straight into this shape.
const yearStats: Record<string, string[]> = {
  "2026": ["—", "—", "—", "—"],
  "2025": ["—", "—", "—", "—"],
  "2024": ["—", "—", "—", "—"],
};

export default function ResultsTabs() {
  const [year, setYear] = useState(years[0]);
  const values = yearStats[year];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Results by year"
        className="mx-auto flex w-fit gap-1 rounded-full border border-sky-200 bg-white p-1"
      >
        {years.map((y) => {
          const active = y === year;
          return (
            <button
              key={y}
              role="tab"
              aria-selected={active}
              onClick={() => setYear(y)}
              className={`rounded-full px-5 py-2 text-[0.95rem] font-bold transition-colors ${
                active ? "bg-navy text-white" : "text-navy hover:bg-sky"
              }`}
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              {y}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statLabels.map((label, i) => (
          <div key={label} className="card p-7 text-center" data-placeholder="true">
            <div
              className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-none text-royal"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              {values[i]}
            </div>
            <div className="mt-3 text-[0.82rem] font-semibold uppercase tracking-wide text-navy">
              {label}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Year-wise statistics for <strong className="text-navy">{year}</strong> will populate here as
        each result season closes.
      </p>
    </div>
  );
}
