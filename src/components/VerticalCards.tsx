import { Card } from "@/components/ui/card";
import { Sparkles, Briefcase, GraduationCap, Plane } from "lucide-react";

const verticals = [
  {
    icon: Sparkles,
    title: "BrahmaX Wardrobe",
    description: "Dress like your destiny.",
    gradient: "from-rose-quartz/20 to-cosmic-gold/20",
  },
  {
    icon: Briefcase,
    title: "Business Dharma",
    description: "Build the brand your chart supports.",
    gradient: "from-cosmic-gold/20 to-mystic-teal/20",
  },
  {
    icon: GraduationCap,
    title: "Stream Code",
    description: "Map education to destiny.",
    gradient: "from-mystic-teal/20 to-celestial-blue/20",
  },
  {
    icon: Plane,
    title: "Journeys",
    description: "Retreats that activate karma.",
    gradient: "from-celestial-blue/20 to-rose-quartz/20",
  },
];

const VerticalCards = () => {
  return (
    <section className="py-24 bg-cosmic-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Cosmic Verticals
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-2xl mx-auto">
            Four pathways aligned with your celestial blueprint
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verticals.map((vertical, index) => {
            const Icon = vertical.icon;
            return (
              <Card
                key={index}
                className={`group p-8 bg-gradient-to-br ${vertical.gradient} backdrop-blur-sm border-cosmic-blue/30 hover:border-primary/50 transition-all duration-300 hover:shadow-cosmic cursor-pointer`}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="font-playfair text-2xl font-bold text-foreground">
                    {vertical.title}
                  </h3>
                  
                  <p className="font-inter text-muted-foreground">
                    {vertical.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VerticalCards;
