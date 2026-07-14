import type { Metadata } from "next";
import { leadershipStrengths } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import E4Loop from "@/components/E4Loop";
import CTABand from "@/components/CTABand";
import Photo from "@/components/Photo";
import IconCircle from "@/components/IconCircle";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "About Us — Built on Experience, Driven by Purpose",
  description:
    "The Edutattva story: co-founders Nishant Tripathi (MNT Sir) & Sourav Mondal (PSOM Sir), our mission, the E4 Engine, and a belief that quality education should be accessible to every deserving student.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Edutattva"
        title={
          <>
            Built on experience. <span className="hl-gold">Driven by purpose.</span>
          </>
        }
        subtitle="Edutattva isn't another coaching initiative. It was built on the realization that quality education, structured systems and personal mentorship are often inaccessible to many deserving students."
      />

      {/* Vision & Mission */}
      <section className="section">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="card h-full p-8">
              <IconCircle name="target" tone="royal" />
              <h2 className="mt-5 text-[1.6rem]">Vision</h2>
              <p className="mt-3 leading-relaxed text-muted">
                To redefine competitive exam preparation through systems, mentorship and
                precision-driven learning, making high-quality IIT-JEE and NEET preparation more
                accessible, structured and student-centric.
              </p>
              <p className="mt-3 leading-relaxed text-muted">
                Edutattva envisions a future where success in competitive exams is not limited to a
                privileged few, but becomes achievable for every deserving student through the right
                guidance, the right environment and the right execution systems.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="card h-full p-8">
              <IconCircle name="rocket" tone="gold" />
              <h2 className="mt-5 text-[1.6rem]">Mission</h2>
              <p className="mt-3 leading-relaxed text-muted">
                To build a performance-driven academic ecosystem that nurtures every student with
                clarity, discipline, strategy and personal care, helping them achieve their optimum
                potential in IIT-JEE, NEET and beyond.
              </p>
              <ul className="check-list mt-4">
                {[
                  "Conceptually strong, strategically aligned preparation",
                  "Continuously evolving with the latest exam trends",
                  "Building exam temperament, confidence and consistency",
                  "Structured mentoring and precise performance analysis",
                  "Quality systems, made affordable without compromise",
                ].map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who Are We — co-founders */}
      <section className="section bg-sky">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Who Are We?"
              title="A singular vision, shaped over decades"
              intro="As co-founders, we have spent years working closely with students across diverse academic environments, understanding not just how they learn, but where they struggle, lose direction and fall short despite effort."
            />
            <p className="mt-5 rounded-2xl border-l-4 border-gold bg-white p-5 text-[1.05rem] font-semibold leading-relaxed text-navy">
              We
              <sup className="align-super text-[0.55em] font-normal text-gold-600">*</sup> make
              high-quality, result-driven academic systems more accessible, more structured and more
              personal.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-royal">
              <span>Nishant Tripathi (MNT Sir)</span>
              <span>Sourav Mondal (PSOM Sir)</span>
            </div>
            <p className="text-sm text-muted">Co-founders, Edutattva</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "Nishant Tripathi", a: "MNT Sir — Co-Founder & CASO", photo: "/faculty/nishant.png" },
              { n: "Sourav Mondal", a: "PSOM Sir — Co-Founder & CAOO", photo: "/faculty/sourav.png" },
            ].map((c) => (
              <Reveal key={c.n} className="h-full">
                <div className="card h-full overflow-hidden">
                  <Photo src={c.photo} alt={`${c.n} — ${c.a}`} aspect="aspect-[4/5]" rounded="rounded-none" position="object-top" />
                  <div className="p-4 text-center">
                    <p className="font-bold text-navy">{c.n}</p>
                    <p className="mt-0.5 text-[0.8rem] text-muted">{c.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section">
        <div className="container-x">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="The Problem"
                title={
                  <>
                    Why do most students fail to reach their{" "}
                    <span className="hl-crimson">true potential?</span>
                  </>
                }
                intro="The challenge is not intelligence. The challenge is execution."
              />
              <Photo
                src="/photos/studying.jpg"
                alt="A student preparing for competitive exams"
                aspect="aspect-[4/3]"
                className="mt-6 hidden lg:block"
              />
            </div>
            <div className="space-y-4 text-[1.02rem] leading-relaxed text-muted">
              <p>
                Every year, thousands of students prepare seriously for IIT-JEE and NEET. Yet many
                fail to achieve the results they are capable of, not because they lack intelligence
                or hard work, but because competitive exams demand far more than syllabus completion.
              </p>
              <p>
                Modern examinations test application ability, accuracy under pressure,
                decision-making speed and consistency across long preparation cycles. Without
                understanding evolving trends, proper performance analysis and continuous mentoring,
                small mistakes remain uncorrected, confidence fluctuates and performance slowly falls
                below potential.
              </p>
              <p className="font-semibold text-navy">
                Success is not about studying harder. It is about preparing smarter, building exam
                temperament, analysing mistakes scientifically and continuously refining performance
                through the right guidance and systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* E4 Engine explainer */}
      <section className="section bg-navy text-white">
        <div className="container-x">
          <SectionHeading
            center
            light
            eyebrow={<span className="text-white/80">The Edutattva Advantage</span>}
            title={
              <>
                The E4 Engine: where <span className="hl-gold">learning becomes performance</span>
              </>
            }
            intro="Our proprietary framework, the Edutattva Execution Engine, ensures every concept is understood, applied, tested and perfected before moving forward. Each stage builds not just knowledge, but competence, confidence and consistency."
          />
          <div className="mt-10">
            <E4Loop />
          </div>
        </div>
      </section>

      {/* What we set out to build */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Set Out to Build"
            title="A system designed around the student"
            intro="We have consciously built Edutattva to combine the rigour of top-tier academic systems, the precision of structured execution frameworks, and the care and attention every student truly deserves."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: "sparkles" as const, t: "Clarity in learning", d: "Every student receives genuine clarity, not just coverage." },
              { i: "chart" as const, t: "Guided & optimised effort", d: "Every effort is guided, measured and optimised." },
              { i: "target" as const, t: "Every gap addressed", d: "Every gap is identified early and systematically closed." },
              { i: "mentor" as const, t: "Mentored, not just taught", d: "Every child is mentored as an individual with real potential." },
            ].map((b, idx) => (
              <Reveal key={b.t} delay={idx * 80} className="h-full">
                <div className="card card-hover h-full p-6">
                  <IconCircle name={b.i} tone={idx % 2 ? "lime" : "royal"} />
                  <h3 className="mt-4 text-[1.1rem]">{b.t}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship yet affordable */}
      <section className="section bg-sky">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Mentorship, Yet Affordable"
              title="Full student support at a fee that stays fair"
              intro="Competitive exam preparation cannot be treated as a mass-production system. That is why we prioritise mentorship, personal attention and ongoing academic support."
            />
            <ul className="check-list mt-6">
              <li>Regular one-on-one mentoring interactions</li>
              <li>Continuous performance monitoring and feedback</li>
              <li>Individual doubt support and correction strategies</li>
              <li>Motivation, discipline and exam temperament guidance</li>
              <li>
                Nearly double the effective academic contact hours of conventional programs, while
                staying more affordable
              </li>
            </ul>
          </div>
          <div className="grid gap-4">
            <Photo
              src="/photos/mentor.jpg"
              alt="Mentorship at the heart of Edutattva"
              aspect="aspect-[16/9]"
            />
            <div className="card p-7">
              <h3 className="text-[1.15rem]">Leadership strengths</h3>
              <ul className="check-list mt-4">
                {leadershipStrengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing belief */}
      <section className="section-tight">
        <div className="container-x">
          <div className="mx-auto max-w-3xl rounded-3xl border border-sky-200 bg-white p-10 text-center shadow-[var(--shadow-card)]">
            <Icon name="quote" size={44} className="mx-auto text-gold" />
            <p className="mt-4 text-[clamp(1.4rem,3vw,2rem)] font-bold leading-tight text-navy" style={{ fontFamily: "var(--font-display)" }}>
              Edutattva is not just what we teach. It is what we believe education should be.
            </p>
          </div>
        </div>
      </section>

      <CTABand title="Come see the difference a system makes" text="Book a free counselling session and meet the team behind the results." />
    </>
  );
}
