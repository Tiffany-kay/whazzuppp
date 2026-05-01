import SectionHeading from "@/components/shared/SectionHeading";
import { EXPERIENCE } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="experience"
        title="Experience"
      />
      <ol className="relative border-l border-ink/15 pl-6 md:pl-8 space-y-8">
        {EXPERIENCE.map((e) => (
          <li key={e.id} className="relative">
            <span className="absolute -left-[33px] md:-left-[41px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-bg" />
            <div className="card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display italic text-2xl text-ink">{e.role}</h3>
                <span className="text-sm text-muted">{e.period}</span>
              </div>
              <p className="mt-1 eyebrow">
                {e.company} · {e.location}
              </p>
              <p className="mt-4 text-muted leading-relaxed">{e.summary}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink/85">
                {e.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
