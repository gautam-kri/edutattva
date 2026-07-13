import Icon from "./Icon";

const defaults = [
  { name: "Parent — Grade 10 student", role: "Siruseri" },
  { name: "Edu Edge student", role: "Grade 12 · JEE" },
  { name: "Parent — Foundation student", role: "Kelambakkam" },
];

/** Placeholder grid where video testimonials will live (marked data-placeholder). */
export default function VideoTestimonials({
  items = defaults,
}: {
  items?: { name: string; role: string }[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((v, i) => (
        <figure key={i} className="card overflow-hidden" data-placeholder="true">
          <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-navy to-royal">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15 text-white ring-2 ring-white/40 backdrop-blur-sm">
              <Icon name="play" size={26} />
            </span>
            <span className="chip chip-gold absolute bottom-3 left-3">Video</span>
          </div>
          <figcaption className="p-5">
            <p className="font-bold text-navy">{v.name}</p>
            <p className="text-sm text-muted">{v.role}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
