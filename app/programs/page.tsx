import type { Metadata } from "next";
import Link from "next/link";
import { modes, programs } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import IconCircle from "@/components/IconCircle";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Programs — Foundation to JEE/NEET for Class 6–12",
  description:
    "Edutattva programs aligned to every stage of a student's journey: Integrated School Program (IX–XII), Classroom Excellence Program (IX–XII) and Foundation Program (VI–VIII), delivered Integrated, Offline, Hybrid or Online.",
};

const structure = [
  {
    name: "Integrated School Program",
    grades: "Grade IX–XII",
    desc: "A fully synchronized model where core subjects are handled by Edutattva within the school framework — eliminating duplication and ensuring clarity.",
    icon: "layers" as IconName,
    tone: "royal" as const,
  },
  {
    name: "Classroom Excellence Program",
    grades: "Grade IX–XII",
    desc: "Designed for students attending regular schools, this program provides structured academic reinforcement beyond school hours.",
    icon: "cap" as IconName,
    tone: "gold" as const,
  },
  {
    name: "Foundation Program",
    grades: "Grade VI–VIII",
    desc: "Focused on early concept building, logical thinking and exposure to competitive exams — the strongest possible start.",
    icon: "sparkles" as IconName,
    tone: "lime" as const,
  },
];

const highlights = [
  "Seamless curriculum alignment",
  "Progressive difficulty levels",
  "Long-term academic planning",
  "Early identification of strengths and gaps",
];

const modeIcons: IconName[] = ["layers", "cap", "globe", "chat"];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs Offered"
        title={
          <>
            Programs for every stage of{" "}
            <span className="hl-gold">academic growth</span>
          </>
        }
        subtitle="Edutattva offers structured programs aligned with a student's academic journey — ensuring continuity and progression from Class 6 all the way to Class 12."
      >
        <Link href="/admissions" className="btn btn-gold">
          Book Free Counselling
        </Link>
      </PageHero>

      {/* Program structure */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="How It's Structured"
            title="Three programs, one continuous system"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {structure.map((s, i) => (
              <Reveal key={s.name} delay={i * 90} className="h-full">
                <div className="card card-hover h-full p-7">
                  <IconCircle name={s.icon} tone={s.tone} />
                  <span className="mt-4 block text-[0.8rem] font-bold uppercase tracking-wide text-royal-400">
                    {s.grades}
                  </span>
                  <h3 className="mt-1 text-[1.25rem]">{s.name}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-sky p-6 md:p-8">
            <h3 className="text-[1.1rem]">Program Highlights</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((h) => (
                <p key={h} className="flex items-start gap-2 text-[0.95rem] text-navy">
                  <Icon name="check" size={18} className="mt-0.5 shrink-0 text-lime-600" />
                  {h}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery modes */}
      <section className="section bg-navy text-white">
        <div className="container-x">
          <SectionHeading
            center
            light
            eyebrow={<span className="text-white/80">Delivery Modes</span>}
            title={
              <>
                Four ways to learn — <span className="hl-gold">your choice of fit</span>
              </>
            }
            intro="Availability varies by program and grade. Every mode includes Edutattva study material, online testing platform access and all taxes."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {modes.map((m, i) => (
              <Reveal key={m.name} delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                    <Icon name={modeIcons[i]} size={24} />
                  </span>
                  <h3 className="mt-4 text-[1.15rem] text-white">{m.name}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-white/70">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Grade-band cards */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Explore by Grade"
            title="Find the right program for your child"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {programs
              .filter((p) => !p.slug.includes("#"))
              .map((p, i) => (
                <Reveal key={p.code} delay={i * 90} className="h-full">
                  <Link
                    href={p.slug}
                    className="card card-hover group flex h-full flex-col overflow-hidden"
                  >
                    <span
                      className="h-2 w-full"
                      style={{
                        background:
                          p.accent === "lime"
                            ? "var(--color-lime)"
                            : p.accent === "gold"
                              ? "var(--color-gold)"
                              : "var(--color-royal)",
                      }}
                    />
                    <div className="flex flex-1 flex-col p-7">
                      <span className="text-[0.85rem] font-bold uppercase tracking-wide text-royal-400">
                        {p.grades}
                      </span>
                      <h3 className="mt-1 text-[1.5rem]">{p.code}</h3>
                      <p className="mt-3 flex-1 leading-relaxed text-muted">{p.pitch}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-royal">
                        View Program
                        <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which program fits?"
        text="Our counsellors will map the right program, grade and mode for your child — free of charge."
      />
    </>
  );
}
