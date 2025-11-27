import CosmicPage from "@/components/CosmicPage";
import { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { PlanetarySystem } from "@/components/PlanetarySystem";
import { ProblemCategory } from "@/data/planets";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import problemImg from "@/assets/astrology problem.jpg";
import solvedImg from "@/assets/astrology resolved.jpg";
import xImg from "@/assets/X.png";

const Hero = () => {
  const [category, setCategory] = useState<ProblemCategory>("family");

  return (
    <CosmicPage>

      {/* ⭐ SECTION 1 — HERO TEXT */}
      <section className="relative py-4 overflow-hidden">

        {/* Floating Stars */}
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

        <div className="relative z-10 container mx-auto px-4 text-center space-y-6">
          <h1 className="mt-10 text-[3.2rem] md:text-[2.4rem] font-bold leading-tight">
            <span className="text-white">Karma isn't a punishment or a reward</span><br />

            <span className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00] 
              text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(255,200,80,0.6)]">
              It's a divine design!
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understand, imbibe, and master your destiny
          </p>

          {/* CTA */}
          <Link
            to="/consulting"
            className="inline-block animate-flash font-bold px-6 py-3 rounded-lg bg-gradient-to-r
             from-[#FF8C00] via-[#FFB347] to-[#FFD280] text-black shadow-lg hover:scale-110 transition-transform"
          >
            START NOW
          </Link>

          {/* ⭐ Transformation Row */}
          <div className="relative z-10 flex items-center justify-center gap-6 md:gap-12 mt-10">

            {/* Problem Image */}
            <div className="w-[300px] md:w-[450px] aspect-square rounded-xl overflow-hidden border border-white/20 shadow-lg backdrop-blur-sm">
              <img 
                src={problemImg}
                alt="Problem" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* BrahmaX X Logo Center */}
            <img
              src={xImg}
              alt="Transformation"
              className="w-[65px] md:w-[85px] animate-pulse drop-shadow-[0_0_20px_rgba(255,200,0,0.9)]"
            />

            {/* Resolved Image */}
            <div className="w-[300px] md:w-[450px] aspect-square rounded-xl overflow-hidden border border-white/20 shadow-lg backdrop-blur-sm">
              <img 
                src={solvedImg}
                alt="Resolved"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

    </CosmicPage>
  );
};

export default Hero;
