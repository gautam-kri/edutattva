import type { ReactNode } from "react";

export default function Eyebrow({
  children,
  light = false,
  center = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`eyebrow ${light ? "eyebrow--light" : ""} ${
        center ? "eyebrow--center" : ""
      } ${className}`}
    >
      {children}
    </p>
  );
}
