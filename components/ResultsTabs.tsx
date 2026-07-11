"use client";

import { useState } from "react";
import Placeholder from "./Placeholder";
import Icon from "./Icon";

const years = ["2026", "2025", "2024"];
const exams = ["JEE Advanced", "JEE Main", "NEET", "JEE Advanced", "NEET", "JEE Main"];

export default function ResultsTabs() {
  const [year, setYear] = useState(years[0]);

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

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam, i) => (
          <div key={i} className="card overflow-hidden text-center" data-placeholder="true">
            <Placeholder label="Student Photo" icon="cap" aspect="aspect-square" rounded="rounded-none" />
            <div className="p-6">
              <span className="chip chip-crimson">AIR ____</span>
              <h3 className="mt-3 text-[1.2rem] text-navy">[ Student Name ]</h3>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted">
                <Icon name="cap" size={16} className="text-royal-400" />
                {exam} {year}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Showing placeholder cards for <strong className="text-navy">{year}</strong>. Real ranks,
        photos and names drop straight into this layout.
      </p>
    </div>
  );
}
