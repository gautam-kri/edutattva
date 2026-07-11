import Icon, { type IconName } from "./Icon";

type Tone = "royal" | "gold" | "crimson" | "lime" | "navy";

const tones: Record<Tone, { bg: string; fg: string }> = {
  royal: { bg: "rgba(27,74,160,0.12)", fg: "var(--color-royal)" },
  gold: { bg: "rgba(245,183,0,0.16)", fg: "var(--color-gold-600)" },
  crimson: { bg: "rgba(200,16,46,0.12)", fg: "var(--color-crimson)" },
  lime: { bg: "rgba(148,168,20,0.16)", fg: "var(--color-lime-600)" },
  navy: { bg: "rgba(10,31,68,0.10)", fg: "var(--color-navy)" },
};

export default function IconCircle({
  name,
  tone = "royal",
  size = 56,
  iconSize = 26,
  className = "",
}: {
  name: IconName;
  tone?: Tone;
  size?: number;
  iconSize?: number;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <span
      className={`inline-grid place-items-center rounded-2xl ${className}`}
      style={{ width: size, height: size, background: t.bg, color: t.fg }}
    >
      <Icon name={name} size={iconSize} />
    </span>
  );
}
