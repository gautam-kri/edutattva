import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

/** Reusable navy inner-page hero (poster-style dark panel with gold accent). */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  align = "left",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 dotgrid opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(27,74,160,0.9), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 left-1/4 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(245,183,0,0.6), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className={`container-x relative py-16 md:py-20 ${
          align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
        }`}
      >
        {eyebrow && (
          <Eyebrow light center={align === "center"} className="mb-4">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="text-[clamp(2.1rem,5vw,3.6rem)] text-white">{title}</h1>
        <div className={`mt-5 ${align === "center" ? "mx-auto" : ""} h-1 w-16 rounded-full`} style={{ background: "linear-gradient(90deg,var(--color-gold),var(--color-lime))" }} />
        {subtitle && (
          <p className="mt-6 text-[1.08rem] leading-relaxed text-white/80">{subtitle}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
