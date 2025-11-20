import CosmicPage from "@/components/CosmicPage";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <CosmicPage>
      <section className="relative py-14 flex items-center justify-center overflow-hidden pt-10">

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
          <div className="w-full mx-auto text-center space-y-4">

            <h1 className="text-[3.5rem] md:text-[2rem] font-bold text-white leading-[1.2] tracking-[0.02em]">
              BrahmaX —{" "}
              <span className="text-[3.5rem] md:text-[2rem] font-bold text-white leading-[1.2] tracking-[0.02em]">
                Karma isn't a punishment or a reward<br />It's a devine design<br/>Understand, imbibe, and master your destiny{" "}
                <Link
                  to="/consulting"
                  className="animate-flash font-bold px-5 py-2 rounded-lg bg-gradient-to-r from-[#FFF4B0] via-[#FFD700] to-[#D4A100] text-black drop-shadow-[0_0_20px_#FFD700] hover:scale-110 transition-transform cursor-pointer"
                >
                  NOW!!!
                </Link>
              </span>
            </h1>

            <div className="text-left text-xl md:text-xl w-full px-6 mx-auto leading-relaxed space-y-6">
              <p>
We build and guide business ventures that are cosmically aligned, strategically smart, and scalable enterprises in tune with the stars
              </p>
              <p>
Our BrahmaX wardrobe is the world’s first karmic fashion and lifestyle platform
              </p>
              <p>
EduSeam, is a stream passport that guides parents and children towards conscious learning – another proprietary product of BrahmaX
              </p>
              <p>
BrahmaX Leisure redefines wellness through the lens of karma into a meaningful, self-fulfilling divine experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </CosmicPage>
  );
};

export default Hero;
