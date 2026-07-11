import Link from "next/link";
import { site } from "@/lib/data";
import Icon from "./Icon";

export default function CTABand({
  title,
  text,
  primaryLabel = "Book Free Counselling",
  primaryHref = "/admissions",
}: {
  title: React.ReactNode;
  text?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 text-center text-white md:px-14 md:py-16">
          <div className="absolute inset-0 dotgrid opacity-50" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle,var(--color-gold),transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] text-white">{title}</h2>
            {text && <p className="mt-4 text-white/80">{text}</p>}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={primaryHref} className="btn btn-gold">
                {primaryLabel}
              </Link>
              <a
                href={`tel:${site.phoneDial}`}
                className="inline-flex items-center gap-2 text-lg font-bold text-gold"
                style={{ fontFamily: "var(--font-condensed)" }}
              >
                <Icon name="phone" size={20} />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
