import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ABOUT } from "@/data/about";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#work", label: "work" },
  { href: "#writing", label: "writing" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-bg/70 border-b border-ink/10">
      <div className="max-w-page mx-auto flex items-center justify-between gap-4 px-6 md:px-10 py-4">
        <Link to="/" className="font-display italic font-black text-xl md:text-2xl text-ink">
          {ABOUT.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-[13px] font-semibold uppercase tracking-wider text-muted hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${ABOUT.links.email}`}
            className="hidden sm:inline-flex btn-solid"
          >
            say hi
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
