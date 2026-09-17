import Link from "next/link";
import {
  programs,
  facultySpotlight,
  leadership,
  whyEdutattva,
  trustLine,
  site,
} from "@/lib/data";
import Eyebrow from "@/components/Eyebrow";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StatStrip from "@/components/StatStrip";
import ProgramCard from "@/components/ProgramCard";
import E4Loop from "@/components/E4Loop";
import Testimonials from "@/components/Testimonials";
import VideoTestimonials from "@/components/VideoTestimonials";
import PromoNotice from "@/components/PromoNotice";
import CTABand from "@/components/CTABand";
import ExpBadge from "@/components/ExpBadge";
import Photo from "@/components/Photo";
import IconCircle from "@/components/IconCircle";
import Icon, { type IconName } from "@/components/Icon";
import { getVideoTestimonials } from "@/lib/videoTestimonials";
import { activePromo } from "@/lib/promo";
import HeroFit from "@/components/HeroFit";

const whyIcons: IconName[] = ["mentor", "clock", "chart", "handshake"];

// Homepage faculty pyramid: MNT & PSOM enlarged on top, the other three beneath.
const facultyTop = [leadership[0], leadership[1]]; // Nishant (MNT), Sourav (PSOM)
const facultyBottom = [leadership[2], leadership[3], leadership[4]]; // CRK, Rahul, Bhargava

/** Renders a string, turning any "*" into a very subtle superscript footnote marker. */
function MarkedText({ text }: { text: string }) {
  const parts = text.split("*");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && (
            <sup className="align-super text-[0.5em] font-normal text-muted/40" aria-hidden="true">
              *
            </sup>
          )}
        </span>
      ))}
    </>
  );
}

