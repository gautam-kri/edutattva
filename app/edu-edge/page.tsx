import type { Metadata } from "next";
import Link from "next/link";
import {
  edgeStats,
  edgeSimultaneous,
  edgeHighlights,
  edgeTesting,
  edgeFees,
} from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FeeTable from "@/components/FeeTable";
import OnlineSection from "@/components/OnlineSection";
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

export default function EduEdgePage() {
  return (
    <>
      <PageHero
        eyebrow="Grades 11–12"
        title={
          <>
            Edu Edge <span className="hl-gold">&amp; Edge+</span>
          </>
        }
        tagline="One Program. One System. One Goal."
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
            intro="Each delivery mode is a tier of the program: Edu Edge Online (live streaming), Edu Edge (Hybrid — Sunday offline plus weekday online at SJPS Siruseri) and Edu Edge+ (Integrated, within school hours at BHIS Kelambakkam). Installments available."
          />
          <div className="mt-8">
            <FeeTable fee={edgeFees} onlineNote tutoringNote />
          </div>
        </div>
      </section>

      {/* ===== EDU EDGE ONLINE ===== */}
      <OnlineSection name="Edu Edge Online" badge="Grade XI & XII · Serious JEE | NEET Aspirants" />

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
