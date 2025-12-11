import * as React from "react";
import CosmicPage from "@/components/CosmicPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";

const ConsultingPage: React.FC = () => {

  const blueprintService = {
    id: "blueprint",
    name: "Karmic Blueprint",
    price: 999,
    description:
      "Decode your birth chart to craft a business model aligned with your innate strengths, purpose, and planetary timing.",
    image: karmicConsultingImg,
  };

  return (
    <CosmicPage>
      <Navigation />

      <section id="consulting" className="py-16 pb-6">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h1 className="font-playfair text-5xl font-bold text-white mb-4 leading-tight">
              BrahmaX Karmic Consulting
            </h1>

            <p className="font-inter text-xl text-primary italic mb-6">
              The Karmic Consulting Division
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Scaling destiny, not just business. Begin your journey with the foundation — your karmic blueprint.
            </p>
          </div>

          {/* Single Primary Service */}
          <div className="max-w-5xl mx-auto">
            <Link to={`/consulting/${blueprintService.id}`} className="group">
              <Card className="flex flex-col md:flex-row overflow-hidden bg-white/10 backdrop-blur-md 
                border border-white/20 hover:border-primary/60 transition-all duration-500 cursor-pointer">

                {/* IMAGE LEFT */}
                <div className="relative w-full md:w-1/2 h-[300px] md:h-[460px] overflow-hidden">
                  <img
                    src={blueprintService.image}
                    alt={blueprintService.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* TEXT RIGHT */}
                <div className="p-6 flex flex-col justify-center md:w-1/2">
                  <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                    {blueprintService.name}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {blueprintService.description}
                  </p>

                  <p className="font-playfair text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4">
                    ₹{blueprintService.price.toLocaleString()}
                  </p>

                  <Button
                    size="sm"
                    className="mt-2 rounded-full bg-gradient-to-r from-[#FFB347] via-[#FFD280] 
                    to-[#FF8C00] text-black font-semibold hover:scale-105 hover:shadow-[0_0_22px_rgba(255,200,100,0.7)] transition-all"
                  >
                    View Details →
                  </Button>
                </div>

              </Card>
            </Link>
          </div>

          {/* Link to Additional Programs */}
          <div className="text-center mt-6">
            <Link
              to="/consulting/additional"
              className="text-primary text-lg underline hover:text-primary/70 transition-all"
            >
              View Additional Consulting Services →
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
};

export default ConsultingPage;
