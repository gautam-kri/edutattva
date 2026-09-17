"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { LAYOUT_EVENT, PAGE_READY_EVENT } from "@/lib/pageReady";

/**
 * Hero grid: all three teachers on the first screen, or none of them.
 *
 * On a short screen the trio would be sliced by the fold. Rather than showing a
 * fraction of a teacher, this checks whether all three fit. If they do, nothing
 * happens. If they don't, the copy column is given the full height of the first
 * screen and its blocks are spread through it, which both spaces the copy out
 * properly and pushes the trio to start exactly at the fold. Every teacher stays
 * in the document either way and scrolls into view normally.
 *
 * The sums are done in hero-relative coordinates against the known header and
 * promo bar heights, not against live viewport positions. That matters: the
 * promo bar animates in over half a second, so anything measured from the live
 * layout settles late and visibly re-jigs the hero after the panel closes. This
 * way the answer is identical before, during and after that transition, so it
 * can be applied once before the first paint and never moves again.
 *
 * Only runs where the hero is set to fill the screen: under the two-column
 * breakpoint and on a viewport shorter than 1024px. Desktop is never touched.
 */

const MAX_WIDTH = 1110;
const MAX_HEIGHT = 1024;
/** Sticky header height; matches Header's h-[72px]. */
const HEADER_H = 72;
/** Collapsed promo bar; matches --promo-bar in PromoNotice. */
const BAR_SM = 52;
const BAR_MD = 56;
/** How much each gap in the copy may grow when it is spread out. */
const MAX_EXTRA_GAP = 30;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function HeroFit({
  promoBar,
  className,
  children,
}: {
  /** Whether a collapsed promo bar sits between the header and the hero. */
  promoBar: boolean;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const copy = el.children[0] as HTMLElement | undefined;
    const trio = el.children[1] as HTMLElement | undefined;
    if (!copy || !trio) return;

    // Always start from the natural layout so the maths stays idempotent.
    copy.style.minHeight = "";
    copy.style.display = "";
    copy.style.flexDirection = "";
    copy.style.justifyContent = "";
    copy.style.paddingTop = "";
    copy.style.paddingBottom = "";

    if (window.innerWidth >= MAX_WIDTH || window.innerHeight >= MAX_HEIGHT) return;

    const fold = window.innerHeight;
    const bar = promoBar ? (window.innerWidth >= 768 ? BAR_MD : BAR_SM) : 0;
    const heroTop = HEADER_H + bar;

    // offsetTop/offsetHeight rather than getBoundingClientRect: the faculty
    // column carries a fadeUp animation that translates it 24px, and a rect
    // includes that transform, so the gap read 24px too wide for the first
    // second and the hero re-sized itself once the animation finished.
    const gridOffset = el.offsetTop;
    const copyHeight = copy.offsetHeight;
    const copyOffset = gridOffset + copy.offsetTop;
    const trioBottomOffset = gridOffset + trio.offsetTop + trio.offsetHeight;
    const gap = trio.offsetTop - copy.offsetTop - copyHeight;

    if (heroTop + trioBottomOffset <= fold + 1) return; // all three fit

    const fill = Math.round(fold - (heroTop + copyOffset) - gap);
    if (fill <= copyHeight) return; // no room to spread; leave it alone

    // Open the copy's gaps rather than leaving dead bands around a tight
    // cluster, but only so far: past MAX_EXTRA_GAP the blocks stop reading as
    // one composition, so the remainder becomes symmetric padding.
    const blocks = copy.children.length;
    const free = fill - copyHeight;
    const spread = Math.min(free, Math.max(0, blocks - 1) * MAX_EXTRA_GAP);
    const pad = Math.max(0, Math.round((free - spread) / 2));

    copy.style.minHeight = `${fill}px`;
    copy.style.display = "flex";
    copy.style.flexDirection = "column";
    copy.style.justifyContent = "space-between";
    copy.style.paddingTop = `${pad}px`;
    copy.style.paddingBottom = `${pad}px`;
  }, [promoBar]);

  /**
   * Sizing before the brand faces land gives a different answer, so it is done
   * once against the final metrics. PageSkeleton holds its overlay until the
   * flag below is set, which is what keeps the adjustment off screen instead of
   * shuffling the hero about after the page is already visible.
   */
  const settle = useCallback(() => {
    measure();
    window.__etsHeroReady = true;
  }, [measure]);

  // Faces already cached: settle before the first paint.
  useIsomorphicLayoutEffect(() => {
    if (document.fonts?.status === "loaded") settle();
  }, [settle]);

  useEffect(() => {
    if (document.fonts?.status === "loaded") settle();
    else if (document.fonts?.ready) document.fonts.ready.then(settle).catch(settle);
    else settle();

    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    window.addEventListener(LAYOUT_EVENT, measure);
    window.addEventListener(PAGE_READY_EVENT, measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener(LAYOUT_EVENT, measure);
      window.removeEventListener(PAGE_READY_EVENT, measure);
    };
  }, [measure, settle]);

  return (
    <div ref={ref} data-herofit="" className={className}>
      {children}
    </div>
  );
}
