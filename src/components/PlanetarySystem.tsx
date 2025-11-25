import { planets, ProblemCategory } from "@/data/planets";
import { PlanetCard } from "./PlanetCard";

interface PlanetarySystemProps {
  category: ProblemCategory;
}

export const PlanetarySystem = ({ category }: PlanetarySystemProps) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto h-[520px] z-[1] flex items-center justify-center">

      {/* Divine Center */}
      <div className="absolute z-[20] pointer-events-none flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gradient-divine shadow-glow flex items-center justify-center animate-float">
          <p className="text-2xl font-bold text-primary-foreground">ॐ</p>
        </div>
        <p className="text-xs text-primary-foreground mt-1 tracking-wide">Divine Design</p>
      </div>

      {/* Orbit Rings */}
      <div className="absolute w-96 h-96 border border-primary/20 rounded-full animate-orbit" style={{ animationDuration: "60s" }}></div>

      <div className="absolute w-[500px] h-[400px] border border-accent/10 rounded-full animate-orbit" style={{ animationDuration: "90s", animationDirection: "reverse" }}></div>

      {/* Planets - now centered automatically */}
      {planets.map((planet) => (
        <PlanetCard
          key={planet.id}
          planet={planet}
          category={category}
          style={{
            position: "absolute",
            transform: `translate(${planet.position.x}px, ${planet.position.y}px)`
          }}
        />
      ))}
    </div>
  );
};
