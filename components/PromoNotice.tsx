"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { site, whatsappLink } from "@/lib/data";
import { activePromo, isPromoLive, type Promo } from "@/lib/promo";
import { onPageReady, notifyLayoutChange } from "@/lib/pageReady";
import Icon from "./Icon";

/**
 * Promotion notice — design option 3b (desktop) / 4a (mobile).
 *
 * On arrival a full-viewport navy panel sits beneath the sticky header.
 * Dismissing it sinks the panel into a slim sticky bar under the nav and the
 * page slides down to make room. Only the promo wordmark travels and shrinks
 * between the two states; everything else cross-fades. Clicking the bar grows
 * the panel back.
 *
 * Morph: the wordmark is rendered in-flow in both the panel and the bar
 * (`bigRef` / `smallRef`). During a transition both are hidden and a single
 * absolutely positioned clone (`morphRef`) animates between their measured
 * positions, so the rest of the layout can stay fully responsive.
 *
 * This is phase 3 of the page load. PageSkeleton paints the structural
 * skeleton instantly (phase 1) and lifts once the page is styled and the fonts
 * are in (phase 2); only then does this panel bleed down over the page — the
 * navy curtain drops to full height, then the glows bloom, a light sweep
 * crosses it and the gold rule draws out. The promo never competes with the
 * page for the first paint. A visitor who already dismissed it this session
 * gets the collapsed bar with none of the entrance.
 *
 * The whole component is gated on `activePromo`; see lib/promo.ts.
 */

const HEADER_H = 72; // matches Header's h-[72px]
/**
 * Height of the open panel, set inline so the layout never depends on a
 * hand-authored CSS class being present. `.promo-h-open` stays on the element
 * purely as a 100vh fallback for browsers without dvh, which inline dvh beats
 * wherever it is supported.
 */
const OPEN_H = `calc(100dvh - ${HEADER_H}px)`;
const DURATION = 550;
const EASE = "cubic-bezier(.25,1,.5,1)";

const display = { fontFamily: "var(--font-display)" } as const;
const condensed = { fontFamily: "var(--font-condensed)" } as const;

const pad = (n: number) => String(n).padStart(2, "0");

type Box = { left: number; top: number; fontSize: string };