function FacultyCard({
  f,
  delay,
  aspect = "aspect-[4/5]",
}: {
  f: (typeof leadership)[number];
  delay: number;
  aspect?: string;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card card-hover h-full overflow-hidden">
        <Photo
          src={f.photo}
          alt={`${f.name} — ${f.subject}`}
          aspect={aspect}
          rounded="rounded-none"
          position="object-top"
        />
        <div className="relative p-5">
          <div className="absolute -top-5 right-5">
            <ExpBadge years={f.years} />
          </div>
          <h3 className="text-[1.2rem]">{f.name}</h3>
          <p className="mt-1 text-[0.95rem] font-semibold text-royal">
            {f.subject} · {f.alias}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function HomePage() {
  const videos = getVideoTestimonials();
  /**
   * With a promotion on the page the opening is sized down so the hero, the
   * stat strip and the trust line still land inside the first viewport beneath
   * the promo bar. Every element and every word stays; only the scale and the
   * rhythm change, and each variant is a real class on the element rather than
   * an override sheet fighting the utilities.
   */
  const compact = Boolean(activePromo);

  /*
   * Compact keeps the whole hero composition and every word. It buys its space
   * from the generous section padding and by stepping the faculty portraits
   * down a notch, not by crushing the rhythm.
   *
   * Note there is deliberately no max-height breakpoint here. Keying off
   * viewport height alone treats a 1280x800 laptop as a phone, which is what
   * flattened the desktop hero to a six-pixel gutter.
   */
  /*
   * The opening is exactly one viewport tall: 100dvh less the 72px header and
   * the promo bar (52px on phones, 56px from md). The hero is the flex child
   * that absorbs whatever is left over, so the trust line always lands on the
   * fold instead of floating mid-screen with the next section showing beneath.
   * The values below therefore set the hero's MINIMUM; on a tall monitor it
   * grows and the whole opening breathes.
   */
  const openingFrame = compact
    ? "flex min-h-[calc(100dvh-124px)] flex-col md:min-h-[calc(100dvh-128px)]"
    : "";
  /**
   * Below the two-column breakpoint, and only on a screen shorter than 1024px,
   * the hero claims the entire first screen (viewport less the 72px header and
   * the promo bar) so the stat strip begins below the fold. Both queries are
   * width-capped, so desktop is untouched.
   */
  const heroFillsScreen = compact
    ? "[@media(max-width:1109px)_and_(max-height:1023px)]:min-h-[calc(100dvh-124px)] [@media(min-width:768px)_and_(max-width:1109px)_and_(max-height:1023px)]:min-h-[calc(100dvh-128px)]"
    : "";
  const heroSection = compact
    ? `flex shrink-0 grow basis-auto flex-col justify-center ${heroFillsScreen}`
    : "";
  const heroCols = compact
    ? "min-[1110px]:grid-cols-[0.9fr_1.1fr]"
    : "min-[1110px]:grid-cols-[0.82fr_1.18fr]";
  const heroPad = compact ? "py-5 sm:py-7 lg:py-7" : "py-16 lg:py-24";
  const heroGap = compact ? "gap-6 lg:gap-8" : "gap-12";
  const heroTitle = compact
    ? "mt-4 text-[clamp(1.85rem,4.4vw,3.4rem)]"
    : "mt-6 text-[clamp(2rem,5.2vw,4.2rem)]";
  const heroTagline = compact
    ? "mt-3 text-[clamp(1rem,2.6vw,1.35rem)]"
    : "mt-5 text-[clamp(1.1rem,2.2vw,1.5rem)]";
  const heroBlurb = compact
    ? "mt-3 text-[0.95rem] leading-relaxed lg:text-[1rem]"
    : "mt-4 text-[1.05rem] leading-relaxed";
  const heroCtas = compact
    ? "mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap"
    : "mt-8 flex flex-wrap gap-3";
  const heroCtaBtn = compact
    ? "px-2 text-[0.72rem] min-[380px]:px-3 min-[380px]:text-[0.85rem] sm:px-5 sm:text-[0.94rem]"
    : "";
  const heroMeta = compact
    ? "mt-4 gap-x-6 gap-y-2 text-[0.8rem] sm:text-sm"
    : "mt-9 gap-x-7 gap-y-3 text-sm";
  const facultyPad = compact ? "p-2 sm:p-2.5 lg:p-3" : "p-3 sm:p-3.5";
  const facultyName = compact ? "text-[0.85rem] lg:text-[0.95rem]" : "text-[1rem]";
  const facultyRole = compact
    ? "mt-1 text-[0.52rem] tracking-normal min-[380px]:text-[0.58rem] lg:text-[0.68rem] lg:tracking-wide"
    : "mt-1 tracking-wide text-[0.72rem]";
  const facultyYears = compact
    ? "mt-1.5 px-3 py-0.5 text-[0.82rem] lg:text-[0.92rem]"
    : "mt-2.5 px-4 py-1.5 text-[1rem]";
  const facultyCaption = compact
    ? "min-[600px]:px-1 min-[600px]:pb-0.5 min-[600px]:pt-2.5"
    : "min-[600px]:px-1 min-[600px]:pb-1 min-[600px]:pt-3.5";
  // Stacked rows below 600px, three across above it.
  const facultyCard = "flex items-center gap-3 min-[600px]:block";
  const facultyThumb = "w-[4.75rem] shrink-0 min-[600px]:w-auto";

  return (
    <>
      {/* ============ PROMO NOTICE (takeover -> sticky bar) — see lib/promo.ts ============ */}
      <PromoNotice />

      {/* ============ OPENING: hero + stats + trust, one viewport tall ============ */}
      <div className={openingFrame}>

      {/* ============ HERO ============ */}
      <section className={`relative overflow-hidden bg-navy text-white ${heroSection}`}>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg,#0A1F44 0%,#0A1F44 45%,#12305f 100%)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 dotgrid opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle,rgba(27,74,160,0.9),transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-10 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle,rgba(245,183,0,0.55),transparent 70%)" }}
          aria-hidden="true"
        />

        <HeroFit
          promoBar={compact}
          className={`container-x relative grid w-full items-center ${heroCols} ${heroGap} ${heroPad}`}
        >
          {/* Left */}
          <div>
            <div className="anim-fadeup flex flex-wrap items-center gap-2.5">
              <span className="chip chip-gold">{site.admissions}</span>
              <span className="chip chip-lime">Class 6 to 12</span>
            </div>

            <h1 className={`anim-fadeup delay-1 text-white ${heroTitle}`}>
              Where Fundamentals
              <br />
              Become <span className="hl-gold">Excellence</span>
            </h1>

            <p
              className={`anim-fadeup delay-2 font-semibold text-white/90 ${heroTagline}`}
              style={{ fontFamily: "var(--font-condensed)", letterSpacing: "0.02em" }}
            >
              <span className="hl-gold">IITJEE</span> <span className="text-white/40">|</span>{" "}
              <span className="hl-gold">NEET</span> <span className="text-white/40">|</span>{" "}
              <span className="hl-gold">Foundation</span>{" "}
              <span className="text-white/60">— Quality at an Affordable Fee</span>
            </p>

            <p className={`anim-fadeup delay-2 max-w-xl text-white/70 ${heroBlurb}`}>
              A mentorship-driven, systems-led coaching institute in Chennai, built by academic
              minds behind years of IIT-JEE &amp; NEET results.
            </p>

            <div className={`anim-fadeup delay-3 ${heroCtas}`}>
              <Link href="/admissions" className={`btn btn-gold ${heroCtaBtn}`}>
                Book Free Counselling
              </Link>
              <Link href="/programs" className={`btn btn-ghost ${heroCtaBtn}`}>
                Explore Programs
                <Icon name="arrow" size={18} />
              </Link>
            </div>

            <div className={`anim-fadeup delay-4 flex flex-wrap items-center text-white/70 ${heroMeta}`}>
              <span className="flex items-center gap-2">
                <Icon name="users" size={18} className="text-gold" /> 10,000+ students mentored
              </span>
              <span className="flex items-center gap-2">
                <Icon name="cap" size={18} className="text-gold" /> Top ranks, year after year
              </span>
            </div>
          </div>

          {/* Right — faculty trio, made grand */}
          <div className="anim-fadeup delay-3">
            {/*
              While the hero is single-column the trio would otherwise stretch
              the full container and the portraits balloon, so cap it to roughly
              the width it has in the two-column layout. Released at 1110px,
              where it sits in its own column again.
            */}
            <div
              className={`grid grid-cols-1 min-[600px]:mx-auto min-[600px]:max-w-[44rem] min-[600px]:grid-cols-3 min-[1110px]:max-w-none ${
                compact ? "gap-2 sm:gap-3" : "gap-3 sm:gap-4"
              }`}
            >
              {facultySpotlight.map((f) => (
                <div
                  key={f.name}
                  className={`rounded-2xl bg-white/[0.07] shadow-xl ring-1 ring-white/10 backdrop-blur-sm ${facultyCard} ${facultyPad}`}
                >
                  <div className={facultyThumb}>
                    <Photo
                      src={f.photo}
                      alt={`${f.name} — ${f.role}`}
                      aspect={
                        compact
                          ? "aspect-square min-[1110px]:aspect-[4/5]"
                          : "aspect-square min-[600px]:aspect-[3/4]"
                      }
                      rounded="rounded-xl"
                      position="object-top"
                      priority
                    />
                  </div>
                  <div className={`min-w-0 flex-1 text-left min-[600px]:text-center ${facultyCaption}`}>
                    <p className={`font-bold leading-tight text-white ${facultyName}`}>
                      {f.name}
                    </p>
                    <p className={`uppercase text-white/60 ${facultyRole}`}>
                      {f.role}
                    </p>
                    <span
                      className={`inline-block rounded-full bg-crimson font-extrabold leading-none text-white shadow-[0_10px_22px_-10px_rgba(200,16,46,0.8)] ${facultyYears}`}
                      style={{ fontFamily: "var(--font-condensed)" }}
                    >
                      {f.years} YRS
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HeroFit>
      </section>

      {/* ============ STAT STRIP ============ */}
      <section
        className={`bg-navy-900 ${
          compact ? "py-5 sm:py-6" : "py-14"
        }`}
      >
        <div className="container-x">
          <StatStrip compact={compact} />
        </div>
      </section>

      {/* ============ TRUST LINE ============ */}
      <section
        className={`border-b border-sky-200 bg-sky ${
          compact ? "py-4" : "py-8"
        }`}
      >
        <div className={`container-x flex flex-col items-center text-center ${compact ? "gap-2" : "gap-3"}`}>
          <div className={`flex text-gold ${compact ? "gap-2" : "gap-2"}`} aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon
                key={i}
                name="star"
                size={compact ? 18 : 20}
                className="fill-gold"
                style={{ fill: "var(--color-gold)" }}
              />
            ))}
          </div>
          <p
            className={`max-w-2xl font-semibold text-navy ${
              compact
                ? "text-[1rem] leading-snug md:text-[1.1rem]"
                : "text-[1.05rem] md:text-[1.2rem]"
            }`}
          >
            {trustLine.split("FIITJEE & FGS")[0]}
            <span className="hl-crimson">FIITJEE &amp; FGS</span>
          </p>
        </div>
      </section>

      </div>

      {/* ============ PROGRAMS OVERVIEW ============ */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Programs"
            title={
              <>
                One journey, <span className="hl-royal">Grade 6 to 12</span>
              </>
            }
            intro="Structured programs aligned to every stage of a student's academic growth — with continuity, progression and mentorship built in."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.code} delay={i * 80} className="h-full">
                <ProgramCard
                  code={p.code}
                  grades={p.grades}
                  pitch={p.pitch}
                  href={p.slug}
                  accent={p.accent}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ E4 ENGINE TEASER ============ */}
      <section className="section bg-sky">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="The Edutattva Advantage"
              title={
                <>
                  The <span className="hl-royal">E4 Engine</span> — where learning becomes
                  performance
                </>
              }
              intro="Our proprietary Edutattva Execution Engine turns every concept into measurable performance across four tightly integrated stages."
            />
            <Link href="/about" className="btn btn-outline shrink-0">
              How it works <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="mt-10">
            <E4Loop />
          </div>
        </div>
      </section>

      {/* ============ FACULTY SPOTLIGHT ============ */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Faculty"
            title={
              <>
                Taught by the <span className="hl-royal">minds behind the ranks</span>
              </>
            }
            intro="Academic minds behind years of IIT-JEE & NEET results at FIITJEE & FGS."
          />
          {/* MNT & PSOM enlarged on top; CRK, Rahul & Bhargava (his native portrait) beneath, aligned */}
          <div className="mx-auto mt-10 max-w-3xl space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {facultyTop.map((f, i) => (
                <FacultyCard key={f.name} f={f} delay={i * 90} aspect="aspect-[4/5]" />
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {facultyBottom.map((f, i) => (
                <FacultyCard key={f.name} f={f} delay={i * 90} aspect="aspect-[308/546]" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY EDUTATTVA ============ */}
      <section className="section bg-sky">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Edutattva"
            title={
              <>
                Mentorship with full support — <span className="hl-royal">yet affordable</span>
              </>
            }
            intro="Competitive prep cannot be a mass-production system. Here's what we build for every student instead."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyEdutattva.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className="h-full">
                <div className="card card-hover h-full p-6">
                  <IconCircle name={whyIcons[i]} tone={i % 2 === 0 ? "royal" : "gold"} />
                  <h3 className="mt-4 text-[1.15rem]">
                    <MarkedText text={w.title} />
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={whyEdutattva.length * 70} className="h-full">
              <div className="flex h-full flex-col justify-center rounded-2xl bg-navy p-6 text-white">
                <p className="text-[1.05rem] font-semibold leading-snug">
                  Education is not a commercial transaction. It is a responsibility towards every
                  student who trusts us with their dreams.
                </p>
                <Link href="/about" className="mt-4 inline-flex items-center gap-2 font-bold text-gold">
                  Read our story <Icon name="arrow" size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="What Families Say"
            title="Trusted by parents and students"
          />
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ============ VIDEO TESTIMONIALS ============ */}
      <section className="section bg-sky">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Video Stories"
            title="Hear it from those who have been there"
            intro="Alumni of IIT and NIT campuses — now at Letstransport, Stanford GSB and Amazon."
          />
          <div className="mt-10">
            <VideoTestimonials items={videos} />
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <CTABand
        title={
          <>
            <span className="hl-gold">IITJEE</span> | <span className="hl-gold">NEET</span> |{" "}
            <span className="hl-gold">Foundation</span> Programs for Class 6 to 12
          </>
        }
        text="Integrated, Evening and Weekend Classes. Book a free counselling session and find the right roadmap for your child."
      />
    </>
  );
}
