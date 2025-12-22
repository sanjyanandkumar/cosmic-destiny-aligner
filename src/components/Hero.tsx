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
    { name: "Chandra", img: chandra, angle: 0, problems: ["Worried about future?"] },
    { name: "Mangala", img: mangala, angle: 45, problems: ["Wrong decisions?", "Money problems?"] },
    { name: "Budha", img: budha, angle: 90, problems: ["Financial issues?", "Business losses?"] },
    { name: "Guru", img: guru, angle: 135, problems: ["Job issues?", "Career problems?"] },
    { name: "Shukra", img: shukra, angle: 180, problems: ["Family problems?"] },
    { name: "Shani", img: shani, angle: 225, problems: ["Late marriage?", "Child issues?"] },
    { name: "Rahu", img: rahu, angle: 270, problems: ["Child's poor grades?"] },
    { name: "Ketu", img: ketu, angle: 315, problems: ["Health issues?", "Chronic pain?"] },
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
            <span className="text-white">Karma isn't a punishment or a reward
              <span
                className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(255,200,80,0.6)]"
              >
                ...
              </span>
            </span>
            <br />

            <span className="text-white">
              It's a{" "}
              <span
                className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(255,200,80,0.6)]"
              >
                divine
              </span>
              {" "}design
              <span
                className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(255,200,80,0.6)]"
              >
              !
              </span>
            </span>
          </h1>

          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Understand, imbibe, and master your destiny
          </p>
        </div>

        <div className="relative flex justify-center items-center mt-20 mb-0">
          <div className="relative flex flex-col items-center gap-10">
          {/* PLANETARY SYSTEM ONLY */}
          <div className="relative w-[360px] h-[360px] md:w-[440px] md:h-[440px] mb-8 flex items-center justify-center">
            
            {/* Center Surya + Labels */}
            <div className="absolute flex flex-col items-center z-20"
                style={{ top: "50%", left: "45%", transform: "translate(-50%, -50%)" }}>

              {/* Text ABOVE Surya */}
              <p className="text-white text-sm md:text-base mb-2 whitespace-nowrap">
                Feeling low?
              </p>

              {/* Surya Image */}
              <img
                src={surya}
                alt="Surya"
                className="w-[65px] md:w-[85px] drop-shadow-[0_0_18px_rgba(255,180,80,0.9)]"
              />

              {/* Text BELOW Surya */}
              <p className="text-white text-sm md:text-base mt-2 whitespace-nowrap">
                Burnt out?
              </p>

            </div>

            {/* All planets remain unchanged */}
            {grahaData.map((p, index) => {
              let textStyle: any = {};
              let textAlign = "center";

              switch (p.name) {
                case "Chandra":
                  textStyle = { top: "-35px", left: "50%", transform: "translateX(-50%)" };
                  break;
                case "Mangala":
                  textStyle = { top: "50%", left: "82px", transform: "translateY(-50%)" };
                  textAlign = "left";
                  break;
                case "Budha":
                  textStyle = { top: "50%", left: "78px", transform: "translateY(-50%)" };
                  textAlign = "left";
                  break;
                case "Guru":
                  textStyle = { top: "50%", left: "85px", transform: "translateY(-50%)" };
                  textAlign = "left";
                  break;
                case "Shukra":
                  textStyle = { top: "90px", left: "50%", transform: "translateX(-50%)" };
                  break;
                case "Shani":
                  textStyle = { top: "10%", left: "-65px", transform: "translateX(-50%)" };
                  break;
                case "Rahu":
                  textStyle = { top: "50%", left: "-154px", transform: "translateY(-50%)" };
                  textAlign = "right";
                  break;
                case "Ketu":
                  textStyle = { top: "10px", left: "-62px", transform: "translateX(-50%)" };
                  break;
                default:
                  textStyle = {};
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
            <p className="text-3xl text-white max-w-4xl mx-auto">
              Karmic wisdom has the{" "}
              
              <span className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                text-transparent bg-clip-text">
                all
              </span>

              {" "}the{" "}

              <span className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                text-transparent bg-clip-text">
                answers
              </span>

              {" "}to your questions{" "}

              <span className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                text-transparent bg-clip-text">
                ...
              </span>
            </p>
            <Link
              to="/consulting"
              className="inline-block font-bold mt-0 px-8 py-2 rounded-lg bg-gradient-to-r
              from-[#FF8C00] via-[#FFB347] to-[#FFD280] text-black shadow-lg hover:shadow-[0_0_30px_rgba(255,200,100,0.8)] transition-all"
            >
              Consult NOW
            </Link>
          </div>
        </div>

      </section>
    </CosmicPage>
  );
};

export default Hero;
