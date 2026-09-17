/* ============================================================
   Site-wide promotion slot.

   TO TAKE THE PROMOTION DOWN: set `activePromo` to null (bottom of file).
   TO PUT A NEW ONE UP:        add a Promo object and point `activePromo` at it.

   Nothing else in the codebase needs to change. When `activePromo` is null the
   notice is not rendered at all and the site behaves as if it never existed.
   `showFrom` / `showUntil` additionally gate it at runtime, so a promo can be
   scheduled ahead of time and will retire itself without a redeploy.
   ============================================================ */

export type Promo = {
  /** Stable id — also the sessionStorage key, so a new promo re-shows itself. */
  id: string;
  title: string;
  eyebrow: string;
  grades: string;
  gradesShort: string;
  blurb: string;
  blurbShort: string;
  /** Summary line shown in the collapsed bar on large screens. */
  barSummary: string;
  details: { k: string; v: string }[];
  /** Label suffix on the register button, e.g. "₹200". */
  price: string;
  /** Google Form embed URL (…/viewform?embedded=true). */
  formEmbedUrl: string;
  /** Same form, for the "open in a new tab" fallback. */
  formUrl: string;
  /** Optional downloadable brochure, served from /public. No button if absent. */
  brochureUrl?: string;
  enquiryMessage: string;
  /** Countdown target, ISO 8601 with offset. */
  registrationCloses: string;
  /** Optional display window. Omit either side to leave it open-ended. */
  showFrom?: string;
  showUntil?: string;
};

const merit2026: Promo = {
  id: "merit-2026",
  title: "MERIT 2026",
  eyebrow: "Scholarship cum Admission Test",
  grades: "Grades 5 to 11",
  gradesShort: "Class 5–11",
  blurb:
    "Recognise the potential. Plan the next step. A free subject-wise report, a preparation roadmap, and scholarship & admission consideration for Foundation, JEE and NEET.",
  blurbShort:
    "For grades 5 to 11 — a free subject-wise report, a preparation roadmap, and scholarship & admission consideration.",
  barSummary: "Scholarship cum Admission Test · Sun 11 Oct · Class 5–11 · ₹200",
  details: [
    { k: "Test date", v: "Sun, 11 Oct 2026" },
    { k: "Fee", v: "₹200" },
    { k: "Mode", v: "Offline, MCQ" },
    { k: "Duration", v: "2–3 hrs" },
  ],
  price: "₹200",
  formEmbedUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSe2NzdQYkyDSJLc7IXumbvXLy-W8fuwwJgYk7ILOZvwAfZP-A/viewform?embedded=true",
  formUrl: "https://forms.gle/htzXa1U7LedMKymZ8",
  brochureUrl: "/merit-brochure-26.pdf",
  enquiryMessage: "I'd like to know more about MERIT 2026",
  /** Assumed to be the night before the test — update once the real deadline is set. */
  registrationCloses: "2026-10-10T23:59:59+05:30",
  showUntil: "2026-10-11T23:59:59+05:30",
};

/** The promotion currently on the site. Set to null to remove it. */
export const activePromo: Promo | null = merit2026;

/** True when `promo` exists and `now` falls inside its display window. */
export function isPromoLive(promo: Promo | null, now: number = Date.now()): promo is Promo {
  if (!promo) return false;
  if (promo.showFrom && now < new Date(promo.showFrom).getTime()) return false;
  if (promo.showUntil && now > new Date(promo.showUntil).getTime()) return false;
  return true;
}
