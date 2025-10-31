import { Card } from "@/components/ui/card";
import { Sparkles, Briefcase, GraduationCap, Plane } from "lucide-react";

const verticals = [
  {
    icon: Briefcase,
    title: "BrahmaX Consulting",
    subtitle: "The Karmic Business Division",
    description: "Scaling Destiny, Not Just Business.",
    fullDescription: "We help founders, investors, and creators unlock the hidden timing and energy behind their ventures. Using astrological intelligence, cosmic strategy, and karmic analytics, we design business frameworks that align with your soul path.",
    gradient: "from-cosmic-gold/20 to-mystic-teal/20",
  },
  {
    icon: Sparkles,
    title: "BrahmaX Wardrobe",
    subtitle: "The Astro-Fashion Division",
    description: "Wear Your Planets. Live Your Power.",
    fullDescription: "The world's first karmic fashion and lifestyle platform, curating collections that blend design, astrology, and consciousness. Each piece is energetically aligned — crafted with colors, fabrics, and symbols tuned to your zodiac.",
    gradient: "from-rose-quartz/20 to-cosmic-gold/20",
  },
  {
    icon: GraduationCap,
    title: "EduSeam",
    subtitle: "The Passport to Conscious Learning",
    description: "Education Reimagined as Evolution.",
    fullDescription: "The learning and mentorship wing of BrahmaX, designed to bridge karmic awareness with real-world knowledge. Each course is an initiation — a journey into discovering your unique dharma.",
    gradient: "from-mystic-teal/20 to-celestial-blue/20",
  },
  {
    icon: Plane,
    title: "BrahmaX Leisure",
    subtitle: "The Karmic Wellness Division",
    description: "Relaxation, Realigned.",
    fullDescription: "Redefining luxury wellness through the lens of karma. Each retreat, café, and experiential space blends astrology, spirituality, and indulgence to create transformational environments.",
    gradient: "from-celestial-blue/20 to-rose-quartz/20",
  },
];

const VerticalCards = () => {
  return (
    <section id="verticals" className="py-24 bg-cosmic-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Karmic Divisions
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-2xl mx-auto">
            Four Paths. One Purpose — to Align Karma with Creation
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
                  
                  <p className="font-inter text-sm text-primary/80 mb-2">
                    {vertical.subtitle}
                  </p>
                  
                  <p className="font-inter font-semibold text-foreground mb-2">
                    {vertical.description}
                  </p>
                  
                  <p className="font-inter text-sm text-muted-foreground">
                    {vertical.fullDescription}
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
