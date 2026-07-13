import type { Metadata } from "next";
import Link from "next/link";
import { igniteWhy, igniteFees } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FeeTable from "@/components/FeeTable";
import CTABand from "@/components/CTABand";
import IconCircle from "@/components/IconCircle";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Edu Ignite (Grades 9–10) — JEE/NEET Foundation Program",
  description:
    "Edu Ignite: Classroom & Integrated JEE/NEET foundation program for Grade 9 & 10. Integrated ₹80,000/grade or Hybrid ₹65,000. Installments available. SJPS Siruseri & BHIS Kelambakkam.",
};

const whyIcons: IconName[] = ["cap", "layers", "globe", "notes", "pin", "handshake"];
const whyTones = ["royal", "gold", "royal", "crimson", "gold", "royal"] as const;

export default function EduIgnitePage() {
  return (
    <>
      <PageHero
        eyebrow="Edu Ignite · Grades 9–10"
        title={
          <>
            Classroom & Integrated{" "}
            <span className="hl-gold">JEE / NEET foundation</span>{" "}for Grade 9 &amp; 10
          </>
        }
        subtitle="The head start that compounds. Begin building real JEE/NEET foundations in Class IX — while Board preparation and competitive prep move together, not against each other."
      >
        <Link href="/admissions" className="btn btn-gold">
          Book Free Counselling
        </Link>
        <a href="#fees" className="btn btn-ghost">
          See fees <Icon name="arrow" size={18} />
        </a>
      </PageHero>

      {/* Why start in IX */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="The Edu Ignite Program"
            title="What Edu Ignite gives Grade 9 &amp; 10"
            intro="Classroom and Integrated JEE/NEET foundation preparation, available across two campuses in the mode that fits your child."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {igniteWhy.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className="h-full">
                <div className="card card-hover h-full p-6">
                  <IconCircle name={whyIcons[i]} tone={whyTones[i]} />
                  <h3 className="mt-4 text-[1.12rem]">{w.title}</h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="section bg-sky scroll-mt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Program Availability, Location & Fee"
            title="Edu Ignite fees (9–10)"
            intro="Choose Integrated (within school hours) at SJPS Siruseri or BHIS Kelambakkam, or Hybrid — Sunday offline plus weekday online classes."
          />
          <div className="mt-8">
            <FeeTable fee={igniteFees} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ignite the JEE/NEET journey early"
        text="Book a free counselling session and lock in a two-year foundation advantage for Grade 9 or 10."
      />
    </>
  );
}
