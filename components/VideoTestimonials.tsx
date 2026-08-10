"use client";

import { useState } from "react";
import type { VideoTestimonial } from "@/lib/videoTestimonials";
import Icon from "./Icon";

/* Shown until clips are added to public/video_testimonials/. */
const placeholders = [
  { name: "Parent — Grade 10 student", institute: "Siruseri", title: "" },
  { name: "Edu Edge student", institute: "Grade 12 · JEE", title: "" },
  { name: "Parent — Foundation student", institute: "Kelambakkam", title: "" },
];

function Caption({
  name,
  institute,
  title,
}: {
  name: string;
  institute: string;
  title: string;
}) {
  return (
    <figcaption className="p-5">
      <p className="font-bold text-navy">{name}</p>
      {institute && (
        <p className="mt-0.5 text-[0.85rem] font-semibold text-royal">{institute}</p>
      )}
      {title && <p className="mt-0.5 text-[0.82rem] leading-snug text-muted">{title}</p>}
    </figcaption>
  );
}

/** Click-to-play card: nothing downloads until the visitor asks for it. */
function VideoCard({ v }: { v: VideoTestimonial }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="card flex flex-col overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-navy to-royal">
        {playing ? (
          <video
            src={v.src}
            poster={v.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full bg-navy object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video testimonial from ${v.name}`}
            className="group absolute inset-0 grid place-items-center"
          >
            {v.poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={v.poster}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white/15 text-white ring-2 ring-white/40 backdrop-blur-sm transition-transform group-hover:scale-110">
              <Icon name="play" size={26} />
            </span>
            <span className="chip chip-gold absolute bottom-3 left-3">Video</span>
          </button>
        )}
      </div>
      <Caption name={v.name} institute={v.institute} title={v.title} />
    </figure>
  );
}

export default function VideoTestimonials({ items = [] }: { items?: VideoTestimonial[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.length > 0
        ? items.map((v) => <VideoCard key={v.src} v={v} />)
        : placeholders.map((p, i) => (
            <figure key={i} className="card overflow-hidden" data-placeholder="true">
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-navy to-royal">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15 text-white ring-2 ring-white/40 backdrop-blur-sm">
                  <Icon name="play" size={26} />
                </span>
                <span className="chip chip-gold absolute bottom-3 left-3">Video</span>
              </div>
              <Caption name={p.name} institute={p.institute} title={p.title} />
            </figure>
          ))}
    </div>
  );
}
