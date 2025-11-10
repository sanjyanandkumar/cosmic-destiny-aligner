import { Award, Star, TrendingUp } from "lucide-react";
import CosmicPage from "@/components/CosmicPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Awards = () => {
  const recognitions = [
    {
      icon: Star,
      title: "Karmic Visionary Award",
      description:
        "Honoring the creation of BrahmaX, a platform where spirituality, strategy, and destiny merge into one evolutionary force.",
    },
    {
      icon: Award,
      title: "DarkShadow Ventures LLP Recognition",
      description:
        "For establishing BrahmaX as a model of karmic entrepreneurship and conscious capitalism.",
    },
    {
      icon: TrendingUp,
      title: "Emerging Spiritual Enterprise of the Year",
      description:
        "Celebrated for pioneering karmic verticals that bridge astrology, business, and lifestyle.",
    },
  ];

  return (
    <CosmicPage>
      <Navigation />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
                Awards & Recognitions
              </h2>
              <p className="font-inter text-xl text-primary italic mb-6">
                "The Universe Rewards Alignment."
              </p>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                Every recognition is a cosmic acknowledgment of vision aligned with purpose.
              </p>
            </div>

            {/* Award Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {recognitions.map(({ icon: Icon, title, description }, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-center hover:border-primary/40 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-white mb-3">
                    {title}
                  </h3>
                  <p className="font-inter text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            {/* Closing Block */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 text-center">
              <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                Our Gratitude
              </h3>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-4">
                Every milestone reflects the alignment of intention, timing, and energy.
              </p>
              <p className="font-inter text-xl italic text-primary">
                "We don’t chase awards — we let alignment attract them."
              </p>
            </div>

          </div>
        </div>
      </section>

    </CosmicPage>
  );
};

export default Awards;
