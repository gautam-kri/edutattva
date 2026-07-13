import type { SVGProps } from "react";

export type IconName =
  | "book"
  | "star"
  | "target"
  | "spark"
  | "trophy"
  | "brain"
  | "stopwatch"
  | "rocket"
  | "users"
  | "chat"
  | "question"
  | "chart"
  | "mentor"
  | "notes"
  | "shield"
  | "gear"
  | "stethoscope"
  | "check"
  | "phone"
  | "whatsapp"
  | "mail"
  | "pin"
  | "arrow"
  | "calendar"
  | "clipboard"
  | "cap"
  | "flask"
  | "atom"
  | "sigma"
  | "dna"
  | "quote"
  | "chevron"
  | "menu"
  | "close"
  | "globe"
  | "clock"
  | "sparkles"
  | "layers"
  | "handshake"
  | "instagram"
  | "window"
  | "play";

const paths: Record<IconName, React.ReactNode> = {
  book: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM20 18v3H6.5A2.5 2.5 0 0 1 4 18.5" />,
  star: <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  spark: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 0 1-10 0z" />
      <path d="M7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3M9 20h6M12 13v3M9 20l.5-4h5l.5 4" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4A2.5 2.5 0 0 0 7 6.5 2.5 2.5 0 0 0 5.5 11 2.5 2.5 0 0 0 7 15.5 2.5 2.5 0 0 0 9.5 18 2.5 2.5 0 0 0 12 15.5V6.5A2.5 2.5 0 0 0 9.5 4Z" />
      <path d="M14.5 4A2.5 2.5 0 0 1 17 6.5 2.5 2.5 0 0 1 18.5 11 2.5 2.5 0 0 1 17 15.5 2.5 2.5 0 0 1 14.5 18 2.5 2.5 0 0 1 12 15.5" />
    </>
  ),
  stopwatch: (
    <>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 13V9M9 2h6M12 6V2M18.5 7.5l1.5-1.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3 1.5 5 4.5 5 8l-2 4H9l-2-4c0-3.5 2-6.5 5-8Z" />
      <circle cx="12" cy="9.5" r="1.5" />
      <path d="M9 15l-2 5 4-2M15 15l2 5-4-2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6a3 3 0 0 1 0 6M17 20a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H8l-4 4z" />
      <path d="M8 9h8M8 12.5h5" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7" />
      <circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 15l3-4 3 2 4-6" />
    </>
  ),
  mentor: (
    <>
      <circle cx="10" cy="8" r="3" />
      <path d="M4 20a6 6 0 0 1 12 0" />
      <path d="m18 4 .9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2L15.1 6.2l2-.3z" />
    </>
  ),
  notes: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5M9 12h7M9 16h7M9 8h3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M6 3H4M14 3h2M10 15v1a5 5 0 0 0 10 0v-2" />
      <circle cx="20" cy="13" r="2" />
    </>
  ),
  check: <path d="m5 12 5 5 9-11" />,
  phone: <path d="M4 5c0 8 7 15 15 15l1-3-4-2-2 2c-3-1.5-5.5-4-7-7l2-2-2-4z" />,
  whatsapp: (
    <>
      <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" />
      <path d="M9 9c0 3 2.5 5.5 5.5 5.5.6 0 1.2-.5 1.2-1l-1.7-.8-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1L10.5 8c-.5 0-1 .6-1 1z" fill="currentColor" stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4-4.5 7-8 7-11a7 7 0 1 0-14 0c0 3 3 6.5 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M8 3v4M16 3v4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4h6v3H9zM8.5 11l1.5 1.5L13 9M8.5 16l1.5 1.5L13 14" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-4 10 4-10 4z" />
      <path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4M22 9v5" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6l-4.5 8a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9V3" />
      <path d="M8 15h8" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  sigma: <path d="M17 4H6l6 8-6 8h11" />,
  dna: (
    <>
      <path d="M7 3c0 5 10 5 10 10s-10 5-10 10M17 3c0 5-10 5-10 10s10 5 10 10" />
      <path d="M8 6h8M8 18h8M9.5 9h5M9.5 15h5" />
    </>
  ),
  quote: (
    <path
      d="M8 6c-2.5 1-4 3.2-4 6v6h6v-6H6c0-2 1-3.5 3-4zm10 0c-2.5 1-4 3.2-4 6v6h6v-6h-4c0-2 1-3.5 3-4z"
      fill="currentColor"
      stroke="none"
    />
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  sparkles: (
    <path
      d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z"
      fill="currentColor"
      stroke="none"
    />
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5M3 16.5l9 5 9-5" />
    </>
  ),
  handshake: (
    <>
      <path d="M12 8 9 5 3 9v6l3 2 3-2M12 8l3-3 6 4v6l-3 2-3-2" />
      <path d="M9 15l2 2M12 8l-2 2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  window: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="9" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export default function Icon({ name, size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