function useCountdown(deadline: string) {
  const [msLeft, setMsLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = new Date(deadline).getTime();
    const tick = () => setMsLeft(Math.max(0, end - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);
  if (msLeft === null) return null;
  const s = Math.floor(msLeft / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    over: msLeft === 0,
  };
}

export default function PromoNotice() {
  // Build-time removal: with no promo configured nothing is rendered or shipped.
  if (!activePromo) return null;
  return <PromoPanel promo={activePromo} />;
}

function PromoPanel({ promo }: { promo: Promo }) {
  const [live, setLive] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [animating, setAnimating] = useState(false);
  /*
   * `entered` starts true so the panel is full-height in the server HTML and
   * takes the screen over on the first paint. It used to start false and open
   * once React had hydrated, which meant that on a slow phone the page sat
   * there fully readable for seconds before the takeover turned up.
   */
  const [entered, setEntered] = useState(true);
  const [bled, setBled] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  // Height transitions are enabled only after hydration, so a returning
  // visitor's remembered "dismissed" state is applied without a jump.
  const [ready, setReady] = useState(false);

  const panelRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const smallRef = useRef<HTMLSpanElement>(null);
  const morphRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const collapsedRef = useRef(false);
  collapsedRef.current = collapsed;

  const cd = useCountdown(promo.registrationCloses);
  const storageKey = `promo-dismissed:${promo.id}`;

  /*
   * Runs while the document is parsing. The panel ships open, so a visitor who
   * already dismissed it this session would otherwise see the takeover again
   * until React caught up. This collapses it to the bar before anything paints;
   * React then hydrates into the same state.
   */
  const collapseBoot = `(function(){
try{var e=new Date(${JSON.stringify(promo.registrationCloses)}).getTime();
var s=Math.max(0,Math.floor((e-Date.now())/1000));
var v={d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60};
var n=document.querySelectorAll("[data-cd]");
for(var i=0;i<n.length;i++){var k=v[n[i].getAttribute("data-cd")];n[i].textContent=(k<10?"0":"")+k;}}catch(e){}
try{if(sessionStorage.getItem(${JSON.stringify(
      storageKey
    )})!=="1")return;var w=document.getElementById("promo-wrap"),p=document.getElementById("promo-panel");if(!w||!p)return;var b=(window.innerWidth>=768?56:52)+"px";w.style.height=b;p.style.height=b;}catch(e){}})();`;

  // Re-check the display window on every load: a promo baked into the static
  // export at build time retires itself once its window has passed.
  useLayoutEffect(() => {
    if (!isPromoLive(promo, Date.now())) {
      setLive(false);
      window.__etsPromoReady = true;
      return;
    }
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(storageKey) === "1";
    } catch {
      /* storage unavailable — keep the panel open */
    }
    if (dismissed) {
      setCollapsed(true);
      setBled(true);
    }
    /*
     * Open to full height here, before the first paint. `ready` is still false
     * at this point so the height transition is off and the panel simply is
     * full-screen rather than growing into it. Waiting for page-ready instead
     * meant the skeleton lifted first and the visitor watched the page for the
     * best part of a second before the takeover arrived. PageSkeleton holds its
     * overlay until the flag below is set.
     */
    window.__etsPromoReady = true;
  }, [promo, storageKey]);

  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(timer.current);
    };
  }, []);

  // The panel is already full-screen by now; this is just the atmospheric
  // arrival — glows, light sweep, the gold rule drawing out — which plays once
  // the page is actually on screen.
  useEffect(() => {
    let t = 0;
    const off = onPageReady(() => {
      if (collapsedRef.current) {
        setBled(true);
        return;
      }
      t = window.setTimeout(() => setBled(true), 160);
    });
    return () => {
      off();
      window.clearTimeout(t);
    };
  }, []);

  // The bar appearing or disappearing moves the page below it; tell anything
  // that measures against the fold once the height transition has finished.
  useEffect(() => {
    const t = window.setTimeout(notifyLayoutChange, DURATION + 60);
    return () => window.clearTimeout(t);
  }, [collapsed, entered]);

  // One owner for the scroll lock: the open panel and the form modal share it.
  const lockScroll = live && ((entered && !collapsed) || formOpen);
  useEffect(() => {
    if (!lockScroll) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lockScroll]);

  // Escape closes the form first, then the panel.
  useEffect(() => {
    if (!live) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (formOpen) setFormOpen(false);
      else if (!collapsed) dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, formOpen, collapsed]);

  function boxOf(el: HTMLElement): Box {
    const p = panelRef.current!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { left: r.left - p.left, top: r.top - p.top, fontSize: getComputedStyle(el).fontSize };
  }

  function place(el: HTMLElement, b: Box) {
    el.style.left = `${b.left}px`;
    el.style.top = `${b.top}px`;
    el.style.fontSize = b.fontSize;
  }

  /** Fly the wordmark clone from one in-flow wordmark to the other. */
  function morph(from: HTMLElement | null, to: HTMLElement | null) {
    const m = morphRef.current;
    if (!m || !from || !to || !panelRef.current) return;
    m.style.transition = "none";
    place(m, boxOf(from));
    void m.offsetWidth; // commit the start position before transitioning
    m.style.transition = `left ${DURATION}ms ${EASE}, top ${DURATION}ms ${EASE}, font-size ${DURATION}ms ${EASE}`;
    place(m, boxOf(to));
    setAnimating(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAnimating(false), DURATION + 60);
  }

  function dismiss() {
    if (collapsed) return;
    // The control being clicked is about to sit inside an inert subtree; if it
    // still holds focus the browser relocates focus and scrolls the page down by
    // roughly the bar height, clipping the top of the hero.
    (document.activeElement as HTMLElement | null)?.blur?.();
    holdScroll(window.scrollY);
    morph(bigRef.current, smallRef.current);
    setCollapsed(true);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  }

  /** Pin the scroll position across the height transition. */
  function holdScroll(y: number) {
    const started = performance.now();
    const tick = () => {
      if (window.scrollY !== y) window.scrollTo(0, y);
      if (performance.now() - started < DURATION + 120) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function expand() {
    if (!collapsed) return;
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    morph(smallRef.current, bigRef.current);
    setCollapsed(false);
  }

  if (!live) return null;

  const heightTransition = ready ? `height ${DURATION}ms ${EASE}` : "none";
  const askHref = whatsappLink(promo.enquiryMessage);
  // Before the page is ready the panel has no height at all, so it neither
  // paints nor covers anything during the skeleton phase.
  const panelH = collapsed ? "var(--promo-bar)" : entered ? OPEN_H : "0px";

  return (
    <>
      <div
        id="promo-wrap"
        suppressHydrationWarning
        className="sticky z-[45] [--promo-bar:52px] md:[--promo-bar:56px]"
        style={{ top: HEADER_H, height: collapsed ? "var(--promo-bar)" : 0, transition: heightTransition }}
      >
        <section
          ref={panelRef}
          id="promo-panel"
          suppressHydrationWarning
          data-promo-panel=""
          aria-label={`${promo.title} — ${promo.eyebrow}`}
          className={`dotgrid absolute inset-x-0 top-0 overflow-hidden bg-navy text-white shadow-[0_18px_40px_-18px_rgba(6,21,48,0.55)] ${
            collapsed ? "" : "promo-h-open"
          }`}
          style={{ height: panelH, transition: heightTransition }}
        >
          {/* ---------- Expanded panel ---------- */}
          <div
            ref={scrollRef}
            inert={collapsed}
            style={{ height: OPEN_H }}
            className={`promo-h-open absolute inset-x-0 top-0 flex flex-col overflow-y-auto overflow-x-hidden transition-opacity duration-300 ${
              collapsed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {/* Atmospheric bleed layers */}
            <div
              className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
                bled ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            >
              <div
                className="absolute -right-28 -top-36 h-96 w-96 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, var(--color-gold), transparent 70%)" }}
              />
              <div
                className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
                style={{ background: "radial-gradient(circle, var(--color-lime), transparent 70%)" }}
              />
              {bled && (
                <div
                  className="promo-sweep absolute inset-y-0 -left-1/3 w-1/3"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(245,183,0,0.14), rgba(183,206,28,0.10), transparent)",
                  }}
                />
              )}
            </div>

            {/* Panel content */}
            <div
              className={`promo-content relative flex shrink-0 grow basis-auto flex-col transition-opacity duration-500 ${
                entered ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss"
                className="absolute right-6 top-5 z-10 hidden h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:grid"
              >
                <Icon name="close" size={18} />
              </button>

              <div
                style={{ "--pv": "clamp(0.2rem,1.05vh,1.05rem)" } as CSSProperties}
                className="container-x relative flex shrink-0 grow basis-auto flex-col items-center justify-center py-[calc(var(--pv)*1.5)] text-center"
              >
                <p
                  className="inline-flex items-center gap-2.5 text-[min(0.82rem,1.9vh)] font-bold uppercase tracking-[0.14em] text-white/85 md:text-[min(0.95rem,1.9vh)]"
                  style={condensed}
                >
                  <span className="text-[0.55em] text-gold" aria-hidden="true">
                    ●●●
                  </span>
                  {promo.eyebrow}
                  <span className="hidden md:inline"> · {promo.grades}</span>
                </p>

                <div
                  ref={bigRef}
                  className={`mt-[calc(var(--pv)*1.75)] whitespace-nowrap text-[min(9.5vw,6.2vh,4.75rem)] font-extrabold leading-none tracking-[-0.02em] ${
                    animating ? "invisible" : ""
                  }`}
                  style={display}
                >
                  {promo.title}
                </div>

                <div
                  className="mt-[calc(var(--pv)*1.75)] h-1 rounded-full transition-[width] duration-700"
                  style={{
                    background: "linear-gradient(90deg,var(--color-gold),var(--color-lime))",
                    width: bled ? "4rem" : "0rem",
                  }}
                  aria-hidden="true"
                />

                <p className="mt-[calc(var(--pv)*1.75)] max-w-[20rem] text-[min(0.92rem,2.15vh)] leading-snug text-white/80 md:hidden">
                  {promo.blurbShort}
                </p>
                <p className="mt-[calc(var(--pv)*1.75)] hidden max-w-[40rem] text-[min(1.05rem,2.3vh)] leading-relaxed text-white/80 md:block">
                  {promo.blurb}
                </p>

                <dl className="mt-[calc(var(--pv)*2.5)] grid w-full max-w-[22rem] grid-cols-2 gap-[var(--pv)] text-left md:flex md:max-w-[48rem] md:gap-0 md:border-y md:border-white/20">
                  {promo.details.map((d, i) => (
                    <div
                      key={d.k}
                      className={`rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-[calc(var(--pv)*0.85)] md:flex-1 md:rounded-none md:border-0 md:bg-transparent md:px-4 md:py-[calc(var(--pv)*1.5)] ${
                        i < promo.details.length - 1 ? "md:border-r md:border-white/20" : ""
                      }`}
                    >
                      <dt
                        className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-gold"
                        style={condensed}
                      >
                        {d.k}
                      </dt>
                      <dd className="mt-1 text-[0.95rem] font-bold md:text-[1.05rem]" style={display}>
                        {d.v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-[calc(var(--pv)*2.5)] flex flex-col items-center gap-[var(--pv)]">
                  {cd?.over ? (
                    <p className="text-[0.95rem] font-semibold text-white/80">Registration is now closed.</p>
                  ) : (
                    <>
                      <span
                        className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-white/70"
                        style={condensed}
                      >
                        Registration closes in
                      </span>
                      {/*
                        Below ~700px of viewport the four boxes are the single
                        biggest block in the panel, so the same four numbers are
                        shown on one line instead. Nothing is dropped, and the
                        format matches the collapsed bar.
                      */}
                      <div className="flex gap-2 [@media(max-height:700px)]:hidden md:gap-2.5">
                        {(
                          [
                            ["DAYS", "d", cd?.d],
                            ["HRS", "h", cd?.h],
                            ["MIN", "m", cd?.m],
                            ["SEC", "s", cd?.s],
                          ] as const
                        ).map(([label, unit, value]) => (
                          <div
                            key={label}
                            className="flex w-[4.4rem] flex-col items-center gap-1 rounded-xl border border-white/20 bg-white/[0.08] py-[var(--pv)] md:w-[5.75rem]"
                          >
                            <span
                              data-cd={unit}
                              suppressHydrationWarning
                              className="text-[min(1.6rem,3.6vh)] font-extrabold leading-none tabular-nums md:text-[min(2.25rem,4.4vh)]"
                              style={condensed}
                            >
                              {value === undefined ? "00" : pad(value)}
                            </span>
                            <span
                              className="text-[0.65rem] font-bold leading-none tracking-[0.12em] text-gold"
                              style={condensed}
                            >
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div
                        className="hidden items-baseline gap-1.5 rounded-xl border border-white/20 bg-white/[0.08] px-3.5 py-1.5 text-[1.05rem] font-extrabold tabular-nums text-white [@media(max-height:700px)]:flex"
                        style={condensed}
                      >
                        <span data-cd="d" suppressHydrationWarning>
                          {cd === null ? "00" : pad(cd.d)}
                        </span>
                        <span className="text-[0.7em] text-gold">D</span>
                        <span data-cd="h" suppressHydrationWarning>
                          {cd === null ? "00" : pad(cd.h)}
                        </span>
                        <span className="text-[0.7em] text-gold">H</span>
                        <span data-cd="m" suppressHydrationWarning>
                          {cd === null ? "00" : pad(cd.m)}
                        </span>
                        <span className="text-[0.7em] text-gold">M</span>
                        <span data-cd="s" suppressHydrationWarning>
                          {cd === null ? "00" : pad(cd.s)}
                        </span>
                        <span className="text-[0.7em] text-gold">S</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-[calc(var(--pv)*2.25)] flex w-full max-w-[20rem] flex-col gap-[var(--pv)] md:max-w-none md:flex-row md:flex-wrap md:justify-center md:gap-3">
                  <button
                    type="button"
                    onClick={() => setFormOpen(true)}
                    className="btn btn-gold w-full py-[calc(var(--pv)*1.2)] md:w-auto md:px-7"
                  >
                    Register — {promo.price}
                  </button>
                  <a
                    href={askHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost w-full py-[calc(var(--pv)*1.2)] md:w-auto"
                  >
                    <Icon name="whatsapp" size={19} /> Ask on WhatsApp
                  </a>
                  <a href={`tel:${site.phoneDial}`} className="btn btn-ghost w-full py-[calc(var(--pv)*1.2)] md:w-auto">
                    <Icon name="phone" size={18} /> Call {site.phoneDisplay}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={dismiss}
                  className="mt-[calc(var(--pv)*1.75)] text-[min(0.95rem,2.1vh)] font-medium text-white/70 underline underline-offset-4 transition-colors hover:text-white"
                >
                  <span className="md:hidden">Maybe later</span>
                  <span className="hidden md:inline">Maybe later — continue to the site</span>
                </button>
              </div>
            </div>
          </div>

          {/* ---------- Collapsed bar ---------- */}
          <div
            inert={!collapsed}
            className={`absolute inset-x-0 top-0 h-[var(--promo-bar)] transition-opacity duration-300 ${
              collapsed ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="container-x flex h-full items-center gap-3 md:gap-5">
              <button
                type="button"
                onClick={expand}
                aria-expanded={!collapsed}
                aria-label={`Show ${promo.title} details`}
                className="flex h-full min-w-0 flex-1 items-center gap-3 text-left md:gap-5"
              >
                <span
                  ref={smallRef}
                  className={`inline-block shrink-0 text-[1.05rem] font-extrabold leading-none tracking-[-0.02em] md:text-[1.25rem] ${
                    animating ? "invisible" : ""
                  }`}
                  style={display}
                >
                  {promo.title}
                </span>
                <span className="hidden truncate text-[0.85rem] font-medium text-sky-200 lg:inline">
                  {promo.barSummary}
                </span>
                {cd && !cd.over && (
                  <span
                    className="ml-auto shrink-0 text-[0.82rem] font-bold tabular-nums tracking-[0.04em] text-gold md:text-[0.95rem]"
                    style={condensed}
                  >
                    {pad(cd.d)}D : {pad(cd.h)}H : {pad(cd.m)}M
                    <span className="hidden md:inline"> : {pad(cd.s)}S</span>
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="btn btn-gold shrink-0 px-4 py-2.5 text-[0.78rem] md:px-[1.1rem] md:text-[0.82rem]"
              >
                <span>
                  Register<span className="hidden md:inline"> — {promo.price}</span>
                </span>
              </button>
            </div>
          </div>

          {/* ---------- Travelling wordmark ---------- */}
          <div
            ref={morphRef}
            aria-hidden="true"
            className={`pointer-events-none absolute whitespace-nowrap font-extrabold leading-none tracking-[-0.02em] ${
              animating ? "" : "invisible"
            }`}
            style={display}
          >
            {promo.title}
          </div>
        </section>
      </div>

      <script dangerouslySetInnerHTML={{ __html: collapseBoot }} />

      {formOpen && <FormModal promo={promo} onClose={() => setFormOpen(false)} />}
    </>
  );
}

/** The Google Form, embedded in an overlay rather than a new tab. */
function FormModal({ promo, onClose }: { promo: Promo; onClose: () => void }) {
  const [frameLoaded, setFrameLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-navy/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-form-title"
      onClick={onClose}
    >
      <div
        className="flex h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-[var(--shadow-lift)] sm:h-[min(88vh,900px)] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-sky-200 px-5 py-3.5">
          <div className="min-w-0">
            <h2 id="promo-form-title" className="truncate text-[1.05rem] text-navy">
              Register for {promo.title}
            </h2>
            <p className="mt-0.5 truncate text-[0.8rem] text-muted">
              {promo.eyebrow} · {promo.price}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close registration form"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-navy transition-colors hover:bg-sky"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        <div className="relative flex-1 bg-white">
          {!frameLoaded && (
            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <p className="text-[0.95rem] text-muted">Loading the registration form…</p>
            </div>
          )}
          <iframe
            src={promo.formEmbedUrl}
            title={`${promo.title} registration form`}
            className="h-full w-full border-0"
            onLoad={() => setFrameLoaded(true)}
          />
        </div>

        <div className="shrink-0 border-t border-sky-200 px-5 py-3 text-center">
          <p className="text-[0.82rem] text-muted">
            Trouble with the form?{" "}
            <a
              href={promo.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-royal underline underline-offset-2"
            >
              Open it in a new tab
            </a>{" "}
            or call{" "}
            <a href={`tel:${site.phoneDial}`} className="font-semibold text-royal underline underline-offset-2">
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
