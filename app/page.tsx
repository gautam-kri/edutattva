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
import CTABand from "@/components/CTABand";
import ExpBadge from "@/components/ExpBadge";
import Photo from "@/components/Photo";
import IconCircle from "@/components/IconCircle";
import Icon, { type IconName } from "@/components/Icon";

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
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-navy text-white">
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

        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1fr_1fr] lg:py-24">
          {/* Left */}
          <div>
            <div className="anim-fadeup flex flex-wrap items-center gap-2.5">
              <span className="chip chip-gold">{site.admissions}</span>
              <span className="chip chip-lime">Class 6 to 12</span>
            </div>

            <h1 className="anim-fadeup delay-1 mt-6 text-[clamp(2.4rem,6vw,4.2rem)] text-white">
              Where Fundamentals Become <span className="hl-gold">Excellence</span>
            </h1>

            <p
              className="anim-fadeup delay-2 mt-5 text-[clamp(1.1rem,2.2vw,1.5rem)] font-semibold text-white/90"
              style={{ fontFamily: "var(--font-condensed)", letterSpacing: "0.02em" }}
            >
              <span className="hl-gold">IITJEE</span> <span className="text-white/40">|</span>{" "}
              <span className="hl-gold">NEET</span> <span className="text-white/40">|</span>{" "}
              <span className="hl-gold">Foundation</span>{" "}
              <span className="text-white/60">— Quality at an Affordable Fee</span>
            </p>

            <p className="anim-fadeup delay-2 mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/70">
              A mentorship-driven, systems-led coaching institute in Chennai, built by academic
              minds behind years of IIT-JEE &amp; NEET results.
            </p>

            <div className="anim-fadeup delay-3 mt-8 flex flex-wrap gap-3">
              <Link href="/admissions" className="btn btn-gold">
                Book Free Counselling
              </Link>
              <Link href="/programs" className="btn btn-ghost">
                Explore Programs
                <Icon name="arrow" size={18} />
              </Link>
            </div>

            <div className="anim-fadeup delay-4 mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/70">
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
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {facultySpotlight.map((f) => (
                <div
                  key={f.name}
                  className="rounded-2xl bg-white/[0.07] p-2.5 shadow-xl ring-1 ring-white/10 backdrop-blur-sm"
                >
                  <Photo
                    src={f.photo}
                    alt={`${f.name} — ${f.role}`}
                    aspect="aspect-[3/4]"
                    rounded="rounded-xl"
                    position="object-top"
                    priority
                  />
                  <div className="px-1 pb-1 pt-3 text-center">
                    <p className="text-[0.9rem] font-bold leading-tight text-white">{f.name}</p>
                    <p className="mt-0.5 text-[0.68rem] uppercase tracking-wide text-white/60">
                      {f.role}
                    </p>
                    <span
                      className="mt-2 inline-block rounded-full bg-crimson px-2.5 py-1 text-[0.72rem] font-bold text-white"
                      style={{ fontFamily: "var(--font-condensed)" }}
                    >
                      {f.years} YRS
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Combined-experience badge — sits below the cards so it never overlaps them */}
            <div className="mt-7 flex justify-center">
              <span className="anim-float flex items-center gap-2 rounded-full bg-crimson px-6 py-3 shadow-[0_16px_30px_-10px_rgba(200,16,46,0.7)]">
                <span
                  className="text-2xl font-extrabold leading-none text-white"
                  style={{ fontFamily: "var(--font-condensed)" }}
                >
                  80+
                </span>
                <span className="text-[0.72rem] font-semibold uppercase leading-tight text-white/90">
                  Years of
                  <br />
                  Academic Experience*
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STAT STRIP ============ */}
      <section className="bg-navy-900 py-14">
        <div className="container-x">
          <StatStrip />
        </div>
      </section>

      {/* ============ TRUST LINE ============ */}
      <section className="border-b border-sky-200 bg-sky py-8">
        <div className="container-x flex flex-col items-center gap-3 text-center">
          <div className="flex gap-2 text-gold" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" size={20} className="fill-gold" style={{ fill: "var(--color-gold)" }} />
            ))}
          </div>
          <p className="max-w-2xl text-[1.05rem] font-semibold text-navy md:text-[1.2rem]">
            {trustLine.split("FIITJEE & FGS")[0]}
            <span className="hl-crimson">FIITJEE &amp; FGS</span>
          </p>
        </div>
      </section>

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
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            <div className="grid grid-cols-2 gap-5">
              {facultyTop.map((f, i) => (
                <FacultyCard key={f.name} f={f} delay={i * 90} aspect="aspect-[4/5]" />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
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
            title="Hear it straight from our families"
            intro="Video testimonials from parents and students — landing in this space soon."
          />
          <div className="mt-10">
            <VideoTestimonials />
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
