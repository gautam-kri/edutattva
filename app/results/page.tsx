import type { Metadata } from "next";
import { trustLine } from "@/lib/data";
import { getVideoTestimonials } from "@/lib/videoTestimonials";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ResultsTabs from "@/components/ResultsTabs";
import VideoTestimonials from "@/components/VideoTestimonials";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Results — Top Ranks in IIT-JEE & NEET, Year after Year",
  description:
    "Edutattva results: in 2025, 55% of our students were JEE Advanced rankers, 60% qualified JEE Main and 75% scored 80%+ in CBSE. Year-wise IIT-JEE, NEET and Board outcomes.",
};

export default function ResultsPage() {
  const videos = getVideoTestimonials();

  return (
    <>
      <PageHero
        eyebrow="Results"
        title={
          <>
            Top ranks in IIT-JEE &amp; NEET,{" "}
            <span className="hl-gold">year after year</span>
          </>
        }
        subtitle="Real numbers from real batches. Here is how Edutattva students performed in JEE Advanced, JEE Main and the CBSE Board examinations."
      />

      {/* Year-wise results */}
      <section className="section">
        <div className="container-x">
          <ResultsTabs />
        </div>
      </section>

      {/* Heritage note */}
      <section className="section bg-navy text-white">
        <div className="container-x text-center">
          <div className="mb-4 flex justify-center gap-2 text-gold" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" size={22} style={{ fill: "var(--color-gold)" }} />
            ))}
          </div>
          <h2 className="mx-auto max-w-3xl text-[clamp(1.6rem,3.4vw,2.4rem)] text-white">
            Top Ranks Year after Year at{" "}
            <span className="hl-gold">FIITJEE &amp; FGS</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">{trustLine}.</p>
        </div>
      </section>

      {/* Video testimonials */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Video Testimonials"
            title="Hear it from those who have been there"
            intro="Alumni of IIT and NIT campuses — now at Letstransport, Stanford GSB and Amazon."
          />
          <div className="mt-10">
            <VideoTestimonials items={videos} />
          </div>
        </div>
      </section>

      <CTABand
        title="Your child's rank could be here next"
        text="Book a free counselling session and start a preparation built to produce results."
      />
    </>
  );
}
