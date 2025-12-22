import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import websiteImg from "@/assets/website.jpg";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";
import architectureImg from "@/assets/architecture.png";
import communicationImg from "@/assets/communication.png";
import founderImg from "@/assets/founder.jpg";

import SpeakToFounderDialog from "@/components/SpeakToFounderDialog";

/* ============================
   Additional Consulting Stages
   ============================ */
const additionalStages = [
  {
    id: "founder-profile",
    title: "Meet the Founder",
    description:
      "Guided by decades of spiritual study, astrological mastery, and real-world execution, the founder of BrahmaX brings karmic intelligence into practical decision-making for individuals, businesses, and institutions.",
    image: founderImg,
    bullets: [
      "Trained in Vedic astrology, karmic sciences, and planetary psychology",
      "Experience working with founders, leaders, and families across domains",
      "Specializes in decoding destiny patterns and timing-based decisions",
      "Bridges spiritual wisdom with modern business and life challenges",
      "Known for practical, no-superstition, logic-backed guidance",
      "Focus on long-term alignment, not short-term predictions",
    ],
  },
  {
    id: "brand-architecture",
    title: "Strategic Brand Architecture",
    description:
      "Build a karmic-aligned brand ecosystem — positioning, naming, visual identity, customer resonance model, and energetic narrative.",
    image: architectureImg,
    bullets: [
      "Deep-dive analysis via Inner Lab",
      "Business model & revenue plan",
      "Brand strategy & positioning",
      "Name / nomenclature ideas",
      "Logo + identity direction",
      "30-day roadmap & launch strategy",
    ],
  },
  {
    id: "communication",
    title: "Communication & Positioning",
    description:
      "Refine your messaging framework, reputation energy, storytelling, audience targeting, and investor positioning.",
    image: communicationImg,
    bullets: [
      "Sales system setup + team training",
      "Client acquisition & lead generation strategy",
      "Investor deck + funding guidance",
      "Monthly karmic growth alignment sessions",
      "Advisory on partnerships & global expansion",
    ],
  },
  {
    id: "karmic-colors",
    title: "Website Creation Using Karmic Colors",
    description:
      "We design your digital architecture, brand psychology and UI/UX to resonate with your planetary energies and karmic blueprint.",
    image: websiteImg,
    bullets: [
      "Website design focusing on UX, layout, and visuals",
      "Content planning aligned to brand purpose",
      "Development using modern frameworks",
      "Hosting, performance & long-term maintenance",
    ],
  },
];

export default function ConsultingAdditionalPage() {
  const [openLeadDialog, setOpenLeadDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    id: string;
    title: string;
  } | null>(null);

  return (
    <CosmicPage>
      <Navigation />

      <section className="pt-28 pb-20 md:pt-16 md:pb-8">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
              Karmic Business Consulting
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed text-justify">
              Our proprietary “Karmic Business Consulting” blueprint focuses on a
              stage-wise, karmically aligned brand ecosystem — from inception to
              applied execution. Whether you are an entrepreneur or an enterprise
              looking to scale, we help align growth with destiny.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            {additionalStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] transition-all duration-300">

                  {/* 🔁 Alternating Layout */}
                  <div
                    className={`flex flex-col md:flex-row ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image + CTA */}
                    <div className="relative md:w-1/3 flex flex-col items-center">
                      <div className="relative h-[340px] w-full">
                        <img
                          src={stage.image}
                          alt={stage.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                      </div>

                      <Button
                        onClick={() => {
                          setSelectedService({
                            id: stage.id,
                            title: stage.title,
                          });
                          setOpenLeadDialog(true);
                        }}
                        className="
                          mt-6 mb-6
                          w-[170px]
                          font-bold
                          px-8 py-2
                          rounded-lg
                          bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                          text-black shadow-lg
                          hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
                          transition-all
                        "
                      >
                        Consult NOW
                      </Button>
                    </div>

                    {/* Text */}
                    <div className="p-8 md:w-2/3">
                      <h2 className="font-playfair text-3xl text-white font-bold mb-3">
                        {stage.title}
                      </h2>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {stage.description}
                      </p>

                      <ul className="space-y-2 text-white/90 text-sm">
                        {stage.bullets.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </Card>
              </motion.div>
            ))}
          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <Link
              to="/consulting"
              className="text-white text-lg underline hover:text-primary/70 transition-all"
            >
              ← Back to Consulting
            </Link>
          </div>

        </div>
      </section>

      <Footer />

      {/* Speak to Founder Dialog */}
      {openLeadDialog && selectedService && (
        <SpeakToFounderDialog
          open={openLeadDialog}
          onOpenChange={setOpenLeadDialog}
          serviceId={selectedService.id}
          serviceTitle={selectedService.title}
        />
      )}
    </CosmicPage>
  );
}
