import type { Metadata } from "next";
import { admissionSteps, faqs, site, whatsappLink, counsellingMessage } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import Icon, { type IconName } from "@/components/Icon";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admissions 2026–27 — Book a Free Counselling Session",
  description:
    "Admissions open for 2026–27. Follow the Edutattva journey: Enquiry → Counselling → Enrollment. Installment options available. Message us on WhatsApp to book your free counselling session.",
};

const reassurance: { icon: IconName; tone: string; title: string; desc: string }[] = [
  {
    icon: "handshake",
    tone: "bg-gold/15 text-gold-600",
    title: "Flexible installments",
    desc: "Installment options are available for Edu Ignite (9–10) and Edu Edge (11–12). Ask our counsellor about the current fee plans.",
  },
  {
    icon: "check",
    tone: "bg-royal/12 text-royal",
    title: "No hidden charges",
    desc: "Integrated and Hybrid fees include Edutattva study material, online testing platform access and all taxes.",
  },
  {
    icon: "pin",
    tone: "bg-crimson/12 text-crimson",
    title: "Two campuses + online",
    desc: "SJPS (St John's), Siruseri and BHIS (Billabong), Kelambakkam — or learn live from anywhere.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions Open 2026–27"
        title={
          <>
            A simple path to the <span className="hl-gold">right start</span>
          </>
        }
        subtitle="From first enquiry to enrolment, we keep it clear and personal — because choosing the right program matters as much as the program itself."
      >
        <a
          href={whatsappLink(counsellingMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold"
        >
          <Icon name="whatsapp" size={20} />
          Book on WhatsApp
        </a>
        <a href={`tel:${site.phoneDial}`} className="btn btn-ghost">
          <Icon name="phone" size={18} /> {site.phoneDisplay}
        </a>
      </PageHero>

      {/* Stepper */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="The Admission Journey"
            title="Three steps, fully guided"
          />
          <div className="mt-12">
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {admissionSteps.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={i * 100}
                  className="relative text-center lg:text-left"
                >
                  {/* Connector spans only the gap to the next circle, so the line
                      stops at the final step instead of running off the page. */}
                  {i < admissionSteps.length - 1 && (
                    <span
                      className="absolute left-14 -right-8 top-7 hidden h-0.5 -translate-y-1/2 lg:block"
                      style={{ background: "linear-gradient(90deg,var(--color-royal-400),var(--color-sky-200))" }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex justify-center lg:justify-start">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-navy text-xl font-extrabold text-white shadow-[var(--shadow-card)]"
                      style={{ fontFamily: "var(--font-condensed)" }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.2rem]">{s.title}</h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{s.desc}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Book counselling */}
      <section id="enquiry" className="section bg-sky scroll-mt-20">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Book Free Counselling"
            title="Tell us about your child"
            intro="Message us on WhatsApp or give us a call — our counselling team will help you choose the right program, grade and mode."
          />

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={whatsappLink(counsellingMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              <Icon name="whatsapp" size={20} />
              Book on WhatsApp
            </a>
            <a href={`tel:${site.phoneDial}`} className="btn btn-outline">
              <Icon name="phone" size={18} /> {site.phoneDisplay}
            </a>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reassurance.map((r, i) => (
              <Reveal key={r.title} delay={i * 80} className="h-full">
                <div className="card flex h-full items-start gap-4 p-5">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${r.tone}`}
                  >
                    <Icon name={r.icon} size={24} />
                  </span>
                  <div>
                    <h3 className="text-[1.05rem]">{r.title}</h3>
                    <p className="mt-1 text-[0.9rem] text-muted">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers before you ask"
            intro="Still unsure? Our counsellors are one call away."
          />
          <div>
            <Accordion items={faqs} />
            <p className="mt-6 text-sm text-muted">
              Didn&apos;t find your answer?{" "}
              <Link href="/contact" className="font-semibold text-royal">
                Contact us
              </Link>{" "}
              or call{" "}
              <a href={`tel:${site.phoneDial}`} className="font-semibold text-royal">
                {site.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
