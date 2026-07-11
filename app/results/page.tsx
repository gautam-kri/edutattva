import type { Metadata } from "next";
import { testimonials, trustLine } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ResultsTabs from "@/components/ResultsTabs";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Results — Top Ranks in IIT-JEE & NEET, Year after Year",
  description:
    "Edutattva results: rank cards, year-wise IIT-JEE & NEET highlights and a testimonial wall — a heritage of top ranks at FIITJEE & FGS, now under one roof.",
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title={
          <>
            Top ranks in IIT-JEE &amp; NEET,{" "}
            <span className="hl-gold">year after year</span>
          </>
        }
        subtitle="Our faculty carry a heritage of top ranks and high scores. This is where every Edutattva result will be celebrated — structured, verifiable and proudly on display."
      />

      {/* Notice banner */}
      <section className="section-tight">
        <div className="container-x">
          <div className="flex items-start gap-4 rounded-2xl border border-gold/40 bg-gold-100/50 p-5 md:items-center">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold text-navy">
              <Icon name="trophy" size={24} />
            </span>
            <p className="text-[0.98rem] text-navy">
              <strong className="font-bold">Built for real data.</strong> The rank cards and tabs
              below are placeholders — student photos, AIR ranks, exam names and years will populate
              here as each result season closes.
            </p>
          </div>
        </div>
      </section>

      {/* Year-wise rank cards */}
      <section className="pb-16">
        <div className="container-x">
          <ResultsTabs />
        </div>
      </section>

      {/* Heritage note */}
      <section className="section bg-navy text-white">
        <div className="container-x text-center">
          <div className="mb-4 flex justify-center gap-2 text-gold" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" size={22} style={{ fill: "var(--color-gold)" }} />
            ))}
          </div>
          <h2 className="mx-auto max-w-3xl text-[clamp(1.6rem,3.4vw,2.4rem)] text-white">
            Top Ranks Year after Year at{" "}
            <span className="hl-gold">FIITJEE &amp; FGS</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">{trustLine}.</p>
        </div>
      </section>

      {/* Testimonial wall */}
      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="Testimonial Wall" title="In the words of our families" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <figure className="card h-full p-7">
                  <Icon name="quote" size={34} className="text-gold" />
                  <blockquote className="mt-3 leading-relaxed text-navy">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 border-t border-sky-200 pt-4">
                    <span className="block font-bold text-navy">{t.name}</span>
                    <span className="text-sm text-muted">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Your child's rank could be here next"
        text="Book a free counselling session and start a preparation built to produce results."
      />
    </>
  );
}
