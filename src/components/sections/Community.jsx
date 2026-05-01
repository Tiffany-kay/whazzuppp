import SectionHeading from "@/components/shared/SectionHeading";
import { COMMUNITY } from "@/data/community";

export default function Community() {
  return (
    <section id="community" className="section">
      <SectionHeading
        eyebrow="community"
        title="Community"
      />
      <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-10 md:px-10 snap-x snap-mandatory">
        {COMMUNITY.map((c) => (
          <article
            key={c.id}
            className="card p-6 min-w-[280px] snap-start flex flex-col"
          >
            <p className="eyebrow">{c.role}</p>
            <h3 className="mt-2 font-display italic text-xl text-ink leading-tight">{c.name}</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{c.description}</p>
          </article>
        ))}
        <a
          href="#contact"
          className="card p-6 min-w-[280px] snap-start flex flex-col items-start justify-center border-dashed hover:border-accent transition-colors"
        >
          <p className="eyebrow">join the list</p>
          <p className="mt-2 font-display italic text-xl text-ink">Add yours →</p>
          <p className="mt-3 text-sm text-muted">Looking for mentorship or a collab? Reach out.</p>
        </a>
      </div>
    </section>
  );
}
