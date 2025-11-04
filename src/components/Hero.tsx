import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-cosmic">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-primary animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            BrahmaX —{" "}
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Designed by the Stars, Executed by Strategy
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Cosmic intelligence for your style, business, education and journeys.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6 shadow-cosmic"
            >
              Get Your Free Karmic Outfit Snapshot
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Link to="/#verticals">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-foreground hover:bg-primary/10 font-semibold text-lg px-8 py-6"
              >
                Explore Verticals
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground pt-2">
            Instant snapshot. No charge. 60s.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
