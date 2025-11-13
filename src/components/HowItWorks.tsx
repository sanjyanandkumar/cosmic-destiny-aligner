import { Search, FileText, Zap } from "lucide-react";
import CosmicPage from "@/components/CosmicPage";
import bg from "@/assets/cosmic-background.png";

const steps = [
  { icon: Search, title: "Decode Chart", description: "We analyze your birth chart to understand your cosmic blueprint" },
  { icon: FileText, title: "Align", description: "Receive detailed reports and personalized consultations" },
  { icon: Zap, title: "Activate", description: "Access curated products and transformative mentorship" },
];

const HowItWorks = () => {
  return (
    <CosmicPage>
      {/* Restored top + bottom spacing */}
      <section id="how-it-works" className="py-28 md:py-32">
        <div className="container mx-auto px-4">

          <div className="text-center mb-14">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              How BrahmaX Works
            </h2>
            <p className="font-inter text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Three simple steps to align with your destiny
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center">

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary to-transparent"></div>
                  )}

                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                      <Icon className="h-10 w-10 text-primary-foreground" />
                    </div>

                    <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-playfair text-xl font-bold text-primary">{index + 1}</span>
                    </div>

                    <h3 className="font-playfair text-2xl font-bold text-white mb-3 leading-snug">
                      {step.title}
                    </h3>

                    <p className="font-inter text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>
    </CosmicPage>
  );
};

export default HowItWorks;
