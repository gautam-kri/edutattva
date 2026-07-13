import Link from "next/link";
import { nav, site } from "@/lib/data";
import Logo from "./Logo";
import Icon from "./Icon";
import EmailComposer from "./EmailComposer";

const programLinks = nav.find((n) => n.label === "Programs")?.children ?? [];

const socialCls =
  "grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-gold hover:text-navy";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/75">
      {/* Poster-style gold phone band */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-center gap-3 py-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
            For more details, call
          </p>
          <a
            href={`tel:${site.phoneDial}`}
            className="text-[clamp(2rem,5vw,3rem)] font-extrabold leading-none tracking-tight text-gold transition-transform hover:scale-[1.02]"
            style={{ fontFamily: "var(--font-condensed)" }}
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo theme="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            IIT-JEE · NEET · Foundation coaching in Chennai. Mentorship-driven, systems-led and
            genuinely affordable — quality at an affordable fee.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className={socialCls}
            >
              <Icon name="whatsapp" size={18} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-placeholder="true"
              aria-label="Instagram (coming soon)"
              className={socialCls}
            >
              <Icon name="instagram" size={18} />
            </a>
            <EmailComposer className={socialCls} />
            <a
              href={`tel:${site.phoneDial}`}
              aria-label={`Call ${site.phoneDisplay}`}
              className={socialCls}
            >
              <Icon name="phone" size={18} />
            </a>
          </div>

          <Link
            href="/student-sensory"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-gold"
          >
            <Icon name="window" size={16} className="text-gold" />
            Student Sensory
          </Link>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.label}>
                <Link href={n.href} className="transition-colors hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Programs</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {programLinks.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="transition-colors hover:text-gold">
                  {p.label} {p.note && <span className="text-white/45">· {p.note}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Reach Us</h3>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <Icon name="phone" size={18} className="mt-0.5 shrink-0 text-gold" />
              <a href={`tel:${site.phoneDial}`} className="hover:text-gold">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="globe" size={18} className="mt-0.5 shrink-0 text-gold" />
              <span>{site.website}</span>
            </li>
            {site.locations.map((l) => (
              <li key={l.name} className="flex items-start gap-2.5">
                <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {l.name} <span className="text-white/45">— {l.area}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-center text-[0.8rem] text-white/55 sm:flex-row sm:text-left">
          <p>© {year} Edutattva Classes. All rights reserved.</p>
          <p>Where Fundamentals Become Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
