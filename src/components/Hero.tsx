import CosmicPage from "@/components/CosmicPage";
import { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { ProblemCategory } from "@/data/planets";

// Graha Images
import surya from "@/assets/surya.png";
import chandra from "@/assets/chandra.png";
import mangala from "@/assets/mangala.png";
import budha from "@/assets/budha.png";
import guru from "@/assets/guru.png";
import shukra from "@/assets/shukra.png";
import shani from "@/assets/shani.png";
import rahu from "@/assets/rahu.png";
import ketu from "@/assets/ketu.png";
import handshake from "@/assets/handshake.png";

const Hero = () => {
  const [category, setCategory] = useState<ProblemCategory>("family");

  const grahaData = [
    { name: "Chandra", img: chandra, angle: 0, problems: ["Anxiety & mood swings", "Emotional instability", "Attachment issues"] },
    { name: "Mangala", img: mangala, angle: 45, problems: ["Anger & aggression", "Rash decisions", "Accidents & conflicts"] },
    { name: "Budha", img: budha, angle: 90, problems: ["Communication", "Overthinking", "Business mistakes"] },
    { name: "Guru", img: guru, angle: 135, problems: ["Overconfidence", "Poor finance", "Laziness"] },
    { name: "Shukra", img: shukra, angle: 180, problems: ["Relationship issues", "Excessive indulgence", "Money spent on luxury"] },
    { name: "Shani", img: shani, angle: 225, problems: ["Delays & obstacles", "Depression", "Hard karmic lessons"] },
    { name: "Rahu", img: rahu, angle: 270, problems: ["Confusion", "Addiction", "Sudden chaos"] },
    { name: "Ketu", img: ketu, angle: 315, problems: ["Detachment", "Lack of clarity", "Self-sabotage"] },
  ];

  return (
    <CosmicPage>
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
              }}
            />
          ))}
        </div>

        {/* HERO TEXT */}
        <div className="relative z-10 container mx-auto px-4 text-center space-y-6">
          <h1 className="mt-2 text-[3.2rem] md:text-[2.4rem] font-bold leading-relaxed">
            <span className="text-white">Karma isn't a punishment or a reward...</span>
            <br />

            <span className="text-white">
              It's a{" "}
              <span
                className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(255,200,80,0.6)]"
              >
                divine
              </span>
              {" "}design!
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understand, imbibe, and master your destiny
          </p>

          <Link
            to="/consulting"
            className="inline-block font-bold px-6 py-3 rounded-lg bg-gradient-to-r
            from-[#FF8C00] via-[#FFB347] to-[#FFD280] text-black shadow-lg hover:scale-110 transition-transform"
          >
            START NOW
          </Link>
        </div>

        {/* ORBIT */}
        {/* 3-COLUMN LAYOUT */}
        <div className="relative flex justify-center items-start mt-40 mb-24 gap-10">

          {/* LEFT → PLANETARY SYSTEM */}
          <div className="relative w-[360px] h-[360px] md:w-[440px] md:h-[440px] flex items-center justify-center">

            {/* Center Surya */}
            <img
              src={surya}
              alt="Surya"
              className="absolute w-[70px] md:w-[90px] drop-shadow-[0_0_18px_rgba(255,180,80,0.9)] z-20"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />

            {/* Planets */}
            {grahaData.map((p, index) => {
              let textStyle: any = {};
              let textAlign = "center";

              switch (p.name) {
                case "Chandra":
                  textStyle = { top: "-75px", left: "50%", transform: "translateX(-50%)" };
                  textAlign = "center";
                  break;

                case "Mangala":
                  textStyle = { top: "50%", left: "90px", transform: "translateY(-50%)" };
                  textAlign = "left";
                  break;

                case "Budha":
                  textStyle = { top: "50%", left: "70px", transform: "translateY(-50%)" };
                  textAlign = "left";
                  break;

                case "Guru":  
                  textStyle = { top: "50%", left: "100px", transform: "translateY(-50%)" };
                  textAlign = "left";
                  break;

                case "Shukra":
                  textStyle = { top: "90px", left: "50%", transform: "translateX(-50%)" };
                  textAlign = "center";
                  break;

                case "Shani":
                  textStyle = { top: "10%", left: "-80px", transform: "translateX(-50%)" };
                  textAlign = "center";
                  break;

                case "Rahu":
                  textStyle = { top: "50%", left: "-120px", transform: "translateY(-50%)" };
                  textAlign = "right";
                  break;

                case "Ketu":
                  textStyle = { top: "10px", left: "-60px", transform: "translateX(-50%)" };
                  textAlign = "center";
                  break;

                default:
                  textStyle = { top: "0px", left: "0px" };
              }

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    top: `calc(50% - ${180 * Math.cos((p.angle * Math.PI) / 180)}px)`,
                    left: `calc(50% + ${180 * Math.sin((p.angle * Math.PI) / 180)}px - 25px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    <img src={p.img} alt={p.name} className="w-[50px] md:w-[70px]" />
                    <div
                      className="absolute text-white text-sm md:text-base leading-tight"
                      style={{ ...textStyle, textAlign, whiteSpace: "nowrap" }}
                    >
                      {p.problems.map((prob, i) => (
                        <p key={i}>{prob}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER → HANDSHAKE IMAGE */}
          <div className="flex items-center justify-center w-[350px] mt-32">
            <img
              src={handshake}
              alt="Handshake"
              className="w-[150px] object-contain"
            />
          </div>

          {/* RIGHT → SPACE FOR FUTURE IMAGE */}
          <div className="w-[300px] flex items-center justify-center">
            {/* Keep empty OR add a placeholder */}
            {/* <img src="/future.png" className="w-[250px]" /> */}
          </div>

        </div>

      </section>
    </CosmicPage>
  );
};

export default Hero;
