import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CollapsibleSection from "@/components/shared/CollapsibleSection";
import { SKILL_ROOTS } from "@/data/skills";
import { CERTIFICATIONS, EDUCATION } from "@/data/credentials";
import { cn } from "@/lib/cn";

export default function Credentials() {
  return (
    <CollapsibleSection
      id="credentials"
      eyebrow="credentials"
      title="Skills, certifications, education."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <SkillsAccordion />
        <CertList />
        <EducationList />
      </div>
    </CollapsibleSection>
  );
}

function SkillsAccordion() {
  const [open, setOpen] = useState(SKILL_ROOTS[0].id);
  return (
    <div className="card p-6">
      <p className="eyebrow mb-4">skills</p>
      <ul className="divide-y divide-ink/10">
        {SKILL_ROOTS.map((r) => {
          const isOpen = open === r.id;
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : r.id)}
                className="w-full flex items-center justify-between py-3 text-left"
              >
                <span className="font-display italic text-lg text-ink">{r.label}</span>
                <ChevronDown
                  size={16}
                  className={cn("transition-transform text-muted", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && (
                <div className="pb-4 flex flex-wrap gap-1.5">
                  {r.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-medium px-2.5 py-1 rounded-full border border-ink/20 text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CertList() {
  return (
    <div className="card p-6">
      <p className="eyebrow mb-4">certifications</p>
      <ul className="space-y-4">
        {CERTIFICATIONS.map((c) => (
          <li key={c.id} className="border-l-2 border-accent/60 pl-4">
            <p className="text-xs uppercase tracking-wider text-muted">{c.issuer}</p>
            <p className="font-display italic text-lg text-ink leading-tight">{c.name}</p>
            <p className="text-sm text-muted mt-1">{c.description}</p>
            {c.verifyUrl && (
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-xs font-semibold text-accent uppercase tracking-wider"
              >
                verify ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationList() {
  return (
    <div className="card p-6">
      <p className="eyebrow mb-4">education</p>
      <ul className="space-y-4">
        {EDUCATION.map((e) => (
          <li key={e.id}>
            <p className="font-display italic text-xl text-ink leading-tight">{e.school}</p>
            <p className="text-sm text-ink/80 mt-1">{e.degree}</p>
            <p className="text-xs text-muted mt-1">
              {e.period} · {e.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
