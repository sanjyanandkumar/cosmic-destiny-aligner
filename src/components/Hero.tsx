import CosmicPage from "@/components/CosmicPage";
import { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { PlanetarySystem } from "@/components/PlanetarySystem";
import { ProblemCategory } from "@/data/planets";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <h1 className="text-[3.2rem] md:text-[2.4rem] font-bold text-white leading-tight">
            Karma isn't a punishment or a reward —<br />
            it's a divine design.
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

          {/* Supporting text */}
          <div className="text-left text-lg md:text-xl max-w-7xl mx-auto space-y-3 leading-relaxed px-2 md:px-0">
            <p>We build and guide business ventures that are cosmically aligned, strategically smart, and scalable enterprises in tune with the stars</p>
            <p>Our BrahmaX wardrobe is the world’s first karmic fashion and lifestyle platform</p>
            <p>EduSeam, is a stream passport that guides parents and children towards conscious learning – another proprietary product of BrahmaX</p>
            <p>BrahmaX Leisure redefines wellness through the lens of karma into a meaningful, self-fulfilling divine experience</p>
          </div>
          <div className="relative z-20 container mx-auto px-4">
            <h2 className="text-[3.2rem] md:text-[2.4rem] font-bold text-white text-center leading-tight">
              Navagraha: The Cosmic Guardians
            </h2>

            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Hover each planet to reveal its influence and remedies.
            </p>

            <div className="flex justify-center my-6">
              <Tabs value={category} onValueChange={(v) => setCategory(v as ProblemCategory)} className="w-full max-w-md">
                <TabsList className="grid grid-cols-3 bg-white/10 backdrop-blur-md">
                  <TabsTrigger value="family">Family</TabsTrigger>
                  <TabsTrigger value="relationship">Relationship</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex justify-center">
              <PlanetarySystem category={category} />
            </div>

            <p className="text-center mt-1 text-sm text-muted-foreground max-w-xl mx-auto">
              Each planet influences a different dimension of life. When aligned, karma becomes a guide — not a struggle.
            </p>
          </div>
        </div>
      </section>

    </CosmicPage>
  );
};

export default Hero;
