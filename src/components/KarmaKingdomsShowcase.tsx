import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import meditationImg from "@/assets/karmic-meditation.jpg";
import careerGuidanceImg from "@/assets/career-guidance.png";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";
import wardrobeImg from "@/assets/cosmic-handbag.png";

import CosmicPage from "@/components/CosmicPage";

const items = [
  { title: "BrahmaX Karmic Consulting", image: karmicConsultingImg, link: "/consulting" },
  { title: "BrahmaX Wardrobe", image: wardrobeImg, link: "/wardrobe" },
  { title: "BrahmaX Gurukul", image: careerGuidanceImg, link: "/eduseam" },
  { title: "BrahmaX Wellness", image: meditationImg, link: "/leisure" },
];

const AUTOPLAY_DELAY = 3000;

const KarmaKingdomsShowcase = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay logic
  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
      }, AUTOPLAY_DELAY);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
    console.log("Viewport:", window.innerWidth, window.innerHeight, window.devicePixelRatio);

  return (
    <CosmicPage>
      <section className="relative w-screen h-screen overflow-hidden">

        {/* 🧿 Title on Top */}
        <div className="absolute top-16 w-full flex justify-center z-[100]">
          <div className="backdrop-blur-xl bg-white/10 border border-white/25 px-10 py-2 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.25)]">
            <h1 className="text-white text-4xl sm:text-4xl md:text-4xl font-ganesha tracking-normal">
              <span>Karmic Wisdom</span>
              <span className="text-red-500">.</span>
              <span> Simplified</span>
              <span className="text-red-500">.</span>
            </h1>
          </div>
        </div>

        {/* 🔮 Fullscreen Image Track */}
        <div className="absolute inset-0">
          <div
            className="flex h-screen transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}vw)` }}
          >
            {items.map((item, key) => (
              <Link
                key={key}
                to={item.link}
                className="w-screen h-screen flex-shrink-0 relative group"
              >
              <div className="w-full h-[80vh] overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

                {/* Overlay title */}
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/25 px-10 py-2 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.25)]">
                    <h3 className="text-white text-4xl md:text-5xl font-bold tracking-wide text-center">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ⬅️ Prev Button */}
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-[10] p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 transition"
        >
          <ChevronLeft size={36} />
        </button>

        {/* ➡️ Next Button */}
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-[10] p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 transition"
        >
          <ChevronRight size={36} />
        </button>

        {/* 🟡 Play / Pause Toggle Button */}
        <button
          onClick={() => setPaused((p) => !p)}
          className="absolute bottom-6 right-8 z-[10] p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 transition flex items-center justify-center"
        >
          {paused ? <Play size={26} /> : <Pause size={26} />}
        </button>
      </section>
    </CosmicPage>
  );
};

export default KarmaKingdomsShowcase;
