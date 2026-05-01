import { ABOUT } from "@/data/about";

const SITEMAP = [
  { label: "about", href: "#about" },
  { label: "work", href: "#work" },
  { label: "writing", href: "#writing" },
  { label: "contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/15 mt-12">
      <div className="max-w-page mx-auto px-6 md:px-10 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <p className="font-display italic text-2xl text-ink">{ABOUT.name}</p>
          <p className="text-sm text-muted mt-2">{ABOUT.tagline}</p>
        </div>
        <div>
          <p className="eyebrow mb-3">sitemap</p>
          <ul className="space-y-1.5">
            {SITEMAP.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">socials</p>
          <ul className="space-y-1.5 text-sm text-muted">
            <li><a href={`mailto:${ABOUT.links.email}`} className="hover:text-ink">email</a></li>
            <li><a href={ABOUT.links.github} target="_blank" rel="noreferrer" className="hover:text-ink">github</a></li>
            <li><a href={ABOUT.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">linkedin</a></li>
            <li><a href={ABOUT.links.hashnode} target="_blank" rel="noreferrer" className="hover:text-ink">hashnode</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">now</p>
          <p className="text-sm text-muted">Architecting cloud systems · Shipping side projects · Reading security papers.</p>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="max-w-page mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wider text-muted">
          <span>© {new Date().getFullYear()} {ABOUT.name}</span>
          <span>built in Nairobi</span>
        </div>
      </div>
    </footer>
  );
}
