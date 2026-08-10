import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/* ============================================================
   Video testimonials, read from public/video_testimonials/ at BUILD time.

   Each clip pairs with a same-named .txt:
     line 1  full name
     line 2  institute
     line 3  job title | organisation

   An optional same-named .jpg/.png is used as the poster still.
   Clips are ordered by filename, so renaming controls the order.

   Server-only (uses node:fs) — import this from a Server Component and pass
   the result down as props. Never import it from a "use client" module.
   ============================================================ */

export type VideoTestimonial = {
  src: string;
  poster?: string;
  name: string;
  institute: string;
  title: string;
};

const DIR = join(process.cwd(), "public", "video_testimonials");
const VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;
const POSTER_EXT = [".jpg", ".jpeg", ".png", ".webp"];

export function getVideoTestimonials(): VideoTestimonial[] {
  let files: string[];
  try {
    files = readdirSync(DIR);
  } catch {
    return []; // Folder missing — the section falls back to placeholders.
  }

  const present = new Set(files);

  return files
    .filter((f) => VIDEO_EXT.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((file): VideoTestimonial | null => {
      const base = file.replace(VIDEO_EXT, "");

      let lines: string[] = [];
      try {
        lines = readFileSync(join(DIR, `${base}.txt`), "utf8")
          .split(/\r?\n/)
          .map((l) => l.trim());
      } catch {
        return null; // No metadata — skip rather than render a nameless card.
      }

      const [name = "", institute = "", title = ""] = lines;
      if (!name) return null;

      const posterFile = POSTER_EXT.map((ext) => `${base}${ext}`).find((f) => present.has(f));

      return {
        src: `/video_testimonials/${file}`,
        poster: posterFile ? `/video_testimonials/${posterFile}` : undefined,
        name,
        institute,
        title,
      };
    })
    .filter((v): v is VideoTestimonial => v !== null);
}
