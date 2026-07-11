import Icon, { type IconName } from "./Icon";

/**
 * Styled photo placeholder — never a broken <img>.
 * Marked with data-placeholder so real assets are easy to swap in later.
 */
export default function Placeholder({
  label,
  icon = "cap",
  className = "",
  rounded = "rounded-2xl",
  aspect,
  minH,
}: {
  label: string;
  icon?: IconName;
  className?: string;
  rounded?: string;
  aspect?: string; // e.g. "aspect-[4/3]"
  minH?: string; // e.g. "min-h-[220px]"
}) {
  return (
    <div
      data-placeholder="true"
      role="img"
      aria-label={label}
      className={`ph ${rounded} ${aspect ?? ""} ${minH ?? ""} ${className}`}
    >
      <div className="flex flex-col items-center gap-3 px-5 text-center">
        <span className="grid place-items-center rounded-full bg-white/12 p-3 ring-1 ring-white/20">
          <Icon name={icon} size={28} />
        </span>
        <span
          className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/85"
          style={{ fontFamily: "var(--font-condensed)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
