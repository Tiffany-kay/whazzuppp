/**
 * Small SVG mech-tinkerer avatar — round visor helmet, antenna with a
 * glowing tip, accent-colored torso plate over cargo pants, hands akimbo.
 * Visor has a single LED-style "eye" that blinks every ~4s.
 *
 * Apron / chest plate uses --accent so the suit shifts color with the
 * theme (warm orange in day, gold at night).
 */
export default function Avatar({ className }) {
  return (
    <svg
      viewBox="0 0 100 160"
      className={className}
      style={{ width: "100%", height: "auto", display: "block" }}
      role="img"
      aria-label="Tiff-bot avatar — hands on hips"
    >
      {/* Antenna */}
      <line x1="55" y1="9" x2="60" y2="2" stroke="#1a1410" strokeWidth="1" strokeLinecap="round" />
      <circle cx="60" cy="2" r="1.6" fill="rgb(var(--accent))" />

      {/* Helmet sphere */}
      <circle cx="50" cy="22" r="13" fill="#f6efe0" stroke="#1a1410" strokeWidth="1.4" />
      {/* Visor band */}
      <rect x="38" y="21" width="24" height="3" fill="#1a1410" />
      {/* Single glowing eye */}
      <circle className="tg-avatar-eye" cx="50" cy="22.5" r="1.6" fill="rgb(var(--accent))" />

      {/* Neck connector */}
      <rect x="46" y="33" width="8" height="6" fill="#3a3028" />
      <circle cx="50" cy="36" r="1.2" fill="#1a1410" />

      {/* Shoulder pauldrons */}
      <ellipse cx="33" cy="44" rx="9" ry="6" fill="rgb(var(--accent))" stroke="#1a1410" strokeWidth="1" />
      <ellipse cx="67" cy="44" rx="9" ry="6" fill="rgb(var(--accent))" stroke="#1a1410" strokeWidth="1" />
      <circle cx="33" cy="44" r="1.6" fill="#1a1410" />
      <circle cx="67" cy="44" r="1.6" fill="#1a1410" />

      {/* Torso chest plate */}
      <path d="M 38 44 L 62 44 L 65 78 L 35 78 Z" fill="rgb(var(--accent))" stroke="#1a1410" strokeWidth="1.2" />
      {/* Chest core */}
      <circle cx="50" cy="55" r="2.6" fill="#1a1410" />
      <circle cx="50" cy="55" r="1.2" fill="#f6efe0" />
      {/* Chest seam */}
      <line x1="50" y1="58" x2="50" y2="76" stroke="#1a1410" strokeWidth="0.8" />
      <line x1="42" y1="66" x2="58" y2="66" stroke="#1a1410" strokeWidth="0.6" opacity="0.5" />

      {/* Arms akimbo — upper arm out to elbow, then forearm to hip */}
      {/* Left */}
      <path d="M 28 48 L 18 62 L 22 78" stroke="rgb(var(--accent))" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 22 78 L 38 82" stroke="rgb(var(--accent))" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="78" r="1.8" fill="#1a1410" />
      <circle cx="38" cy="82" r="3" fill="#3a3028" stroke="#1a1410" strokeWidth="0.6" />
      {/* Right */}
      <path d="M 72 48 L 82 62 L 78 78" stroke="rgb(var(--accent))" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 78 78 L 62 82" stroke="rgb(var(--accent))" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="78" cy="78" r="1.8" fill="#1a1410" />
      <circle cx="62" cy="82" r="3" fill="#3a3028" stroke="#1a1410" strokeWidth="0.6" />

      {/* Utility belt */}
      <rect x="34" y="78" width="32" height="4" fill="#1a1410" />
      <rect x="47" y="78" width="6" height="4" fill="rgb(var(--accent))" stroke="#1a1410" strokeWidth="0.4" />

      {/* Cargo pants */}
      <rect x="36" y="82" width="13" height="40" rx="2" fill="#8a7a6a" stroke="#1a1410" strokeWidth="1" />
      <rect x="51" y="82" width="13" height="40" rx="2" fill="#8a7a6a" stroke="#1a1410" strokeWidth="1" />
      <rect x="38" y="92" width="6" height="10" fill="none" stroke="#1a1410" strokeWidth="0.5" />
      <rect x="56" y="92" width="6" height="10" fill="none" stroke="#1a1410" strokeWidth="0.5" />
      <circle cx="42.5" cy="110" r="1.4" fill="#1a1410" />
      <circle cx="57.5" cy="110" r="1.4" fill="#1a1410" />

      {/* Boots */}
      <path d="M 36 122 L 49 122 L 49.5 138 L 34 138 Z" fill="#2a2018" stroke="#1a1410" strokeWidth="1" />
      <path d="M 51 122 L 64 122 L 66 138 L 50.5 138 Z" fill="#2a2018" stroke="#1a1410" strokeWidth="1" />
      <rect x="32" y="137" width="20" height="3" rx="1" fill="#1a1410" />
      <rect x="48" y="137" width="20" height="3" rx="1" fill="#1a1410" />
    </svg>
  );
}
