import type { Metadata } from "next";
import { leadership, leadershipStrengths, trustLine } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import ExpBadge from "@/components/ExpBadge";
import Photo from "@/components/Photo";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Academic Leadership — Built by Experts, Driven by Results",
  description:
    "Meet the Edutattva academic leadership: Nishant Tripathi (CASO), Sourav Mondal (CAOO), Kailasam Ramamoorthy, Rahul Kumar Ojha and K. N. Bhargava Mondem — 80+ years of combined experience.",
};

export default function FacultyPage() {
  return (
    <>
      <PageHero
        eyebrow="Academic Leadership"
        title={
          <>
            Built by experts. <span className="hl-gold">Driven by results.</span>
          </>
        }
        subtitle="Edutattva is led by a team of highly experienced educators who have consistently delivered top results in IIT-JEE and NEET. Their strength lies not just in teaching, but in designing systems that produce outcomes at scale."
      />

      {/* Leadership cards */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((l, i) => (
              <Reveal key={l.name} delay={i * 80} className="h-full">
                <div className="card card-hover flex h-full flex-col overflow-hidden">
                  <div className="relative">
                    <Photo
                      src={l.photo}
                      alt={`${l.name} — ${l.title}`}
                      aspect="aspect-[4/3]"
                      rounded="rounded-none"
                      position="object-top"
                    />
                    <div className="absolute -bottom-4 right-5">
                      <ExpBadge years={l.years} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-7">
                    <div className="flex items-center gap-2">
                      <h2 className="text-[1.3rem]">{l.name}</h2>
                    </div>
                    <p className="mt-0.5 text-[0.85rem] font-semibold uppercase tracking-wide text-royal-400">
                      {l.alias} · {l.subject}
                    </p>
                    <p className="mt-3 flex-1 leading-relaxed text-muted">{l.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Strengths card fills the grid */}
            <Reveal delay={leadership.length * 80} className="h-full">
              <div className="flex h-full flex-col justify-center rounded-2xl bg-navy p-7 text-white">
                <h2 className="text-[1.3rem] text-white">Leadership strengths</h2>
                <ul className="mt-4 space-y-3">
                  {leadershipStrengths.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-white/85">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-navy">
                        <Icon name="check" size={14} />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/70">
                  At Edutattva, results will not be accidental — they will be designed and delivered.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Heritage note */}
      <section className="section-tight bg-sky">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex justify-center gap-2 text-gold" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star" size={22} style={{ fill: "var(--color-gold)" }} />
              ))}
            </div>
            <p className="text-[1.15rem] font-semibold text-navy md:text-[1.35rem]">
              {trustLine.split("FIITJEE & FGS")[0]}
              <span className="hl-crimson">FIITJEE &amp; FGS</span>
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Learn from the minds behind the ranks"
        text="Book a free counselling session and meet the faculty who will mentor your child."
      />
    </>
  );
}
