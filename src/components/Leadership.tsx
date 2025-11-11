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
                    Abishek Selvaraj is the visionary force behind BrahmaX, where he bridges the realms of ancient astrology, spiritual law, and modern entrepreneurship. With a foundation in communication, branding, and strategy, he has mastered the art of aligning karmic timing with business architecture.
                  </p>
                </div>

                <div>
                  <h4 className="font-playfair text-xl font-bold text-white mb-3">
                    Mission
                  </h4>
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    His mission is simple yet profound — to awaken leaders, creators, and investors into realizing that wealth, purpose, and destiny are all interconnected frequencies. Through BrahmaX, he channels karmic intelligence into real-world ventures, helping people not just build businesses, but build their destiny.
                  </p>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
                  <p className="font-inter text-lg italic text-white text-center">
                    "Business is a spiritual journey — a reflection of inner karma. Align with your cosmic design, and success becomes effortless."
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
