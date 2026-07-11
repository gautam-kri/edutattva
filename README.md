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
                     E4Loop, CTABand, FeeTable, Testimonials, Accordion, EnquiryForm, ResultsTabs
lib/data.ts          Single source of truth for all brochure content (programs, fees, faculty, FAQs…)
reference/           Original poster (poster.jpeg) + 2026 brochure PDF
```

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
- Contact page office hours (`[ … ]`) and the Google Maps iframes (currently area-name search embeds; drop in exact coords).
- Enquiry form submit handler is front-end only — `// TODO: connect backend` in `components/EnquiryForm.tsx`.
- Social links in the footer, and an Open Graph share image.
