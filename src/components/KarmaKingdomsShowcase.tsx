import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import baliTripImg from "@/assets/bali-trip.jpg";
import careerGuidanceImg from "@/assets/career-guidance.jpg";
import cosmicHandbagImg from "@/assets/cosmic-handbag.jpg";
import cosmicWalletImg from "@/assets/cosmic-wallet.jpg";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";
import karmicMeditationImg from "@/assets/karmic-meditation.jpg";

import { ChevronLeft, ChevronRight } from "lucide-react";
import CosmicPage from "@/components/CosmicPage";

const items = [
  { title: "Cosmic Wallet", image: cosmicWalletImg, link: "/wardrobe/cosmic-wallet" },
  { title: "Celestial Handbag", image: cosmicHandbagImg, link: "/wardrobe/celestial-handbag" },
  { title: "Bali Spiritual Journey", image: baliTripImg, link: "/leisure" },
  { title: "Career Guidance", image: careerGuidanceImg, link: "/consulting" },
  { title: "Karmic Consulting", image: karmicConsultingImg, link: "/consulting" },
  { title: "Karmic Meditation", image: karmicMeditationImg, link: "/consulting" },
];

const AUTOPLAY_DELAY = 1200; // reduced idle time (1.2 sec)

const KarmaKingdomsShowcase = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  return (
    <CosmicPage>
      <section className="relative w-screen h-screen overflow-hidden select-none">

        {/* Track */}
        <div
          className="flex h-full transition-transform duration-[1300ms] ease-[cubic-bezier(.22,.61,.36,1)]"
          style={{ transform: `translateX(-${index * 100}vw)` }}
        >
          {items.map((item, key) => (
            <Link
              key={key}
              to={item.link}
              className="w-screen h-screen flex-shrink-0 relative group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.05]"
              />

              {/* Title panel */}
              <div className="absolute inset-0 flex items-end justify-center pb-20">
                <div className="backdrop-blur-xl bg-white/10 border border-white/25 px-10 py-5 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.25)]">
                  <h3 className="text-white text-4xl md:text-5xl font-bold tracking-wide text-center">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-[10] p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 transition"
        >
          <ChevronLeft size={36} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-[10] p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 transition"
        >
          <ChevronRight size={36} />
        </button>
      </section>
    </CosmicPage>
  );
};

export default KarmaKingdomsShowcase;
