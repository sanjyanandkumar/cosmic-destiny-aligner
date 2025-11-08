import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import bg from "@/assets/cosmic-background.png";

const Hero = () => {
  return (
	<section
	  className="relative py-24 flex items-center justify-center overflow-hidden pt-20 bg-cover bg-center bg-no-repeat"
	  style={{ backgroundImage: `url(${bg})` }}
	>
	  {/* Dim cosmic overlay */}
	  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
	{/* Cosmic Background */}
      <div className="absolute inset-0 bg-transparent">
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
            Where Karma Builds Kingdoms
          </p>
        </div>
      </div>

    </section>
  );
};

export default Hero;
