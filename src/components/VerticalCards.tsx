import { Card } from "@/components/ui/card";
import { Sparkles, ShoppingBag, GraduationCap, Palmtree } from "lucide-react";
import { Link } from "react-router-dom";

const verticals = [
  {
    icon: Sparkles,
    title: "BrahmaX Consulting",
    subtitle: "The Karmic Business Division",
    description: "Scaling Destiny, Not Just Business.",
    fullDescription: "BrahmaX Consulting helps founders, investors, and creators unlock the hidden timing and energy behind their ventures. Using astrological intelligence, cosmic strategy, and karmic analytics, we design business frameworks that align with your soul path and planetary cycles.",
    gradient: "from-purple-500/20 to-pink-500/20",
    link: "/consulting",
  },
  {
    icon: ShoppingBag,
    title: "BrahmaX Wardrobe",
    subtitle: "The Astro-Fashion Division",
    description: "Wear Your Planets. Live Your Power.",
    fullDescription: "BrahmaX Wardrobe is the world's first karmic fashion and lifestyle platform, curating collections that blend design, astrology, and consciousness. Each piece is energetically aligned — crafted with colors, fabrics, and symbols tuned to your zodiac, lagna, and planetary energies.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    link: "/wardrobe",
  },
  {
    icon: GraduationCap,
    title: "EduSeam",
    subtitle: "The Passport to Conscious Learning",
    description: "Education Reimagined as Evolution.",
    fullDescription: "EduSeam is the learning and mentorship wing of BrahmaX, designed to bridge karmic awareness with real-world knowledge. Its flagship 'Passport Concept' empowers individuals to travel through subjects — from astrology and branding to global culture and purpose-driven entrepreneurship.",
    gradient: "from-amber-500/20 to-orange-500/20",
    link: "/eduseam",
  },
  {
    icon: Palmtree,
    title: "BrahmaX Leisure",
    subtitle: "The Karmic Wellness Division",
    description: "Relaxation, Realigned.",
    fullDescription: "BrahmaX Leisure redefines luxury wellness through the lens of karma. Each retreat, café, and experiential space blends astrology, spirituality, and indulgence to create transformational environments. Whether it's a karmic spa, astro-luxury retreat, or celestial dining experience, BrahmaX Leisure offers spaces where the soul can rest, realign, and rejuvenate.",
    gradient: "from-green-500/20 to-emerald-500/20",
    link: "/leisure",
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
              <Link key={index} to={vertical.link}>
                <Card
                  className={`group p-8 bg-gradient-to-br ${vertical.gradient} backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer`}
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VerticalCards;
