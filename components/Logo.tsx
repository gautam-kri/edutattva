type LogoProps = {
  variant?: "full" | "mark";
  theme?: "dark" | "light"; // wordmark ink color: dark = for light bg, light = for dark bg
  className?: string;
};

/** Open-book + star emblem with the Edutattva wordmark lockup. */
export default function Logo({ variant = "full", theme = "dark", className = "" }: LogoProps) {
  const wordColor = theme === "light" ? "#ffffff" : "var(--color-navy)";
  const tagColor = theme === "light" ? "rgba(255,255,255,0.7)" : "var(--color-royal)";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-mark.png"
        alt="Edutattva Classes logo"
        width={44}
        height={44}
        className="h-11 w-auto shrink-0"
        style={
          theme === "light"
            ? { filter: "drop-shadow(0 0 5px rgba(234,241,251,0.55)) drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }
            : undefined
        }
      />

      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display font-extrabold tracking-tight text-[1.18rem] leading-none"
            style={{ color: wordColor, fontFamily: "var(--font-display)" }}
          >
            EDUTATTVA <span style={{ color: "var(--color-royal-400)" }}>CLASSES</span>
          </span>
          <span
            className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em]"
            style={{ color: tagColor, fontFamily: "var(--font-condensed)" }}
          >
            Where Fundamentals Become Excellence
          </span>
        </span>
      )}
    </span>
  );
}
