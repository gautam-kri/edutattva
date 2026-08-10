/* ============================================================
   WRITTEN TESTIMONIALS — drop new ones into the array at the bottom.

   Rendered by components/Testimonials.tsx as a signed letter card:

     ┃  “ The quote runs here, large and editorial.        ”
     ┃
     ┃                        — Lakshmi Narayanan, parent of Aditya
     ┃                        NIT Tiruchirappalli — Mechanical
     ┃                        Edu Edge, Siruseri · Class of 2025

   `quote` and `parentName` are required. Everything else is optional and
   simply disappears if you leave it out, so a bare quote + name still looks
   right. Fill in as much as each parent is happy to share.

   Ordering: cards appear in array order. The carousel starts on the first.

   Note on consent: `studentName` and `outcome` are personal details about a
   student who may have been a minor. Get the parent's written go-ahead before
   publishing either, and just omit the field if they would rather you didn't.
   ============================================================ */

export type Testimonial = {
  /** The quote itself. Do NOT wrap it in quotation marks — the card adds them. */
  quote: string;

  /** Parent's name, shown after the em dash. e.g. "Lakshmi Narayanan" */
  parentName: string;

  /** Student's first name. Renders as "parent of Aditya". Omit to show the name alone. */
  studentName?: string;

  /** The result, in royal blue under the name. A rank, a college or a board score —
   *  whatever fits. e.g. "AIR 4,812" · "NIT Tiruchirappalli — Mechanical" · "94% in CBSE" */
  outcome?: string;

  /** Programme completed. e.g. "Edu Edge" · "Edu Edge+" · "Edu Ignite" · "Ignite+" · "Foundation" */
  program?: string;

  /** Campus or mode. e.g. "Siruseri" · "Kelambakkam" · "Online" */
  campus?: string;

  /** Batch they finished with. e.g. "Class of 2025" */
  batch?: string;
};

/* ------------------------------------------------------------
   A full example — copy this block, paste it into the array below
   and overwrite the values:

  {
    quote:
      "We came for the results. We stayed because someone actually knew our son by name.",
    parentName: "Lakshmi Narayanan",
    studentName: "Aditya",
    outcome: "NIT Tiruchirappalli — Mechanical",
    program: "Edu Edge",
    campus: "Siruseri",
    batch: "Class of 2025",
  },

   ------------------------------------------------------------ */

/* ⚠️⚠️  EVERY ENTRY BELOW IS INVENTED  ⚠️⚠️
   The names, students, ranks, colleges and scores are all made up — they exist
   only to show the shape of a filled-in card. Publishing them as-is would put
   fabricated results and fabricated families in front of fee-paying parents.
   DELETE THE WHOLE ARRAY and paste in real testimonials before going live. */

export const testimonials: Testimonial[] = [
  {
    quote:
      "We had tried two other places before this. The difference here was that somebody called us — not to sell anything, just to say where Adhithya was slipping and what they were doing about it.",
    parentName: "Revathi Balasubramanian",
    studentName: "Adhithya",
    outcome: "NIT Tiruchirappalli — Mechanical",
    program: "Edu Edge",
    campus: "Siruseri",
    batch: "Class of 2025",
  },
  {
    quote:
      "Nivetha was strong in Physics and quietly terrified of Chemistry. Nobody papered over that. They rebuilt it chapter by chapter, and by the second year it had become her best paper.",
    parentName: "S. Karthikeyan",
    studentName: "Nivetha",
    outcome: "JEE Advanced — AIR 4,812",
    program: "Edu Edge+",
    campus: "Kelambakkam",
    batch: "Class of 2025",
  },
  {
    quote:
      "Starting in Class IX felt early to us at the time. It wasn't. By the time the board year arrived he had already built the habit, and there was no panic in our house that March.",
    parentName: "Lakshmi Priya Venkatesan",
    studentName: "Hariharan",
    outcome: "96% in CBSE Class X",
    program: "Edu Ignite",
    campus: "Siruseri",
    batch: "Class of 2024",
  },
  {
    quote:
      "We live too far for a daily commute, so online was the only option — and I expected the usual recorded videos. Kavya was on camera, answering questions, in a batch small enough that the teacher knew her name.",
    parentName: "Anbarasan Murugesan",
    studentName: "Kavya",
    outcome: "NEET qualified — 612/720",
    program: "Edu Edge Online",
    campus: "Online",
    batch: "Class of 2025",
  },
  /* This one deliberately leaves out `studentName` and `outcome` — the shape a
     card takes when a parent is happy to be quoted but not to have their child
     named. Both fields are optional precisely for this case. */
  {
    quote:
      "What I valued most was that the Olympiad work never came at the cost of school. The two reinforced each other, and my son stopped seeing maths as something to survive.",
    parentName: "Gayathri Ramachandran",
    program: "Foundation",
    campus: "Siruseri",
    batch: "Class of 2024",
  },
];
