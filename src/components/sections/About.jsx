import SectionHeading from "@/components/shared/SectionHeading";
import { ABOUT } from "@/data/about";

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        eyebrow="about"
        title="About"
        lede={ABOUT.longBio}
      />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="card p-6">
          <p className="eyebrow">based in</p>
          <p className="mt-2 font-display italic text-2xl text-ink">{ABOUT.location}</p>
        </div>
        <div className="card p-6">
          <p className="eyebrow">building for</p>
          <p className="mt-2 font-display italic text-2xl text-ink">Africa & beyond</p>
        </div>
        <div className="card p-6">
          <p className="eyebrow">working in</p>
          <p className="mt-2 font-display italic text-2xl text-ink">Cloud · AI · Security</p>
        </div>
      </div>
    </section>
  );
}
