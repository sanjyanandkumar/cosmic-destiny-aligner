import React, { useMemo } from "react";

const GalaxyBackground = ({ className = "", starCount = 600 }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2
      })),
    [starCount]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Twinkle Animation */}
      <style>{`
        @keyframes galaxy-twinkle {
          0%, 100% { opacity: .3; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.4); }
        }
        @keyframes nebula-move {
          0% { transform: translate3d(-10%, -10%, 0) scale(1.1); }
          50% { transform: translate3d(10%, 5%, 0) scale(1.25); }
          100% { transform: translate3d(-10%, -10%, 0) scale(1.1); }
        }
      `}</style>

      {/* Nebula Layers */}
      <div className="absolute -inset-1 opacity-30 blur-3xl animate-[nebula-move_18s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_40%,rgba(255,0,180,0.35),transparent_60%)]" />
      <div className="absolute -inset-1 opacity-25 blur-3xl animate-[nebula-move_26s_reverse_infinite] bg-[radial-gradient(circle_at_70%_60%,rgba(60,120,255,0.35),transparent_60%)]" />

      {/* Star Field */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: s.size,
            height: s.size,
            opacity: 0.6,
            animation: `galaxy-twinkle ${s.duration}s infinite`,
            animationDelay: `${s.delay}s`,
            filter: "drop-shadow(0 0 6px rgba(255,255,255,0.7))"
          }}
        />
      ))}
    </div>
  );
};

export default GalaxyBackground;
