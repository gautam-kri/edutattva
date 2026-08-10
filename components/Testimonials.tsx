"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials, type Testimonial } from "@/lib/testimonials";
import Icon from "./Icon";

/** "Edu Edge, Siruseri · Class of 2025" — skips whatever is missing. */
function metaLine(t: Testimonial) {
  const place = [t.program, t.campus].filter(Boolean).join(", ");
  return [place, t.batch].filter(Boolean).join(" · ");
}

export default function Testimonials() {
  const scroller = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const scrollToIndex = useCallback((idx: number) => {
    const el = scroller.current;
    const card = el?.children[idx] as HTMLElement | undefined;
    if (!el || !card) return;
    // Set it here rather than waiting on the scroll listener, so the dots respond
    // to a click immediately. The listener still corrects this after a touch swipe.
    setActive(idx);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }, []);

  /* How many cards fit changes with the breakpoint, so derive the number of
     scroll positions from the measured track rather than hard-coding it. */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
      const step = first.offsetWidth + gap;
      const visible = Math.max(1, Math.round(el.clientWidth / step));
      setPages(Math.max(1, count - visible + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Card width settles after the track's, so watch a card too or the first
    // measurement can be taken mid-layout and yield the wrong page count.
    if (el.children[0]) ro.observe(el.children[0]);
    return () => ro.disconnect();
  }, [count]);

  /* Keep the dots in sync with wherever the track actually is, including
     after a touch swipe. */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    /* Debounced, not per-frame: re-rendering mid-animation makes the mandatory
       snap re-evaluate and yank a smooth scrollTo back to its start. Waiting for
       the track to settle keeps the animation intact. */
    let timer = 0;
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const kids = [...el.children] as HTMLElement[];
        let best = 0;
        let bestDist = Infinity;
        kids.forEach((c, idx) => {
          const dist = Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft);
          if (dist < bestDist) {
            bestDist = dist;
            best = idx;
          }
        });
        setActive(best);
      }, 140);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (paused || pages < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setTimeout(() => scrollToIndex(active >= pages - 1 ? 0 : active + 1), 6000);
    return () => clearTimeout(t);
  }, [paused, pages, active, scrollToIndex]);

  if (count === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1"
      >
        {testimonials.map((t, idx) => {
          const meta = metaLine(t);
          return (
            <figure
              key={idx}
              className="flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border-l-4 border-gold bg-white p-6 shadow-[var(--shadow-card)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
            >
              <Icon name="quote" size={28} className="text-gold" />
              <blockquote className="mt-3 flex-1 text-[1.02rem] leading-relaxed text-navy">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-right">
                <p className="text-[0.95rem] font-bold text-navy">
                  &mdash; {t.parentName}
                  {t.studentName && (
                    <span className="font-medium text-muted">, parent of {t.studentName}</span>
                  )}
                </p>
                {t.outcome && (
                  <p className="mt-1 text-[0.88rem] font-semibold text-royal">{t.outcome}</p>
                )}
                {meta && <p className="mt-0.5 text-[0.8rem] text-muted">{meta}</p>}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {pages > 1 && (
        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            aria-label="Previous testimonials"
            className="grid h-10 w-10 place-items-center rounded-full border border-sky-200 text-navy transition-colors hover:bg-sky"
          >
            <Icon name="chevron" size={20} className="rotate-90" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: pages }, (_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                aria-current={idx === active}
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: idx === active ? 26 : 10,
                  background: idx === active ? "var(--color-gold)" : "var(--color-sky-200)",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(pages - 1, active + 1))}
            aria-label="Next testimonials"
            className="grid h-10 w-10 place-items-center rounded-full border border-sky-200 text-navy transition-colors hover:bg-sky"
          >
            <Icon name="chevron" size={20} className="-rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
}
