import { Sparkles } from "lucide-react";
import bg from "@/assets/cosmic-background.png";

const Leadership = () => {
  return (
	<section
	  id="leadership"
	  className="relative py-24 bg-cover bg-center bg-no-repeat"
	  style={{ backgroundImage: `url(${bg})` }}
	>
	  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
	  <div className="relative z-10">
	<div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Leadership
            </h2>
            <p className="font-inter text-xl text-primary italic">
              "He doesn't follow stars — he builds with them."
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-cosmic-blue/30 rounded-lg p-8 md:p-12">
            <h3 className="font-playfair text-3xl font-bold text-foreground mb-2 text-center">
              Abishek Selvaraj
            </h3>
            <p className="font-inter text-lg text-primary text-center mb-8">
              Karmic Business Strategist | Vision Architect | Founder, BrahmaX
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-playfair text-xl font-bold text-foreground mb-3">
                  The Visionary Behind BrahmaX
                </h4>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  Abishek Selvaraj is a new-generation spiritual entrepreneur who bridges karma and commerce, energy and execution. As the Founder of BrahmaX, he leads a cosmic collective of ventures that unite astrology, innovation, and strategic intelligence into one global ecosystem.
                </p>
              </div>

              <div>
                <h4 className="font-playfair text-xl font-bold text-foreground mb-3">
                  The Journey
                </h4>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  From mastering sales and communication to exploring spiritual sciences, Abishek's path has been both strategic and sacred. Armed with an MBA in Communication & Branding, a foundation in digital design, and certified expertise across business development, consulting, and styling — he embodies the BrahmaX balance of intellect and intuition. Over the years, he has advised visionaries, entrepreneurs, and creators — helping them decode their karmic business blueprint and scale ventures in harmony with divine timing.
                </p>
              </div>

              <div>
                <h4 className="font-playfair text-xl font-bold text-foreground mb-3">
                  Leadership Ethos
                </h4>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  At BrahmaX, leadership is not about hierarchy — it's about vibration. Every idea is a frequency; every team member, a channel of creation. Abishek leads with empathy, intuition, and precision — ensuring that BrahmaX evolves as a living, breathing consciousness, not just a company.
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
                <p className="font-inter text-lg italic text-foreground text-center">
                  "Business is a spiritual journey — a mirror of one's inner karma. When we align with our cosmic design, success becomes effortless."
                </p>
              </div>

              <div className="bg-gradient-to-br from-cosmic-gold/10 to-primary/10 border border-primary/30 rounded-lg p-6 mt-6">
                <p className="font-inter text-lg italic text-foreground text-center">
                  "True leadership is energetic alignment — not authority, but awareness."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Leadership;
