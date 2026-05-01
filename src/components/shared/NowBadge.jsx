import { cn } from "@/lib/cn";

export default function NowBadge({ className, label = "now", text = "Building Mental Baddie" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-ink/20 bg-surface/60 px-3 py-1 text-xs font-medium text-muted",
        className
      )}
    >
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="uppercase tracking-wider">{label}</span>
      <span className="text-ink">·</span>
      <span>{text}</span>
    </span>
  );
}
