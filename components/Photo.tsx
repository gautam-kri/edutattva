/* Real image in an aspect-controlled, overflow-clipped frame. object-cover so any ratio fits. */
export default function Photo({
  src,
  alt,
  className = "",
  rounded = "rounded-2xl",
  aspect,
  position = "object-center",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  rounded?: string;
  aspect?: string;
  position?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-sky ${rounded} ${aspect ?? ""} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${position}`}
      />
    </div>
  );
}
