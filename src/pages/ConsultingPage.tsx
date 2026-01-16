import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import karmicConsultingImg from "@/assets/karmic-consulting.jpg";

import SpeakToFounderDialog from "@/components/SpeakToFounderDialog";

const ConsultingPage: React.FC = () => {
  const [openLeadDialog, setOpenLeadDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    id: string;
    title: string;
  } | null>(null);

  return (
    <CosmicPage>
      <Navigation />

      {/* 🌌 Consulting Section */}
      <section id="consulting" className="pt-20 pb-8">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="max-w-6xl mx-auto text-center mb-6">
            <h1 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
              BrahmaX Karmic Consulting
            </h1>

            <p className="font-inter text-lg text-muted-foreground leading-relaxed">
              Know your karmic blueprint. Change your destiny.
            </p>
          </div>

          {/* Consulting Card */}
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg transition-all hover:shadow-[0_0_25px_rgba(255,220,120,0.3)]">

              <div className="grid md:grid-cols-2 gap-0 items-stretch">

                {/* Image */}
                <div className="relative h-[380px] md:h-auto overflow-hidden">
                  <img
                    src={karmicConsultingImg}
                    alt="Karmic Consulting"
                    className="w-full h-full object-cover scale-[0.9] transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold mb-3 text-white">
                      Karmic Consulting Session
                    </h2>

                    <p className="font-inter text-muted-foreground mb-4 leading-relaxed text-justify">
                      Understand your karmic purpose, how planetary timing
                      influences your decisions, and where energetic alignment
                      or resistance exists in your life or business journey.
                    </p>

                    <ul className="mb-6 space-y-2 text-white/90 text-sm">
                      <li>• Personal karmic blueprint reading</li>
                      <li>• Destiny & timing awareness</li>
                      <li>• Conscious decision guidance</li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => {
                        setSelectedService({
                          id: "karmic-consulting",
                          title: "Karmic Business Consulting",
                        });
                        setOpenLeadDialog(true);
                      }}
                      className="
                        inline-block font-bold
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
                </div>

              </div>
            </Card>
          </div>

          {/* Link to Additional Consulting */}
          <div className="text-center mt-6">
            <Link
              to="/consulting/additional"
              className="text-white text-lg underline hover:text-primary/70 transition-all"
            >
              More Consulting Services →
            </Link>
          </div>

        </div>
      </section>

      <Footer />

      {/* 🔮 Speak to Founder Dialog (SAME AS ConsultingAdditionalPage) */}
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
};

export default ConsultingPage;
