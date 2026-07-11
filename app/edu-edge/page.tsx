import type { Metadata } from "next";
import Link from "next/link";
import {
  edgeStats,
  edgeSimultaneous,
  edgeHighlights,
  edgeTesting,
  edgeFees,
  onlineCompare,
  onlineFeatures,
} from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FeeTable from "@/components/FeeTable";
import CTABand from "@/components/CTABand";
import IconCircle from "@/components/IconCircle";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Edu Edge & Edge+ (Grades 11–12) — JEE, NEET & Boards",
  description:
    "Edu Edge / Edu Edge+: one system for Boards + JEE (Main & Advanced) + NEET. 1000+ teaching hours, 25,000+ practice questions, 200+ hour Rank Elevate Program & ExamShield. Plus Edu Edge Online for just ₹50,000 all-inclusive.",
};

const statIcons: IconName[] = ["clock", "notes", "chart", "shield"];
const simIcons: IconName[] = ["book", "gear", "stethoscope"];
const highlightIcons: IconName[] = [
  "users",
  "notes",
  "clipboard",
  "globe",
  "chart",
  "rocket",
  "mentor",
  "handshake",
];
const featureIcons: IconName[] = ["chat", "users", "question", "chart", "mentor", "notes"];

export default function EduEdgePage() {
  return (
    <>
      <PageHero
        eyebrow="Edu Edge / Edu Edge+ · Grades 11–12"
        title={
          <>
            One Program. One System. <span className="hl-gold">One Goal.</span>
          </>
        }
        subtitle="Integrated preparation for JEE (Main & Advanced), NEET and Board Examinations under the guidance of educators with over 20+ years of proven results. No duplication of effort. No loss of valuable study time."
      >
        <Link href="/admissions" className="btn btn-gold">
          Book Free Counselling
        </Link>
        <a href="#online" className="btn btn-ghost">
          Edu Edge Online <Icon name="arrow" size={18} />
        </a>
      </PageHero>

      {/* Stats */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {edgeStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="h-full">
                <div className="card h-full p-6">
                  <IconCircle name={statIcons[i]} tone={i === 3 ? "royal" : i === 1 ? "lime" : "gold"} />
                  <div
                    className="mt-4 text-[2rem] font-extrabold leading-none text-navy"
                    style={{ fontFamily: "var(--font-condensed)" }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 font-bold text-royal">{s.label}</div>
                  <p className="mt-1 text-[0.86rem] text-muted">{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Simultaneous preparation */}
      <section className="section bg-sky">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Simultaneous Preparation For"
            title="Boards, JEE and NEET — together, not in conflict"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {edgeSimultaneous.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} className="h-full">
                <div className="card card-hover h-full p-7 text-center">
                  <div className="flex justify-center">
                    <IconCircle name={simIcons[i]} tone={i === 0 ? "royal" : i === 1 ? "gold" : "crimson"} size={64} iconSize={30} />
                  </div>
                  <h3 className="mt-5 text-[1.25rem]">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Program highlights */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Our Program Highlights" title="Everything a serious aspirant needs" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {edgeHighlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 60} className="h-full">
                <div className="card card-hover h-full p-6">
                  <IconCircle name={highlightIcons[i]} tone={i % 3 === 0 ? "royal" : i % 3 === 1 ? "gold" : "lime"} />
                  <h3 className="mt-4 text-[1.05rem] leading-tight">{h.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testing ecosystem */}
      <section className="section bg-navy text-white">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              light
              eyebrow={<span className="text-white/80">Powerful Testing Ecosystem</span>}
              title={
                <>
                  Benchmarked at <span className="hl-gold">every step</span>
                </>
              }
              intro="From chapter tests to full syllabus tests — with detailed analysis sessions that turn every attempt into improvement."
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {edgeTesting.map((t, i) => (
              <Reveal key={t} delay={i * 50}>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-navy">
                    <Icon name="check" size={16} />
                  </span>
                  <span className="font-medium text-white/90">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Program Availability, Location & Fee"
            title="Edu Edge fees (11–12)"
            intro="Choose Online, Integrated (BHIS Kelambakkam) or Hybrid (SJPS Siruseri — Sunday offline plus weekday online). Installments available."
          />
          <div className="mt-8">
            <FeeTable fee={edgeFees} />
          </div>
        </div>
      </section>

      {/* ===== EDU EDGE ONLINE ===== */}
      <section id="online" className="section bg-navy text-white scroll-mt-20">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="chip chip-crimson">Edu Edge Online</span>
              <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-white">
                Grade XI — Serious <span className="hl-gold">JEE | NEET</span> Aspirants Program
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                The personal attention of a classroom. The convenience of learning from home. Learn
                better, practise smarter, achieve more.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/edu-edge/seal.png"
                alt="Just ₹50 Thousand — All Inclusive. No hidden charges, everything included."
                className="anim-float w-60 max-w-full drop-shadow-[0_22px_45px_rgba(245,183,0,0.35)]"
              />
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-14">
            <h3 className="text-center text-[1.5rem] text-white">
              Why is <span className="hl-crimson">Edu Edge Online</span> different?
            </h3>
            <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
                <span className="chip chip-crimson">Most Online Coaching</span>
                <ul className="mt-5 space-y-3.5">
                  {onlineCompare.most.map((m) => (
                    <li key={m} className="flex items-start gap-3 text-white/75">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-crimson/20 text-crimson">
                        <Icon name="close" size={14} />
                      </span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-lime/40 bg-lime/5 p-7">
                <span className="chip chip-lime">Edu Edge Online Class</span>
                <ul className="mt-5 space-y-3.5">
                  {onlineCompare.edge.map((m) => (
                    <li key={m} className="flex items-start gap-3 font-medium text-white">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime text-navy">
                        <Icon name="check" size={14} />
                      </span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Six features */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {onlineFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 60} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                    <Icon name={featureIcons[i]} size={24} />
                  </span>
                  <h4 className="mt-4 text-[1.05rem] font-bold text-white">{f.title}</h4>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-white/70">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={
          <>
            Premium quality learning at an <span className="hl-gold">affordable fee</span>
          </>
        }
        text="Because quality education should be accessible to every deserving student. Book a free counselling session for Edu Edge or Edu Edge Online."
      />
    </>
  );
}
