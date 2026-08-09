# Edutattva Classes — Marketing Website

Production marketing site for **Edutattva Classes** — an IIT-JEE | NEET | Foundation coaching
institute in Chennai (Siruseri / Kelambakkam). Built with **Next.js 16 (App Router) + TypeScript +
Tailwind CSS v4**, statically exportable to a portable `out/` folder with no server dependency.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  (preview)
npm run build    # type-checks + generates the static site into ./out
```

Open `out/index.html` via any static host (the export uses `trailingSlash`, so serve the folder
rather than double-clicking files) — e.g. `npx http-server out`.

## Structure

```
app/                 One route per page (/, about, programs, foundation, edu-ignite,
                     edu-edge, faculty, results, admissions, contact) + layout, globals.css, icon.svg
components/          Header, Footer, UtilityBar, FloatingButtons, Logo, Icon, Eyebrow, ExpBadge,
                     IconCircle, SectionHeading, Placeholder, Reveal, StatStrip, ProgramCard,
                     E4Loop, CTABand, OnlineSection, FeeTable, Testimonials, Accordion,
                     EnquiryForm, ResultsTabs
lib/data.ts          Single source of truth for all brochure content (programs, fees, faculty, FAQs…)
app/_archive/        Unused-by-routing alternates (Next skips `_`-prefixed folders)
reference/           Original poster (poster.jpeg) + 2026 brochure PDF
```

## Program tiers

Each **delivery mode is a named tier** of the program, and both program pages carry their own
Online section (`components/OnlineSection.tsx`, anchored at `#online`):

| Mode | Grades 9–10 | Grades 11–12 |
| --- | --- | --- |
| Online (live streaming) | Ignite Online — ₹50,000 | Edu Edge Online — ₹50,000 / ₹40,000 |
| Hybrid (Sunday offline + weekday online) | Edu Ignite — ₹65,000 | Edu Edge — ₹80,000 / ₹75,000 |
| Integrated (within school hours) | Ignite+ — ₹80,000 | Edu Edge+ — ₹100,000 |

Online fees exclude study material (books ₹5,000 separately). Single-subject tutoring is offered on
Hybrid & Online at ₹50,000 with books / ₹30,000 without. All of this lives in `lib/data.ts` and is
rendered by `components/FeeTable.tsx` via its `onlineNote` / `tutoringNote` props.

## Alternate versions (kept for later use)

- `components/CTABandAlt.tsx` — the original CTA band with the "Book Free Counselling" button.
  The live `CTABand` uses a WhatsApp button (pre-filled message) + phone number.
- `app/_archive/admissions-with-form.tsx` — the original admissions page: four steps (including
  "Assessment") and the full `EnquiryForm`. The live page is WhatsApp-led with three steps.

## Design system (see `app/globals.css`)

- **Palette** (Tailwind `@theme` tokens): `navy #0A1F44`, `royal #1B4AA0`, `sky #EAF1FB`,
  `gold #F5B700`, `crimson #C8102E`, `lime #B7CE1C`, ink `#111827`.
- **Type**: Archivo (display), Barlow Condensed (badges / stat numbers / eyebrows), Inter (body) —
  self-hosted via `next/font`.
- **Signature element**: the crimson `.exp-badge` experience pill, reused on faculty & program cards.
- **Motifs**: gold `●●●` eyebrow, capsule cards, navy footer band with gold phone number.
- Scroll reveals + stat counters use `IntersectionObserver` with a **failsafe timeout**, so content
  is never left hidden if the observer doesn't fire. `prefers-reduced-motion` is fully respected.

## Real assets

Extracted from the 2026 brochure `.pptx` and stored under `public/`:

- **Logo** — `public/brand/logo-mark.png` (open-book + star emblem), used in header, footer & favicon.
- **Faculty portraits** — `public/faculty/{nishant,sourav,kailasam,rahul,bhargava}.png`, wired to `lib/data.ts`
  (`facultySpotlight`, `leadership`) and shown on the home hero trio, home faculty spotlight, faculty page and
  About co-founders. Identities were verified against the brochure's slide geometry + poster labels.
- **Students / ambience** — `public/photos/{students,studying,mentor,vision}.jpg` on Foundation, About & elsewhere.
- **Edu Edge Online seal** — `public/edu-edge/seal.png` (real ₹50,000 gold seal).

## Still placeholder / TODO (marked with `data-placeholder`)

- Results data — rank cards & year tabs in `components/ResultsTabs.tsx` are structured for real AIR/name/exam.
- Contact page Sunday / public-holiday hours (`[ … ]`) and the Google Maps iframes (currently
  area-name search embeds; drop in exact coords). Mon–Sat hours are confirmed: 9:00 AM – 8:00 PM.
- Open Graph share image.
- `components/EnquiryForm.tsx` is no longer on a live route (the admissions page is WhatsApp-led).
  It is still referenced by `app/_archive/admissions-with-form.tsx` and still has
  `// TODO: connect backend` if it is ever restored.

## Global constants

Social handles and contact details are all in the `site` object in `lib/data.ts` — edit once,
updates everywhere (footer, contact page, email composer):

```ts
site.social.instagram   // https://www.instagram.com/edutattva.classes/
site.social.linkedin    // https://www.linkedin.com/company/edutattva/
site.social.youtube     // https://www.youtube.com/@Edutattvaclasses
site.social.facebook    // https://www.facebook.com/Edutattva
site.social.email       // enquiries.edutattva@gmail.com
whatsappLink(message?)  // WhatsApp deep link, optionally pre-filling the chat
```

The Online section backdrop is `public/photos/online-class.jpg`, scaled to full width and faded
vertically by an overlaid navy gradient in `components/OnlineSection.tsx`.
