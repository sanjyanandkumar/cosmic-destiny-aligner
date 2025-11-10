import { Sparkles } from "lucide-react";
import CosmicPage from "@/components/CosmicPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Leadership = () => {
  return (
    <CosmicPage>
      <Navigation />

      <section id="leadership" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>

              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
                Leadership
              </h2>

              <p className="font-inter text-xl text-primary italic">
                "He doesn't follow stars — he builds with them."
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 md:p-12">
              <h3 className="font-playfair text-3xl font-bold text-white mb-2 text-center">
                Abishek Selvaraj
              </h3>

              <p className="font-inter text-lg text-primary text-center mb-8">
                Karmic Business Strategist | Vision Architect | Founder, BrahmaX
              </p>

              <div className="space-y-6">

                <div>
                  <h4 className="font-playfair text-xl font-bold text-white mb-3">
                    The Visionary Behind BrahmaX
                  </h4>
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    Abishek Selvaraj is a new-generation spiritual entrepreneur who bridges karma and commerce, energy and execution. As the Founder of BrahmaX, he leads a cosmic collective of ventures that unite astrology, innovation, and strategic intelligence into one global ecosystem.
                  </p>
                </div>

                <div>
                  <h4 className="font-playfair text-xl font-bold text-white mb-3">
                    The Journey
                  </h4>
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    From mastering sales and communication to exploring spiritual sciences, Abishek's path has been both strategic and sacred. Armed with an MBA in Communication & Branding and advisory experience across entrepreneurs and creators, he decodes karmic business blueprints to align ventures with divine timing.
                  </p>
                </div>

                <div>
                  <h4 className="font-playfair text-xl font-bold text-white mb-3">
                    Leadership Ethos
                  </h4>
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    At BrahmaX, leadership is vibrational. Ideas are frequencies; teams are channels. Abishek leads with intuition, empathy, and clarity — shaping BrahmaX not as a company, but as a living consciousness.
                  </p>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
                  <p className="font-inter text-lg italic text-white text-center">
                    "Business is a spiritual journey — a reflection of inner karma. Align with your cosmic design, and success becomes effortless."
                  </p>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-lg p-6 mt-6 backdrop-blur-sm">
                  <p className="font-inter text-lg italic text-white text-center">
                    "Leadership is resonance, not authority."
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
};

export default Leadership;
