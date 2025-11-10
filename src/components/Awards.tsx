import { Award, Star, TrendingUp } from "lucide-react";
import bg from "@/assets/cosmic-background.png";
import GalaxyBackground from "@/components/GalaxyBackground";

const Awards = () => {
  const recognitions = [
    {
      icon: Star,
      title: "Karmic Visionary Award",
      description: "Honoring the creation of BrahmaX, a platform where spirituality, strategy, and destiny merge into one evolutionary force.",
    },
    {
      icon: Award,
      title: "DarkShadow Ventures LLP Recognition",
      description: "For establishing BrahmaX as a model of karmic entrepreneurship and conscious capitalism.",
    },
    {
      icon: TrendingUp,
      title: "Emerging Spiritual Enterprise of the Year",
      description: "Celebrated for pioneering karmic verticals that bridge astrology, business, and lifestyle.",
    },
  ];

  return (
    <section className="py-24 bg-background/80 bg-cover bg-center bg-no-repeat relative"
  style={{ backgroundImage: `url(${bg})` }}>
	  {/* Dimmed overlay */}
	  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    <GalaxyBackground className="z-[1]" />
	<div className="relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Awards & Recognitions
            </h2>
            <p className="font-inter text-xl text-primary italic mb-6">
              "The Universe Rewards Alignment."
            </p>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              At BrahmaX, every recognition is more than an achievement — it's a cosmic acknowledgment of alignment between vision, vibration, and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recognitions.map((recognition, index) => {
              const Icon = recognition.icon;
              return (
                <div
                  key={index}
                  className="bg-card/30 backdrop-blur-sm border border-cosmic-blue/30 rounded-lg p-6 text-center hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-foreground mb-3">
                    {recognition.title}
                  </h3>
                  <p className="font-inter text-sm text-muted-foreground">
                    {recognition.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-cosmic-gold/10 border border-primary/30 rounded-lg p-8 text-center">
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
              Our Gratitude
            </h3>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-4">
              Every milestone is a reflection of the people, partners, and clients who believed in the BrahmaX vision — a reminder that when purpose aligns with timing, recognition becomes resonance.
            </p>
            <p className="font-inter text-xl italic text-primary">
              "We don't chase awards. We attract them through alignment."
            </p>
          </div>
        </div>
      </div>
	</div>
    </section>
  );
};

export default Awards;
