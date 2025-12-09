import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CosmicPage from "@/components/CosmicPage";

import consultingImg from "@/assets/karmic-consulting.jpg";
import wardrobeImg from "@/assets/cosmic-wallet.jpg";
import eduseamImg from "@/assets/career-guidance.jpg";
import leisureImg from "@/assets/karmic-meditation.jpg";
import bg from "@/assets/cosmic-background.png";

const verticals = [
  {
    title: "BrahmaX Consulting",
    subtitle: "The Karmic Business Division",
    image: consultingImg,
    link: "/consulting",
    description: "Strategic cosmic guidance for founders & creators.",
  },
  {
    title: "BrahmaX Wardrobe",
    subtitle: "The Astro-Fashion Division",
    image: wardrobeImg,
    link: "/wardrobe",
    description: "Luxury fashion aligned with your planets.",
  },
  {
    title: "BrahmaX Gurukul",
    subtitle: "The Passport to Conscious Learning",
    image: eduseamImg,
    link: "/eduseam",
    description: "Discover your dharma through guided learning.",
  },
  {
    title: "BrahmaX Wellness",
    subtitle: "The Karmic Wellness Division",
    image: leisureImg,
    link: "/leisure",
    description: "Travel & retreats for deep energetic alignment.",
  },
];

const VerticalCards = () => {
  return (
    <CosmicPage>
      <section id="verticals" className="py-10 md:py-0 bg-transparent !border-none !shadow-none">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              BrahmaX verticals
            </h2>
            <p className="font-inter text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Four Paths. One Purpose — to Align Karma with Creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {verticals.map((item, index) => (
              <Link key={index} to={item.link}>
                <Card
                  className="overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md 
                             hover:shadow-[0_0_25px_rgba(255,220,120,0.4)] hover:border-primary/60
                             transition-all duration-500 cursor-pointer group rounded-2xl"
                >
                  <div className="relative h-[260px] overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-playfair text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-primary/80 mb-3">{item.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </CosmicPage>
  );
};

export default VerticalCards;
