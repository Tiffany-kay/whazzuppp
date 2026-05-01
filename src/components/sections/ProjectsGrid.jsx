import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CollapsibleSection from "@/components/shared/CollapsibleSection";
import { PROJECTS } from "@/data/projects";
import { SKILL_ROOTS } from "@/data/skills";
import { cn } from "@/lib/cn";

const HUE_GRADIENTS = {
  amber: "from-[#fff4c0] via-[#ffb84a] to-[#c46a18]",
  coral: "from-[#ffe0d0] via-[#ff8a6e] to-[#a83a26]",
  rose: "from-[#ffd6dc] via-[#ff6b8a] to-[#a82048]",
  teal: "from-[#d0fff0] via-[#5ad4c0] to-[#1a6e60]",
  violet: "from-[#ecd6ff] via-[#b87aff] to-[#5a2899]",
};

export default function ProjectsGrid() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.skillTags.includes(filter));
  }, [filter]);

  return (
    <CollapsibleSection
      id="work"
      eyebrow="selected work"
      title="Five fruits, one tree."
      lede="Recent projects across cloud, AI, and security."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
          all
        </FilterPill>
        {SKILL_ROOTS.map((r) => (
          <FilterPill
            key={r.id}
            active={filter === r.id}
            onClick={() => setFilter(r.id)}
          >
            {r.label}
          </FilterPill>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="card overflow-hidden flex flex-col group transition-transform hover:-translate-y-1"
          >
            <div
              className={cn(
                "h-24 w-full bg-gradient-to-br",
                HUE_GRADIENTS[p.hue] || HUE_GRADIENTS.amber
              )}
              aria-hidden="true"
            />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="pill">{p.status}</span>
                <span className="text-xs text-muted">{p.year}</span>
              </div>
              <h3 className="mt-4 font-display italic text-2xl text-ink leading-tight">
                {p.name}
              </h3>
              <p className="mt-1 eyebrow">{p.role}</p>
              <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-ink/20 text-muted"
                  >
                    {t}
                  </span>
                ))}
                {p.tech.length > 4 && (
                  <span className="text-[11px] text-muted">+{p.tech.length - 4} more</span>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <Link
                  to={`/work/${p.slug}`}
                  className="text-sm font-semibold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  read case study <ArrowUpRight size={14} />
                </Link>
                {p.links.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs uppercase tracking-wider text-muted hover:text-ink"
                  >
                    visit ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </CollapsibleSection>
  );
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all",
        active
          ? "bg-accent text-bg border-accent"
          : "border-ink/20 text-muted hover:text-ink hover:border-ink/40"
      )}
    >
      {children}
    </button>
  );
}
