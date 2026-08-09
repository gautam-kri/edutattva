import { e4 } from "@/lib/data";
import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";

/* One corner symbol per stage, matched to what that stage actually does:
   teach from the book → discuss → measure → lift. */
const stepIcons: IconName[] = ["book", "chat", "chart", "rocket"];

/* Clockwise 2x2 placement so the four stages read as a closed loop on desktop. */
const cellPos = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-2 md:row-start-1",
  "md:col-start-2 md:row-start-2",
  "md:col-start-1 md:row-start-2",
];

/* Connector arrows sit in the grid gaps, at the midpoint of each card edge. */
const connectors = [
  { pos: "left-1/2 top-1/4", rotate: "", label: "Explain leads to Engage" },
  { pos: "left-3/4 top-1/2", rotate: "rotate-90", label: "Engage leads to Evaluate" },
  { pos: "left-1/2 top-3/4", rotate: "rotate-180", label: "Evaluate leads to Elevate" },
  { pos: "left-1/4 top-1/2", rotate: "-rotate-90", label: "Elevate feeds back into Explain" },
];

/* Mobile diagram: four corners of a square, joined edge to edge. */
const corners = ["left-0 top-0", "right-0 top-0", "right-0 bottom-0", "left-0 bottom-0"];

const edges = [
  {
    line: "left-12 right-12 top-6 h-0.5 -translate-y-1/2",
    arrow: "left-1/2 top-6 -translate-x-1/2 -translate-y-1/2",
    rotate: "",
  },
  {
    line: "right-6 top-12 bottom-12 w-0.5 translate-x-1/2",
    arrow: "right-6 top-1/2 translate-x-1/2 -translate-y-1/2",
    rotate: "rotate-90",
  },
  {
    line: "left-12 right-12 bottom-6 h-0.5 translate-y-1/2",
    arrow: "left-1/2 bottom-6 -translate-x-1/2 translate-y-1/2",
    rotate: "rotate-180",
  },
  {
    line: "left-6 top-12 bottom-12 w-0.5 -translate-x-1/2",
    arrow: "left-6 top-1/2 -translate-x-1/2 -translate-y-1/2",
    rotate: "-rotate-90",
  },
];

/** The E4 Engine — Explain → Engage → Evaluate → Elevate.
 *  Desktop renders the true cycle; mobile stacks the stages and closes with a square loop. */
export default function E4Loop() {
  return (
    <div>
      <div className="relative grid gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-14">
        {e4.map((s, i) => (
          <Reveal key={s.step} delay={i * 90} className={`h-full ${cellPos[i]}`}>
            <div className="card relative h-full p-6 text-center md:text-left">
              {/* Corner symbol — shown at every breakpoint so the cards stay consistent */}
              <span className="absolute right-6 top-6 text-royal-400" aria-hidden="true">
                <Icon name={stepIcons[i]} size={22} />
              </span>
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full text-lg font-extrabold text-navy"
                  style={{ background: "var(--color-lime)", fontFamily: "var(--font-condensed)" }}
                >
                  E{i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-[1.2rem]">{s.step}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{s.desc}</p>
            </div>
          </Reveal>
        ))}

        {/* Cycle connectors — desktop only */}
        {connectors.map((c) => (
          <span
            key={c.pos}
            className={`pointer-events-none absolute hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_8px_18px_-8px_rgba(245,183,0,0.8)] md:grid ${c.pos}`}
          >
            <Icon name="arrow" size={18} className={c.rotate} />
            <span className="sr-only">{c.label}</span>
          </span>
        ))}
      </div>

      {/* Mobile: the stages stack in sequence above, so close the loop with a square cycle */}
      <div className="mt-5 md:hidden">
        <div className="card p-6">
          <p
            className="text-center text-[0.78rem] font-bold uppercase tracking-[0.12em] text-royal"
            style={{ fontFamily: "var(--font-condensed)" }}
          >
            How the cycle runs
          </p>

          <div className="relative mx-auto mt-6 h-[196px] w-[196px]">
            {edges.map((e) => (
              <span
                key={e.line}
                className={`absolute rounded-full bg-royal-400/35 ${e.line}`}
                aria-hidden="true"
              />
            ))}
            {edges.map((e) => (
              <span
                key={e.arrow}
                className={`absolute grid h-6 w-6 place-items-center rounded-full bg-white text-royal ${e.arrow}`}
                aria-hidden="true"
              >
                <Icon name="arrow" size={14} className={e.rotate} />
              </span>
            ))}
            {e4.map((s, i) => (
              <span
                key={s.step}
                className={`absolute grid h-12 w-12 place-items-center rounded-full text-[1rem] font-extrabold text-white ${corners[i]}`}
                style={{ background: "var(--color-royal)", fontFamily: "var(--font-condensed)" }}
              >
                E{i + 1}
                <span className="sr-only">{s.step}</span>
              </span>
            ))}
          </div>

          <p className="mt-6 text-center text-[0.82rem] font-semibold text-royal">
            Explain → Engage → Evaluate → Elevate, then repeat
          </p>
        </div>
      </div>
    </div>
  );
}
