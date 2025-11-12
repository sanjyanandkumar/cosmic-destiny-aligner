import CosmicPage from "@/components/CosmicPage";
import { Star } from "lucide-react";

const Hero = () => {
  return (
    <CosmicPage>
      <section className="relative py-28 flex items-center justify-center overflow-hidden pt-28">

        {/* Floating Stars Layer */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(45)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-primary/70 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 7 + 5}px`,
                height: `${Math.random() * 7 + 5}px`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 2 + 3}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">

            <h1 className="text-[3.5rem] md:text-[3rem] font-bold text-white leading-[1.2] tracking-[0.02em]">
              BrahmaX —{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Designed by the Stars, Executed by Strategy
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto tracking-wide leading-relaxed">
              Karmic wisdom. Simplified
            </p>
            <p className="text-xl md:text-xl text-muted-foreground max-w-5xl mx-auto tracking-wide leading-relaxed space-y-4">
              <p>
              Karma isn’t a punishment or a reward — it’s a divine design. Understand, imbibe, and master your destiny NOW!!
              </p>
              <p>
              BrahmaX offers a scientific-spiritual architecture for your destiny, wealth, and success. We decode your karmic blueprint and help you align with the stars! 
              </p>
              <p>
              Born at the intersection of scientific astrology and karmic science, BrahmaX translates ancient karmic wisdom into modern strategic ecosystems that offer practical solutions for your day-to-day life.
              </p>
            </p>
          </div>
        </div>
      </section>
    </CosmicPage>
  );
};

export default Hero;
