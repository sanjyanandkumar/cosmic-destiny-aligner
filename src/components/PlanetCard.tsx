import { Planet, ProblemCategory } from "@/data/planets";
import { Card } from "@/components/ui/card";
import { X, Heart } from "lucide-react";

interface PlanetCardProps {
  planet: Planet;
  style: React.CSSProperties;
  category: ProblemCategory;
}

const problemCategories = [
  { name: "Family", angle: 0 },
  { name: "Relationship", angle: 90 },
  { name: "Financial", angle: 180 },
  { name: "Education", angle: 270 },
];

export const PlanetCard = ({ planet, style, category }: PlanetCardProps) => {
  return (
    <div
      className="absolute cursor-pointer group"
      style={style}
    >
      <div className="relative">
        {/* Circular text around planet */}
        <div className="absolute inset-0 w-40 h-40 -translate-x-12 -translate-y-12">
          {problemCategories.map((cat, index) => {
            const angle = (cat.angle * Math.PI) / 180;
            const radius = 70;
            const x = Math.cos(angle) * radius + 80;
            const y = Math.sin(angle) * radius + 80;
            
            return (
              <div
                key={index}
                className="absolute text-xs font-medium text-muted-foreground whitespace-nowrap"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {cat.name}
              </div>
            );
          })}
        </div>

        {/* Planet image */}
        <div className="relative w-20 h-20 group-hover:scale-110 transition-all duration-500">
          <img
            src={planet.image}
            alt={planet.name}
            className="w-full h-full object-contain drop-shadow-glow animate-glow"
          />
        </div>
        
        {/* Planet name */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <p className="text-sm font-medium text-foreground">{planet.name}</p>
          <p className="text-xs text-muted-foreground">{planet.sanskritName}</p>
        </div>

        {/* Hover card */}
        <Card
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 
          w-80 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-300 z-50 border-primary/20 bg-card/95 backdrop-blur-sm"
        >
          <h3 className="text-lg font-bold mb-3 text-primary">
            {planet.name} ({planet.sanskritName})
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2 text-accent flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                Problems:
              </h4>
              <ul className="space-y-1">
                {planet.problems[category].map((problem, index) => (
                  <li key={index} className="text-xs text-muted-foreground">
                    • {problem}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2 text-primary flex items-center gap-2">
                <Heart className="w-4 h-4 text-green-500 fill-green-500" />
                Solutions & Remedies:
              </h4>
              <ul className="space-y-1">
                {planet.solutions[category].map((solution, index) => (
                  <li key={index} className="text-xs text-foreground">
                    • {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};