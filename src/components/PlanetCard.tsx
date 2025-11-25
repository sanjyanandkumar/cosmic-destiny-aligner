import { createPortal } from "react-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export const PlanetCard = ({ planet, style, category }: PlanetCardProps) => {
  const [show, setShow] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div
      className="absolute cursor-pointer group"
      style={style}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={(e) => {
        // Calculate tooltip relative to window viewport
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: rect.left + rect.width / 2,
          y: rect.top,
        });
      }}
    >
      {/* Planet */}
      <div
        className={`w-16 h-16 rounded-full bg-gradient-to-br ${planet.color} shadow-planet group-hover:scale-110 transition`}
      />

      {/* Labels */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-white">{planet.name}</p>
        <p className="text-xs text-muted-foreground">{planet.sanskritName}</p>
      </div>

      {/* Tooltip via Portal */}
      {show &&
        createPortal(
          <div
            className="fixed z-[99999]"
            style={{
              top: mousePos.y - 20, // slightly above cursor
              left: mousePos.x + 20, // offset so cursor doesn't cover tooltip
              pointerEvents: "none",
            }}
          >
            <Card className="w-72 p-5 bg-black/80 border border-white/20 rounded-xl shadow-xl">
              <h3 className="text-lg font-bold text-primary mb-2">
                {planet.name} ({planet.sanskritName})
              </h3>

              <p className="text-sm text-primary font-semibold">
                {category.charAt(0).toUpperCase() + category.slice(1)} Challenges
              </p>

              <ul className="text-xs text-white/90 space-y-1 mb-3">
                {planet.problems[category].map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>

              <p className="text-sm text-primary font-semibold">Suggested Remedies ↓</p>

              <ul className="text-xs text-white/90 space-y-1">
                {planet.solutions[category].map((s, i) => (
                  <li key={i}>✔ {s}</li>
                ))}
              </ul>
            </Card>
          </div>,
          document.body
        )}
    </div>
  );
};
