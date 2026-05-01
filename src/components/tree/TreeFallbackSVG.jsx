// Placeholder for the 3D tree scene. Skeleton stage — just a soft visual hint
// of where the canvas will live. Replaced once we build the real TreeScene.

export default function TreeFallbackSVG() {
  return (
    <div
      role="img"
      aria-label="Tree scene placeholder"
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-ink/15 bg-gradient-to-b from-surface/50 to-bg/40"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-muted">
          <p className="eyebrow">tree scene</p>
          <p className="font-display italic text-2xl text-ink mt-2">coming soon</p>
          <p className="text-sm mt-2 max-w-xs mx-auto opacity-75">
            The hero canvas — fruits, roots, and a moonlit sky — drops in next.
          </p>
        </div>
      </div>
    </div>
  );
}
