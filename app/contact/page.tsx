import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Contact — Call, WhatsApp or Visit Us in Chennai",
  description:
    "Contact Edutattva Classes: call 7075 7075 40, WhatsApp us, email enquiries@edutattva.com, or visit our SJPS Siruseri and BHIS Kelambakkam campuses.",
};

const methods: { icon: IconName; label: string; value: string; href: string; tone: string }[] = [
  { icon: "phone", label: "Call us", value: site.phoneDisplay, href: `tel:${site.phoneDial}`, tone: "royal" },
  { icon: "whatsapp", label: "WhatsApp", value: "Chat with us", href: site.whatsapp, tone: "lime" },
  { icon: "mail", label: "Email", value: "enquiries@edutattva.com", href: "mailto:enquiries@edutattva.com", tone: "gold" },
];

const campuses = [
  {
    name: "SJPS (St John's), Siruseri",
    note: "Integrated & Foundation programs",
    query: "SJPS St John's Siruseri Chennai",
  },
  {
    name: "BHIS (Billabong), Kelambakkam",
    note: "Integrated Edu Ignite & Edu Edge",
    query: "Billabong High International School Kelambakkam Chennai",
  },
];

const toneBg: Record<string, string> = {
  royal: "bg-royal/12 text-royal",
  lime: "bg-lime/20 text-lime-600",
  gold: "bg-gold/15 text-gold-600",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about your child&apos;s{" "}
            <span className="hl-gold">next step</span>
          </>
        }
        subtitle="Call, message or visit — our team is happy to help you find the right program, answer questions about fees and modes, and book a free counselling session."
      />

      {/* Contact methods */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-3">
            {methods.map((m, i) => (
              <Reveal key={m.label} delay={i * 80} className="h-full">
                <a
                  href={m.href}
                  target={m.icon === "whatsapp" ? "_blank" : undefined}
                  rel={m.icon === "whatsapp" ? "noopener noreferrer" : undefined}
                  className="card card-hover flex h-full items-center gap-4 p-6"
                >
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${toneBg[m.tone]}`}>
                    <Icon name={m.icon} size={28} />
                  </span>
                  <span>
                    <span className="block text-[0.8rem] font-semibold uppercase tracking-wide text-muted">
                      {m.label}
                    </span>
                    <span className="block text-[1.15rem] font-bold text-navy">{m.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Campuses */}
      <section className="section-tight">
        <div className="container-x">
          <SectionHeading eyebrow="Our Campuses" title="Two locations across Chennai" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {campuses.map((c) => (
              <div key={c.name} className="card overflow-hidden">
                <div className="relative aspect-[16/9] w-full bg-sky" data-placeholder="true">
                  <iframe
                    title={`Map — ${c.name}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(c.query)}&z=14&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <div className="flex items-start gap-3 p-6">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-crimson/12 text-crimson">
                    <Icon name="pin" size={22} />
                  </span>
                  <div>
                    <h3 className="text-[1.15rem]">{c.name}</h3>
                    <p className="mt-0.5 text-sm text-muted">{c.note}</p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(c.query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-royal"
                    >
                      Get directions <Icon name="arrow" size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office hours + mini form */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Reach Us" title="Office hours & quick enquiry" />
            <div className="card mt-6 p-6" data-placeholder="true">
              <div className="flex items-center gap-2 text-navy">
                <Icon name="clock" size={20} className="text-royal" />
                <h3 className="text-[1.1rem]">Office Hours</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                <li className="flex justify-between border-b border-sky-200 pb-2.5">
                  <span className="text-muted">Monday – Saturday</span>
                  <span className="font-semibold text-navy">[ 9:00 AM – 7:00 PM ]</span>
                </li>
                <li className="flex justify-between border-b border-sky-200 pb-2.5">
                  <span className="text-muted">Sunday</span>
                  <span className="font-semibold text-navy">[ Class days — by schedule ]</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted">Public holidays</span>
                  <span className="font-semibold text-navy">[ Closed ]</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-navy p-6 text-white">
              <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                For more details, call
              </p>
              <a
                href={`tel:${site.phoneDial}`}
                className="text-[2rem] font-extrabold text-gold"
                style={{ fontFamily: "var(--font-condensed)" }}
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-sky p-8 text-center">
            <h2 className="text-[1.5rem]">Ready to enquire?</h2>
            <p className="mx-auto mt-2 max-w-sm text-muted">
              Fill in our enquiry form and our counselling team will help you choose the right
              program, grade and mode.
            </p>
            <Link href="/admissions#enquiry" className="btn btn-gold mx-auto mt-6">
              Go to the enquiry form <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
