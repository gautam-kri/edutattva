import type { Metadata } from "next";
import Link from "next/link";
import { foundationTiers, foundationWhy, foundationFees } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FeeTable from "@/components/FeeTable";
import CTABand from "@/components/CTABand";
import IconCircle from "@/components/IconCircle";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Foundation Program (Grades 6–8) — Edu Root, Spark & Quest",
  description:
    "Edutattva Foundation Program for Grades 6–8: Edu Root, Edu Spark and Edu Quest. Concept building, Olympiad readiness and early exam temperament. Integrated & Coaching fees from ₹42,000.",
};

const tierMeta: Record<string, { bar: string; chipBg: string; chipText: string; icon: IconName }> = {
  lime: { bar: "var(--color-lime)", chipBg: "var(--color-lime)", chipText: "var(--color-navy)", icon: "book" },
  royal: { bar: "var(--color-royal)", chipBg: "var(--color-royal)", chipText: "#fff", icon: "spark" },
  crimson: { bar: "var(--color-crimson)", chipBg: "var(--color-crimson)", chipText: "#fff", icon: "target" },
};

const whyIcons: IconName[] = ["book", "trophy", "brain", "stopwatch", "rocket"];
const whyTones = ["lime", "gold", "royal", "crimson", "royal"] as const;

export default function FoundationPage() {
  return (
    <>
      <PageHero
        eyebrow="Foundation · Grades 6–8"
        title={
          <>
            Nurturing thinkers today.{" "}
            <span className="hl-gold">Shaping achievers tomorrow.</span>
          </>
        }
        subtitle="A strong foundation today, a successful future tomorrow. Our foundation program gives your child the academic edge, thinking skills and confidence they need to excel in school, Olympiads and future competitive exams."
      >
        <Link href="/admissions" className="btn btn-gold">
          Book Free Counselling
        </Link>
        <a href="#fees" className="btn btn-ghost">
          See fees <Icon name="arrow" size={18} />
        </a>
      </PageHero>

      {/* Students banner */}
      <section className="section-tight">
        <div className="container-x">
          <div className="relative min-h-[240px] overflow-hidden rounded-3xl md:min-h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/students.jpg"
              alt="Edutattva Foundation students in school uniform"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 28%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-navy/10" />
            <div className="relative flex min-h-[240px] items-end p-7 md:min-h-[300px] md:p-12">
              <div className="max-w-lg">
                <span className="chip chip-gold">Grades 6–8</span>
                <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] text-white">
                  A strong foundation today, a successful future{" "}
                  <span className="hl-gold">tomorrow.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Choose the Right Path"
            title="Three tiers, one strong foundation"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {foundationTiers.map((t, i) => {
              const m = tierMeta[t.color];
              return (
                <Reveal key={t.name} delay={i * 90} className="h-full">
                  <div className="card card-hover flex h-full flex-col overflow-hidden">
                    <span className="h-1.5 w-full" style={{ background: m.bar }} />
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-center justify-between">
                        <span
                          className="chip"
                          style={{ background: m.chipBg, color: m.chipText }}
                        >
                          {t.grade}
                        </span>
                        <span
                          className="grid h-12 w-12 place-items-center rounded-2xl"
                          style={{ background: `color-mix(in srgb, ${m.bar} 14%, white)`, color: m.bar }}
                        >
                          <Icon name={m.icon} size={26} />
                        </span>
                      </div>
                      <h3 className="mt-4 text-[1.55rem]" style={{ color: m.bar }}>
                        {t.name}
                      </h3>
                      <p className="text-[0.9rem] font-bold uppercase tracking-wide text-navy">
                        {t.line}
                      </p>
                      <ul className="check-list mt-5 flex-1">
                        {t.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <p
                        className="mt-6 rounded-xl px-4 py-3 text-center text-[0.95rem] font-bold text-white"
                        style={{ background: m.bar }}
                      >
                        {t.tagline}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section bg-sky">
        <div className="container-x">
          <SectionHeading eyebrow="Why Choose Our Foundation Program" title="Built for thinkers, not memorisers" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {foundationWhy.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className="h-full">
                <div className="card card-hover h-full p-6 text-center">
                  <div className="flex justify-center">
                    <IconCircle name={whyIcons[i]} tone={whyTones[i]} />
                  </div>
                  <h3 className="mt-4 text-[1.02rem] leading-tight">{w.title}</h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="section scroll-mt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Program Availability, Location & Fee"
            title="Foundation Program fees (6–8)"
            intro="Available at SJPS (St John's), Siruseri. Choose the Integrated (within school hours) or Coaching (Sunday, 6 hours) mode."
          />
          <div className="mt-8">
            <FeeTable fee={foundationFees} />
          </div>
        </div>
      </section>

      <CTABand
        title="Give your child a head start"
        text="Book a free counselling session for the Foundation Program and set the strongest possible base."
      />
    </>
  );
}
