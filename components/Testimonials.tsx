"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";
import Icon from "./Icon";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  const t = testimonials[i];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="card relative p-8 md:p-10">
        <Icon name="quote" size={44} className="text-gold" />
        <blockquote
          key={i}
          className="anim-fadeup mt-4 text-[1.12rem] leading-relaxed text-navy md:text-[1.25rem]"
        >
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <span
            className="grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-white"
            style={{ background: "var(--color-royal)", fontFamily: "var(--font-condensed)" }}
            aria-hidden="true"
          >
            <Icon name="users" size={20} />
          </span>
          <span>
            <span className="block font-bold text-navy">{t.name}</span>
            <span className="block text-sm text-muted">{t.role}</span>
          </span>
        </figcaption>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setI((v) => (v - 1 + count) % count)}
          aria-label="Previous testimonial"
          className="grid h-10 w-10 place-items-center rounded-full border border-sky-200 text-navy transition-colors hover:bg-sky"
        >
          <Icon name="chevron" size={20} className="rotate-90" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              aria-current={idx === i}
              className="h-2.5 rounded-full transition-all"
              style={{
                width: idx === i ? 26 : 10,
                background: idx === i ? "var(--color-gold)" : "var(--color-sky-200)",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setI((v) => (v + 1) % count)}
          aria-label="Next testimonial"
          className="grid h-10 w-10 place-items-center rounded-full border border-sky-200 text-navy transition-colors hover:bg-sky"
        >
          <Icon name="chevron" size={20} className="-rotate-90" />
        </button>
      </div>
    </div>
  );
}
