import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import mirrorImg from "@/assets/Tarot reading.png";
import SpeakToFounderDialog from "@/components/SpeakToFounderDialog";

/* ============================
   BrahmaX Mirror Content
   ============================ */
const mirrorContent = {
  intro: [
    "BrahmaX Mirror is a reflection-based insight experience designed to help individuals and founders gain clarity during moments of uncertainty.",

    "Rather than predicting outcomes, Mirror focuses on awareness — highlighting patterns, choices, and internal alignment so decisions can be made consciously.",

    "Mirror is for those who value reflection over reaction, and clarity over noise.",
  ],

  sessions: [
    {
      id: "basic-mirror",
      title: "Basic Mirror Session",
      price: "₹999",
      meta: "One-time · 3 focused questions · Tarot-based reflection · 25–30 minutes",
      description:
        "Designed for quick clarity and perspective on specific situations or decisions.",
    },
    {
      id: "deep-reflection",
      title: "Deep Reflection Session",
      price: "₹2,499",
      meta: "Tarot + Astro insights · 60 minutes",
      description:
        "A deeper, integrated session combining reflective tarot reading with astrological context to explore patterns, timing, and long-term alignment. Ideal for founders, life transitions, and complex decisions.",
    },
  ],

  subscriptions: [
    {
      id: "ongoing-reflection",
      title: "Ongoing Reflection Session",
      price: "₹499",
      meta: "Available once every 15 days · 3 focused questions",
      description:
        "For individuals who have already experienced Mirror and wish to continue reflective check-ins during active phases of decision-making. Available only after an initial Mirror session.",
    },
    {
      id: "monthly-mirror",
      title: "Monthly Mirror Subscription",
      price: "₹999 / month",
      meta: "2 sessions per month · 3 questions per session",
      description:
        "A structured monthly reflection rhythm for those who prefer ongoing awareness and conscious alignment. Ideal for founders, creatives, and individuals navigating continuous change.",
    },
  ],
};

export default function MirrorPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    id: string;
    title: string;
  } | null>(null);

  return (
    <CosmicPage>
      <Navigation />

      <section className="pt-28 pb-20 md:pt-16 md:pb-10">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
              BrahmaX Mirror
            </h1>

            <p className="text-muted-foreground text-xl">
              Clarity by Reflection
            </p>
          </div>

          {/* Intro + Image */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {mirrorContent.intro.map((para, i) => (
                <p
                  key={i}
                  className="mb-4 text-muted-foreground leading-relaxed text-justify"
                >
                  {para}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={mirrorImg}
                alt="BrahmaX Mirror"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/40 to-transparent" />
            </motion.div>
          </div>

          {/* Sessions */}
          <h2 className="font-playfair text-3xl text-white font-bold mb-6">
            Mirror Sessions & Pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {mirrorContent.sessions.map((s) => (
              <Card
                key={s.id}
                className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair text-2xl text-white">
                    {s.title}
                  </h3>
                  <span className="text-xl font-bold text-primary">
                    {s.price}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {s.meta}
                </p>

                <p className="leading-relaxed text-white/90 mb-6">
                  {s.description}
                </p>

                <Button
                  onClick={() => {
                    setSelectedService({ id: s.id, title: s.title });
                    setOpenDialog(true);
                  }}
                  className="
                    w-full
                    font-bold
                    py-2
                    rounded-lg
                    bg-gradient-to-r from-[#8A2BE2] via-[#C084FC] to-[#E9D5FF]
                    text-black shadow-lg
                    hover:shadow-[0_0_30px_rgba(180,120,255,0.8)]
                    transition-all
                  "
                >
                  Book Session
                </Button>
              </Card>
            ))}
          </div>

          {/* Subscriptions */}
          <h2 className="font-playfair text-3xl text-white font-bold mb-6">
            Ongoing & Subscription Options
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {mirrorContent.subscriptions.map((s) => (
              <Card
                key={s.id}
                className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair text-2xl text-white">
                    {s.title}
                  </h3>
                  <span className="text-xl font-bold text-primary">
                    {s.price}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {s.meta}
                </p>

                <p className="leading-relaxed text-white/90 mb-6">
                  {s.description}
                </p>

                <Button
                  onClick={() => {
                    setSelectedService({ id: s.id, title: s.title });
                    setOpenDialog(true);
                  }}
                  className="
                    w-full
                    font-bold
                    py-2
                    rounded-lg
                    bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                    text-black shadow-lg
                    hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
                    transition-all
                  "
                >
                  Start Reflection
                </Button>
              </Card>
            ))}
          </div>

        </div>
      </section>

      <Footer />

      {/* Dialog */}
      {openDialog && selectedService && (
        <SpeakToFounderDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          serviceId={selectedService.id}
          serviceTitle={selectedService.title}
        />
      )}
    </CosmicPage>
  );
}
