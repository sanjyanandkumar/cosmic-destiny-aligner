import { Zap, Clock, Target } from "lucide-react";
import bg from "@/assets/cosmic-background.png";
import GalaxyBackground from "@/components/GalaxyBackground";

const Philosophy = () => {
  const principles = [
    {
      icon: Zap,
      title: "Energy",
      description: "The inner vibration of the creator and the venture. Energy defines what you attract.",
    },
    {
      icon: Clock,
      title: "Timing",
      description: "The cosmic alignment of planetary movements with business cycles. Timing defines when you act.",
    },
    {
      icon: Target,
      title: "Intention",
      description: "The spiritual clarity behind your goals. Intention defines why you build.",
    },
  ];

  return (
	<section
	  id="philosophy"
	  className="relative py-24 bg-cover bg-center bg-no-repeat"
	  style={{ backgroundImage: `url(${bg})` }}
	>
	  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    <GalaxyBackground className="z-[1]" />

	  <div className="relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Philosophy
            </h2>
            <p className="font-inter text-2xl text-primary mb-6">
              "Energy. Timing. Intention. Everything Else is Noise."
            </p>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed">
              At BrahmaX, we believe the universe doesn't reward effort alone — it rewards alignment. Every soul, idea, and venture operates under a precise karmic rhythm, and our purpose is to decode that rhythm into action.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm border border-cosmic-blue/30 rounded-lg p-8 mb-12">
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-4 text-center">
              The Karmic Principle
            </h3>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed text-center">
              Every business carries its own energetic DNA — shaped by the intentions of its founders, the timing of its birth, and the vibration of its name. When these frequencies are aligned, success flows naturally. When they aren't, even the strongest strategies face resistance.
            </p>
            <p className="font-inter text-lg italic text-primary text-center mt-6">
              "Karma isn't punishment or reward — it's design. Understand it, and you master your destiny."
            </p>
          </div>

          <div className="mb-12">
            <h3 className="font-playfair text-3xl font-bold text-foreground mb-8 text-center">
              The Triad of Creation —{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                The BrahmaX Code
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 bg-gradient-to-br from-primary/10 to-transparent border border-cosmic-blue/30 rounded-lg"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-playfair text-xl font-bold text-foreground mb-3">
                      {principle.title}
                    </h4>
                    <p className="font-inter text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="font-inter text-lg text-center text-muted-foreground mt-8">
              When these three merge, karma becomes capital, and destiny becomes direction.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cosmic-gold/10 to-primary/10 border border-primary/30 rounded-lg p-8 text-center">
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
              The BrahmaX Way
            </h3>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-6">
              We approach every project as a living soul. Whether it's a luxury brand, a real estate empire, or a wellness retreat — we don't just create; we consecrate. Our models integrate ancient wisdom, cutting-edge analytics, and intuitive design to shape ventures that evolve beyond success — into legacy.
            </p>
            <p className="font-inter text-xl italic text-primary">
              "The BrahmaX way is not to predict the future — it's to align with it."
            </p>
          </div>
        </div>
      </div>
		</div>
	</section>
  );
};

export default Philosophy;
