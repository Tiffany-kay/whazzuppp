import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import NowBadge from "@/components/shared/NowBadge";
import TreeScene from "@/components/tree/TreeScene";
import Avatar from "@/components/shared/Avatar";
import { ABOUT } from "@/data/about";

export default function Hero() {
  const navigate = useNavigate();
  const [hoveredRoot, setHoveredRoot] = useState(null);

  function handleSelectProject(p) {
    navigate(`/work/${p.slug}`);
  }

  const hint = hoveredRoot
    ? `filtering by ${hoveredRoot}`
    : "hover the roots · click a fruit";

  return (
    <section id="hero" className="section pt-12 md:pt-16">
      <div className="grid gap-10 md:gap-14 md:grid-cols-[1fr_1.15fr] items-center">
        <div>
          <NowBadge />
          <h1 className="mt-6 font-display italic font-black text-5xl md:text-7xl leading-[0.95] text-ink">
            {ABOUT.name}
          </h1>
          <p className="mt-5 eyebrow">{ABOUT.tagline}</p>
          <p className="mt-6 max-w-prose text-lg text-muted leading-relaxed">{ABOUT.bio}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn-solid">
              see the work <ArrowRight size={16} />
            </a>
            <a href={ABOUT.links.cv} className="btn text-ink">
              <Download size={15} /> resume
            </a>
          </div>
        </div>

        <div className="h-[520px] md:h-[600px] lg:h-[680px] w-full relative rounded-3xl overflow-hidden border border-ink/10 bg-gradient-to-b from-bg via-bg to-surface/30">
          <TreeScene
            hoveredRoot={hoveredRoot}
            onHoverRoot={setHoveredRoot}
            onSelectProject={handleSelectProject}
          />

          {/* Tiff-bot + speech bubble — bottom-right corner, the keeper of the tree */}
          <div className="absolute bottom-2 right-2 md:right-3 z-10 flex flex-col items-end gap-1.5 pointer-events-none">
            <SpeechBubble message={hint} />
            <div className="w-12 md:w-14 lg:w-16">
              <Avatar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpeechBubble({ message }) {
  return (
    <div className="relative max-w-[180px] md:max-w-[220px]">
      <div
        className="rounded-2xl border border-ink/20 bg-surface/95 px-3 py-2 text-[10px] md:text-xs uppercase tracking-wider font-semibold text-ink shadow-md backdrop-blur-sm"
        aria-live="polite"
      >
        {message}
      </div>
      {/* Tail pointing down toward the avatar (right side now) */}
      <div
        className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-ink/20 bg-surface/95"
        aria-hidden="true"
      />
    </div>
  );
}
