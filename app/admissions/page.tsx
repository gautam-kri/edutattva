import type { Metadata } from "next";
import { admissionSteps, faqs, site } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import EnquiryForm from "@/components/EnquiryForm";
import Icon from "@/components/Icon";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admissions 2026–27 — Book a Free Counselling Session",
  description:
    "Admissions open for 2026–27. Follow the Edutattva journey: Enquiry → Counselling → Assessment → Enrollment. Scholarships & installments available. Book your free counselling session.",
};

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
        <a href="#enquiry" className="btn btn-gold">
          Book Free Counselling
        </a>
        <a href={`tel:${site.phoneDial}`} className="btn btn-ghost">
          <Icon name="phone" size={18} /> {site.phoneDisplay}
        </a>
      </PageHero>

      {/* Stepper */}
      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="The Admission Journey" title="Four steps, fully guided" />
          <div className="relative mt-12">
            <div
              className="absolute left-0 right-0 top-7 hidden h-0.5 lg:block"
              style={{ background: "linear-gradient(90deg,var(--color-sky-200),var(--color-royal-400),var(--color-sky-200))" }}
              aria-hidden="true"
            />
            <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {admissionSteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 100}>
                  <li className="text-center lg:text-left">
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
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Form + reassurance */}
      <section id="enquiry" className="section bg-sky scroll-mt-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Book Free Counselling"
              title="Tell us about your child"
              intro="Share a few details and our counselling team will help you choose the right program, grade and mode."
            />
            <div className="mt-6 space-y-4">
              <div className="card flex items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-600">
                  <Icon name="handshake" size={24} />
                </span>
                <div>
                  <h3 className="text-[1.05rem]">Scholarships &amp; installments</h3>
                  <p className="mt-1 text-[0.9rem] text-muted">
                    Installment options are available for Edu Ignite (9–10) and Edu Edge (11–12). Ask
                    our counsellor about current scholarship and fee plans.
                  </p>
                </div>
              </div>
              <div className="card flex items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal/12 text-royal">
                  <Icon name="check" size={24} />
                </span>
                <div>
                  <h3 className="text-[1.05rem]">No hidden charges</h3>
                  <p className="mt-1 text-[0.9rem] text-muted">
                    Every fee includes Edutattva study material, online testing platform access and
                    all taxes.
                  </p>
                </div>
              </div>
              <div className="card flex items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-crimson/12 text-crimson">
                  <Icon name="pin" size={24} />
                </span>
                <div>
                  <h3 className="text-[1.05rem]">Two campuses + online</h3>
                  <p className="mt-1 text-[0.9rem] text-muted">
                    SJPS (St John's), Siruseri and BHIS (Billabong), Kelambakkam — or learn live from
                    anywhere.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <EnquiryForm />
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
