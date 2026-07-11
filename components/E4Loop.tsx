import { e4 } from "@/lib/data";
import Icon from "./Icon";
import Reveal from "./Reveal";

/** The E4 Engine — Explain → Engage → Evaluate → Elevate, as a four-step loop with lime accents. */
export default function E4Loop() {
  return (
    <div className="relative grid gap-4 md:grid-cols-4">
      {e4.map((s, i) => (
        <Reveal key={s.step} delay={i * 90} className="h-full">
          <div className="card h-full p-6 text-center md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span
                className="grid h-11 w-11 place-items-center rounded-full text-lg font-extrabold text-navy"
                style={{ background: "var(--color-lime)", fontFamily: "var(--font-condensed)" }}
              >
                E{i + 1}
              </span>
              <span
                className="hidden text-royal-400 md:ml-auto md:block"
                aria-hidden="true"
              >
                {i < e4.length - 1 ? (
                  <Icon name="arrow" size={22} />
                ) : (
                  <Icon name="sparkles" size={22} className="text-gold-600" />
                )}
              </span>
            </div>
            <h3 className="mt-4 text-[1.2rem]">{s.step}</h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{s.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
