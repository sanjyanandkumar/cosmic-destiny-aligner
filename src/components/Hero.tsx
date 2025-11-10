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
          <div className="max-w-4xl mx-auto text-center space-y-8">

            <h1 className="text-[3.5rem] md:text-[5.5rem] font-bold text-white leading-[1.2] tracking-[0.02em]">
              BrahmaX —{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Designed by the Stars, Executed by Strategy
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto tracking-wide leading-relaxed">
              Where Karma Builds Kingdoms
            </p>

          </div>
        </div>
      </section>
    </CosmicPage>
  );
};

export default Hero;
