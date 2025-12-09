import CosmicPage from "@/components/CosmicPage";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Import images
import consultingImg from "@/assets/karmic-consulting.jpg";
import wardrobeImg from "@/assets/cosmic-wallet.jpg";
import eduseamImg from "@/assets/career-guidance.jpg";
import leisureImg from "@/assets/karmic-meditation.jpg";

const verticals = [
  {
    title: "BrahmaX Consulting",
    tagline: "Scaling Destiny, Not Just Business.",
    quote: "We don’t just build businesses. We build karma-backed empires.",
    image: consultingImg,
    link: "/consulting",
    description:
      "BrahmaX Consulting helps founders, investors, and creators unlock the hidden timing and energy behind their ventures. Using astrological intelligence, cosmic strategy, and karmic analytics, we design business frameworks that align with your soul path and planetary cycles. From brand creation to market expansion, every move is guided by the unseen — ensuring growth is not random, but divinely orchestrated.",
  },
  {
    title: "BrahmaX Wardrobe",
    tagline: "Wear Your Planets. Live Your Power.",
    quote: "Style that heals. Luxury that vibrates.",
    image: wardrobeImg,
    link: "/wardrobe",
    description:
      "BrahmaX Wardrobe is the world’s first karmic fashion and lifestyle platform, curating collections that blend design, astrology, and consciousness. Each piece is energetically aligned — crafted with colors, fabrics, and symbols tuned to your zodiac, lagna, and planetary energies. More than fashion — it's cosmic alignment in wearable form.",
  },
  {
    title: "BrahmaX Gurukul",
    tagline: "Align learning outcomes karmically – for guaranteed success in life.",
    image: eduseamImg,
    link: "/eduseam",
    description:
      "BrahmaX Gurukul bridges karmic awareness with real-world learning paths. Students follow a karmically aligned ‘Passport System’ to study only subjects that match their destiny — saving time, money, and emotional effort. Our courses guide students into their dharma and help translate it into meaningful, purpose-aligned work.",
  },
  {
    title: "BrahmaX Wellness",
    tagline: "Relaxation, Realigned.",
    quote: "Wellness isn’t an escape — it’s a return to your divine frequency.",
    image: leisureImg,
    link: "/leisure",
    description:
      "BrahmaX Wellness redefines luxury wellness through karma-based experiences — spas, retreats, cafés, immersive healing, and consciousness-based travel. Each space is designed to elevate vibration, unlock alignment, and create transformation, not escape.",
  },
];

export default function VerticalDetails() {
  return (
    <CosmicPage>
      <Navigation />

      <section className="pt-28 pb-16 md:pt-20 md:pb-10">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-6">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
              Karmic Verticals
            </h1>

            <p className="font-inter text-xl text-primary mb-2">
              “Four Paths. One Purpose — to Align Karma with Creation.”
            </p>

            <p className="font-inter text-lg text-muted-foreground leading-relaxed">
              Each BrahmaX vertical embodies the universal arc of evolution — from soul to system, idea to identity. Together, they represent the four karmic pillars of enterprise: Strategy, Style, Knowledge, and Experience.
            </p>
          </div>

          {/* Vertical Cards */}
          <div className="flex flex-col gap-6 max-w-6xl mx-auto">
            {verticals.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] transition-all duration-300">

                  <div className="flex flex-col md:flex-row">

                    {/* Image + Button Column */}
                    <div className="relative md:w-1/3 flex flex-col items-center">
                      
                      <div className="relative h-64 w-full">
                        <img
                          src={v.image}
                          alt={v.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                      </div>

                      {/* CTA BUTTON UNDER IMAGE */}
                      <Link
                        to={v.link}
                        className="mt-6 mb-6 inline-block px-6 py-3 rounded-full text-black font-semibold
                        bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                        shadow-[0_0_20px_rgba(255,200,100,0.4)] hover:shadow-[0_0_35px_rgba(255,200,100,0.8)]
                        transition-all duration-300 hover:scale-105"
                      >
                        Explore →
                      </Link>
                    </div>

                    {/* Text Section */}
                    <div className="p-8 md:w-2/3">
                      <h2 className="font-playfair text-3xl text-white font-bold mb-2">
                        {v.title}
                      </h2>

                      <p className="text-primary/80 font-inter mb-4">{v.tagline}</p>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {v.description}
                      </p>

                      {v.quote && (
                        <blockquote className="italic text-primary border-l-4 border-primary pl-4 font-playfair text-lg">
                          “{v.quote}”
                        </blockquote>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
}
