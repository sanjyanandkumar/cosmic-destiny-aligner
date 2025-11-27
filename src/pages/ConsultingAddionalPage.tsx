import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import websiteImg from "@/assets/website.jpg";

// Images (replace later if needed)
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";

// Consulting Programs EXCEPT Blueprint
const additionalStages = [
  {
    id: "brand-architecture",
    title: "Stage 2 — Focuslab: Strategic Brand Architecture",
    tagline: "Where identity meets destiny.",
    price: "₹5,000",
    link: "/consulting/brand-architecture",
    description:
      "Build a karmic-aligned brand ecosystem — positioning, naming, visual identity, customer resonance model, and energetic narrative.",
    image: karmicConsultingImg,
  },
  {
    id: "communication",
    title: "Stage 3 — Uplift: Communication & Positioning",
    tagline: "Presence creates power.",
    price: "₹5,000",
    link: "/consulting/communication",
    description:
      "Refine your messaging framework, reputation energy, storytelling, audience targeting, and investor positioning.",
    image: karmicConsultingImg,
  },
  {
    id: "karmic-colors",
    title: "Stage 4 — Website Creation Using Karmic Colors",
    tagline: "A digital identity aligned with cosmic design.",
    price: "₹5,000",
    link: "/consulting/karmic-colors",
    description:
      "We design your digital architecture, brand psychology and UI/UX to resonate with your planetary energies and karmic blueprint.",
    image: websiteImg,
  },
];

export default function ConsultingAdditionalPage() {
  return (
    <CosmicPage>
      <Navigation />

      <section className="pt-28 pb-20 md:pt-16 md:pb-8">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-6">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
              Advanced Consulting Programs
            </h1>

            <p className="font-inter text-xl text-primary italic mb-6">
              Evolution begins after clarity.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Once your Karmic Business Blueprint is decoded, you unlock access to applied execution — branding, communication, and digital alignment.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6 max-w-6xl mx-auto">
            {additionalStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] transition-all duration-300">

                  {/* Card Layout */}
                  <div className="flex flex-col md:flex-row">

                    {/* Image + CTA */}
                    <div className="relative md:w-1/3 flex flex-col items-center">
                      <div className="relative h-64 w-full">
                        <img
                          src={stage.image}
                          alt={stage.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                      </div>

                      {/* CTA under image */}
                      <Link to={stage.link}>
                        <Button
                          className="mt-6 mb-6 px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00] text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,200,100,0.8)] transition-all"
                        >
                          Explore →
                        </Button>
                      </Link>
                    </div>

                    {/* Text */}
                    <div className="p-8 md:w-2/3">
                      <h2 className="font-playfair text-3xl text-white font-bold mb-2">
                        {stage.title}
                      </h2>

                      <p className="text-primary/80 font-inter mb-4">{stage.tagline}</p>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {stage.description}
                      </p>

                      <p className="font-playfair text-3xl font-bold text-primary">
                        {stage.price}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Back Link */}
          <div className="text-center mt-4">
            <Link
              to="/consulting"
              className="text-primary text-lg underline hover:text-primary/70 transition-all"
            >
              ← Back to Consulting
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
}
