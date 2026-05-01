import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * A section whose content can be expanded/collapsed by clicking the title.
 * Uses the grid-template-rows: 0fr ↔ 1fr trick so it animates cleanly to/from
 * auto height without measuring.
 */
export default function CollapsibleSection({
  id,
  eyebrow,
  title,
  lede,
  children,
  defaultOpen = true,
  className,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      id={id}
      className={cn(
        "max-w-page mx-auto px-6 md:px-10 transition-[padding] duration-500",
        open ? "py-20 md:py-28" : "py-10 md:py-12",
        className
      )}
    >
      <div
        className={cn(
          "max-w-prose transition-[margin] duration-500",
          open ? "mb-12" : "mb-0"
        )}
      >
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group flex items-center gap-3 text-left w-full"
          aria-expanded={open}
          aria-controls={`${id}-content`}
        >
          <h2 className="font-display italic text-4xl md:text-5xl text-ink leading-[1.05] flex-1">
            {title}
          </h2>
          <ChevronDown
            size={28}
            className={cn(
              "text-muted shrink-0 transition-transform duration-300 group-hover:text-ink",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
        {lede && open && (
          <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">{lede}</p>
        )}
      </div>

      <div
        id={`${id}-content`}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transition:
            "grid-template-rows 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>{children}</div>
      </div>
    </section>
  );
}
