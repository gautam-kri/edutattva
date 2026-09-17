/* ============================================================
   Page-load handshake.

   The skeleton overlay is lifted by a small inline script in the document (see
   PageSkeleton), not by React, so it is never gated on the JS bundle. That
   script owns the signal: it sets `window.__etsPageReady` and fires the event
   below. Anything that must wait for the real page to be on screen — currently
   the promo takeover — subscribes here, so the sequence is always
   skeleton -> page -> promo.
   ============================================================ */

export const PAGE_READY_EVENT = "edutattva:page-ready";

/**
 * Fired when something shifts the page's vertical layout without a resize —
 * currently the promo collapsing into its bar, which moves everything below it
 * down by the bar's height. Anything that measures against the fold listens.
 */
export const LAYOUT_EVENT = "edutattva:layout-change";

export function notifyLayoutChange() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(LAYOUT_EVENT));
}

declare global {
  interface Window {
    __etsPageReady?: boolean;
    /** Set by HeroFit once the hero has been sized against the final fonts. */
    __etsHeroReady?: boolean;
    /** Set by PromoNotice once the panel is at its final height. */
    __etsPromoReady?: boolean;
  }
}

export function isPageReady(): boolean {
  return typeof window !== "undefined" && window.__etsPageReady === true;
}

/**
 * Runs `cb` once the page is ready, immediately if that already happened.
 * Returns an unsubscribe function.
 */
export function onPageReady(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (isPageReady()) {
    cb();
    return () => {};
  }
  window.addEventListener(PAGE_READY_EVENT, cb, { once: true });
  return () => window.removeEventListener(PAGE_READY_EVENT, cb);
}
