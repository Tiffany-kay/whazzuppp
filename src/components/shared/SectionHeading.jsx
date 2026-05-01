import { cn } from "@/lib/cn";

export default function SectionHeading({ eyebrow, title, lede, align = "left", className }) {
  return (
    <div
      className={cn(
        "mb-12 max-w-prose",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display italic text-4xl md:text-5xl text-ink leading-[1.05]">
        {title}
      </h2>
      {lede && <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">{lede}</p>}
    </div>
  );
}
