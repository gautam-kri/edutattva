/** The signature crimson experience badge from the poster. */
export default function ExpBadge({
  years,
  label = "Years of Experience",
  className = "",
}: {
  years: string;
  label?: string;
  className?: string;
}) {
  // If the default label is used, we can make it responsive
  const isDefaultLabel = label === "Years of Experience";

  return (
    <span className={`exp-badge ${className}`}>
      <span className="exp-badge__num">{years}</span>
      <span className="exp-badge__label">
        {isDefaultLabel ? (
          <>
            <span className="hidden sm:inline">Years of Experience</span>
            <span className="sm:hidden">Yrs Exp</span>
          </>
        ) : (
          label
        )}
      </span>
    </span>
  );
}
