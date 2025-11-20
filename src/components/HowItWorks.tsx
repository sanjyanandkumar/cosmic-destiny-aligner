import { Search, FileText, Zap } from "lucide-react";
import CosmicPage from "@/components/CosmicPage";
import { Link } from "react-router-dom";

const steps = [
  { icon: Search, title: "Analyze", description: "Provide your birth details to decode your cosmic blueprint", link: "/consulting" },
  { icon: FileText, title: "Align", description: "Receive detailed reports and personalized consultations", link: "/sample" },
  { icon: Zap, title: "Activate", description: "Browse and buy curated products to transform your destiny", link: "/wardrobe" },
];

const HowItWorks = () => {
  return (
    <CosmicPage>
      <section id="how-it-works" className="py-6 md:py-10">
        <div className="container mx-auto px-4">

          <div className="text-center mb-10">
            <h2 className="font-playfair text-4xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Change your destiny in 3 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Link 
                  key={index}
                  to={step.link}
                  className="group relative text-center cursor-pointer transition-transform hover:scale-105"
                >
                  {/* connecting line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary to-transparent"></div>
                  )}

                  <div className="relative z-10">
                    {/* icon circle */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 group-hover:shadow-[0_0_20px_rgba(255,140,0,0.6)] transition-all">
                      <Icon className="h-10 w-10 text-primary-foreground" />
                    </div>

                    {/* step number */}
                    <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-playfair text-xl font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>

                    {/* title */}
                    <h3 className="font-playfair text-3xl font-bold text-white mb-3 leading-snug group-hover:text-primary transition">
                      {step.title}
                    </h3>

                    {/* description */}
                    <p className="font-inter text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>
    </CosmicPage>
  );
};

export default HowItWorks;
