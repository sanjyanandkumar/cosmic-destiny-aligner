import { planets, ProblemCategory } from "@/data/planets";
import { PlanetCard } from "./PlanetCard";

interface PlanetarySystemProps {
  category: ProblemCategory;
}

export const PlanetarySystem = ({ category }: PlanetarySystemProps) => {
  const centerX = 300;
  const centerY = 300;

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[700px]">
      {/* Central divine symbol */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-32 h-32 rounded-full bg-gradient-divine shadow-glow 
        flex items-center justify-center animate-float">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-foreground">ॐ</p>
            <p className="text-xs text-primary-foreground mt-1">Divine Design</p>
          </div>
        </div>
      </div>

      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-96 h-96 rounded-full border border-primary/20 animate-orbit" 
        style={{ animationDuration: '60s' }} />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[500px] h-[500px] rounded-full border border-accent/10 animate-orbit" 
        style={{ animationDuration: '90s', animationDirection: 'reverse' }} />
      </div>

      {/* Planets */}
      {planets.map((planet) => {
        const style: React.CSSProperties = {
          left: `${centerX + planet.position.x}px`,
          top: `${centerY + planet.position.y}px`,
          transform: 'translate(-50%, -50%)',
        };

        return <PlanetCard key={planet.id} planet={planet} style={style} category={category} />;
      })}
    </div>
  );
};