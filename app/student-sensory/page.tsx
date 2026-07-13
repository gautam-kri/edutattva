import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Student Sensory — Coming Soon",
  description:
    "The Edutattva Student Sensory portal is on its way — a dedicated space for students to learn, practise, attend live classes and track their progress.",
};

export default function StudentSensoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Student Sensory"
        title={
          <>
            The student portal, <span className="hl-gold">coming soon</span>
          </>
        }
        subtitle="A dedicated space for Edutattva students — lessons, practice, tests and progress, all in one place. We're putting the finishing touches on it."
      >
        <Link href="/admissions" className="btn btn-gold">
          Book Free Counselling
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Contact us <Icon name="arrow" size={18} />
        </Link>
      </PageHero>

      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-sky text-royal">
              <Icon name="window" size={30} />
            </span>
            <h2 className="mt-6 text-[clamp(1.5rem,3vw,2.2rem)]">Something great is being built</h2>
            <p className="mt-4 text-muted">
              The Student Sensory experience will give every learner personalised practice,
              live-class access, weekly doubt clinics and performance analytics. Check back soon.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Questions in the meantime?"
        text="Our team is here to help you choose the right program and get started."
      />
    </>
  );
}
