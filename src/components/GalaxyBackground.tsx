import React from "react";

/**
 * Deterministic pseudo-random generator (seeded)
 * Ensures stars look random but are STATIC.
 */
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate static random-looking stars ONCE
 */
const STATIC_STARS = (() => {
  const stars = [];
  const COUNT = 1000;
  const SEED = 42; // change this number to get a different galaxy (still static)

  for (let i = 0; i < COUNT; i++) {
    const r1 = seededRandom(SEED + i * 3);
    const r2 = seededRandom(SEED + i * 7);
    const r3 = seededRandom(SEED + i * 11);

    stars.push({
      x: +(r1 * 100).toFixed(2),
      y: +(r2 * 100).toFixed(2),
      size: +(0.8 + r3 * 1.8).toFixed(2) // random size between ~0.8px–2.6px
    });
  }

  return stars;
})();

const GalaxyBackground = ({ className = "" }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Nebula Layers (static) */}
      <div className="absolute -inset-1 opacity-30 blur-3xl bg-[radial-gradient(circle_at_30%_40%,rgba(255,0,180,0.35),transparent_60%)]" />
      <div className="absolute -inset-1 opacity-25 blur-3xl bg-[radial-gradient(circle_at_70%_60%,rgba(60,120,255,0.35),transparent_60%)]" />

      {/* Static Random Star Field */}
      {STATIC_STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0.35 + s.size * 0.25,
            boxShadow: "0 0 6px rgba(255,255,255,0.6)"
          }}
        />
      ))}
    </div>
  );
};

export default GalaxyBackground;
