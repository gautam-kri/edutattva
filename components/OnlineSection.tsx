import { onlineCompare, onlineFeatures, onlineIntro } from "@/lib/data";
import Reveal from "./Reveal";
import Icon, { type IconName } from "./Icon";

const featureIcons: IconName[] = ["chat", "users", "question", "chart", "mentor", "notes"];

/** The Online tier panel — shared verbatim by the Edu Edge and Edu Ignite pages. */
export default function OnlineSection({
  name,
  badge,
}: {
  /** e.g. "Edu Edge Online" */
  name: string;
  /** Grade band + audience, shown in the chip directly above the title. */
  badge: string;
}) {
  return (
    <section
      id="online"
      className="section relative overflow-hidden bg-navy pt-12 text-white scroll-mt-20 md:pt-14"
    >
      {/* Live-class backdrop: scaled to the full width, anchored to the top, and faded
          out by an overlaid navy gradient — 40% visible at the top, gone by the middle.
          Overlay alpha is the inverse of the image opacity (0.6 overlay = 40% image). */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(to bottom, rgba(10,31,68,0.6) 0%, rgba(10,31,68,0.8) 10%, rgba(10,31,68,0.94) 20%, rgba(10,31,68,1) 30%, rgba(10,31,68,1) 100%)",
            "url(/photos/online-class.jpg)",
          ].join(", "),
          backgroundSize: "100% 100%, 100% auto",
          backgroundPosition: "center, center top",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="chip chip-crimson">{badge}</span>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.2rem)] text-white">{name}</h2>
            <p
              className="mt-2 text-[clamp(1.1rem,2.2vw,1.45rem)] font-bold leading-snug text-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {onlineIntro.subtitle}
            </p>
            <p className="mt-4 max-w-xl text-white/80">{onlineIntro.body}</p>
          </div>
          <div className="flex justify-center lg:justify-start lg:pl-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edu-edge/seal.png"
              alt="Just ₹50 Thousand — All Inclusive. No hidden charges, everything included."
              className="anim-float w-60 max-w-full drop-shadow-[0_22px_45px_rgba(245,183,0,0.35)]"
            />
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-14">
          <h3 className="text-center text-[1.5rem] text-white">
            Why is <span className="hl-crimson">{name}</span> different?
          </h3>
          <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <span className="chip chip-crimson">Most Online Coaching</span>
              <ul className="mt-5 space-y-3.5">
                {onlineCompare.most.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-white/75">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-crimson/20 text-crimson">
                      <Icon name="close" size={14} />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-lime/40 bg-lime/5 p-7">
              <span className="chip chip-lime">{name} Class</span>
              <ul className="mt-5 space-y-3.5">
                {onlineCompare.edge.map((m) => (
                  <li key={m} className="flex items-start gap-3 font-medium text-white">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime text-navy">
                      <Icon name="check" size={14} />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Six features */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {onlineFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 60} className="h-full">
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                  <Icon name={featureIcons[i]} size={24} />
                </span>
                <h4 className="mt-4 text-[1.05rem] font-bold text-white">{f.title}</h4>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-white/70">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
