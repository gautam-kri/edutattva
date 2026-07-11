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
  return (
    <span className={`exp-badge ${className}`}>
      <span className="exp-badge__num">{years}</span>
      <span className="exp-badge__label">{label}</span>
    </span>
  );
}
