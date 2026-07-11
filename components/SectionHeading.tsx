import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  light = false,
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} ${center ? "max-w-2xl" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <Eyebrow light={light} center={center} className="mb-3">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className="text-[clamp(1.75rem,3.6vw,2.7rem)]"
        style={light ? { color: "#fff" } : undefined}
      >
        {title}
      </h2>
      {intro && (
        <p
          className="mt-4 text-[1.05rem] leading-relaxed"
          style={{ color: light ? "rgba(255,255,255,0.82)" : "var(--color-muted)" }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
