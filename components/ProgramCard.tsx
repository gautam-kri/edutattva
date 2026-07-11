import Link from "next/link";
import Icon from "./Icon";

const accents: Record<string, { bar: string; chip: string; text: string }> = {
  lime: { bar: "var(--color-lime)", chip: "chip-lime", text: "var(--color-lime-600)" },
  royal: { bar: "var(--color-royal)", chip: "chip-sky", text: "var(--color-royal)" },
  gold: { bar: "var(--color-gold)", chip: "chip-gold", text: "var(--color-gold-600)" },
  crimson: { bar: "var(--color-crimson)", chip: "chip-crimson", text: "var(--color-crimson)" },
};

export default function ProgramCard({
  code,
  grades,
  pitch,
  href,
  accent = "royal",
}: {
  code: string;
  grades: string;
  pitch: string;
  href: string;
  accent?: string;
}) {
  const a = accents[accent] ?? accents.royal;
  return (
    <Link
      href={href}
      className="card card-hover group flex flex-col overflow-hidden focus-visible:outline-none"
    >
      <span className="h-1.5 w-full" style={{ background: a.bar }} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-6">
        <span className={`chip ${a.chip} self-start`}>{grades}</span>
        <h3 className="mt-4 text-[1.35rem]">{code}</h3>
        <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted">{pitch}</p>
        <span
          className="mt-5 inline-flex items-center gap-1.5 text-[0.92rem] font-bold"
          style={{ color: a.text, fontFamily: "var(--font-display)" }}
        >
          View Program
          <Icon
            name="arrow"
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
