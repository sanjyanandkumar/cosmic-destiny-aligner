// src/components/TwinkleBackground.tsx
import React, { useMemo } from "react";

type TwinkleBackgroundProps = {
  /** number of stars */
  count?: number;
  /** extra classes if you need to tweak positioning/z-index */
  className?: string;
};

const TwinkleBackground: React.FC<TwinkleBackgroundProps> = ({
  count = 120,
  className = "",
}) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1, // 1–4px
        delay: Math.random() * 3, // 0–3s
        duration: Math.random() * 2 + 2, // 2–4s
        opacity: Math.random() * 0.6 + 0.4, // 0.4–1
      })),
    [count]
  );

  const cls =
    "pointer-events-none absolute inset-0 overflow-hidden " + className;

  return (
    <div className={cls} aria-hidden="true">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: .2; transform: scale(1); }
          50%      { opacity: 1;  transform: scale(1.25); }
        }
      `}</style>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            filter: "drop-shadow(0 0 6px rgba(255,255,255,.6))",
            animation: `twinkle ${s.duration}s linear infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default TwinkleBackground;
