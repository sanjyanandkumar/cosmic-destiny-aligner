import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CosmicPage from "@/components/CosmicPage";

import consultingImg from "@/assets/karmic-consulting.jpg";
import wardrobeImg from "@/assets/cosmic-wallet.jpg";
import eduseamImg from "@/assets/career-guidance.png";
import leisureImg from "@/assets/karmic-meditation.jpg";
import bg from "@/assets/cosmic-background.png";
import founderImg from "@/assets/founder.jpg";

const verticals = [
  {
    title: "BrahmaX Consulting",
    subtitle: "The Karmic Business Division",
    image: consultingImg,
    link: "/consulting",
    description: "Know your karmic blueprint; Change your destiny",
  },
  {
    title: "BrahmaX Wardrobe",
    subtitle: "The Astro-Fashion Division",
    image: wardrobeImg,
    link: "/wardrobe",
    description: "World’s first karmic fashion and lifestyle platform",
  },
  {
    title: "BrahmaX Gurukul",
    subtitle: "The Passport to Conscious Learning",
    image: eduseamImg,
    link: "/eduseam",
    description: "A karmic passport for students’ career goals",
  },
  {
    title: "BrahmaX Wellness",
    subtitle: "The Karmic Wellness Division",
    image: leisureImg,
    link: "/leisure",
    description: "An experiential space aligned with divine frequency",
  },
];

const VerticalCards = () => {
  return (
    <CosmicPage>
      <section id="verticals" className="py-10 md:py-0 bg-transparent !border-none !shadow-none">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              BrahmaX Verticals
            </h2>
            <p className="font-inter text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Four Paths. One Purpose — to Align Karma with Creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {verticals.map((item, index) => (
              <Link key={index} to={item.link}>
                <Card
                  className="overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md 
                             hover:shadow-[0_0_25px_rgba(255,220,120,0.4)] hover:border-primary/60
                             transition-all duration-500 cursor-pointer group rounded-2xl"
                >
                  <div className="relative h-[260px] overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-playfair text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        {/* ============================
            Meet the Founder (Bottom)
          ============================ */}
        <div className="max-w-6xl mx-auto mt-16 mb-8">
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.25)]">
            <div className="flex flex-col md:flex-row items-stretch">

              {/* Founder Image */}
              <div className="md:w-1/3 relative">
                <img
                  src={founderImg}
                  alt="Founder of BrahmaX"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>

              {/* Founder Content */}
              <div className="p-10 md:w-2/3 flex flex-col justify-between">
                <div>
                  <h2 className="font-playfair text-4xl text-white font-bold mb-4">
                    Karmic Connect
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Guided by decades of spiritual study, astrological mastery, and real-world
                    execution, the founder of BrahmaX brings karmic intelligence into practical
                    decision-making for individuals, businesses, and institutions.
                  </p>

                  <ul className="space-y-2 text-white/90 text-sm mb-8">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Trained in Vedic astrology, karmic sciences, and planetary psychology
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Experience with founders, leaders, and families across domains
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Decodes destiny patterns and timing-based decisions
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Practical, logic-backed, no-superstition guidance
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Focus on long-term alignment, not short-term predictions
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div>
                  <Link
                    to="/consulting"
                    className="
                      inline-block
                      w-[170px]
                      font-bold
                      px-8 py-2
                      rounded-lg
                      bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                      text-black shadow-lg
                      hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
                      transition-all
                      text-center
                    "
                  >
                    Consult NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CosmicPage>
  );
};

export default VerticalCards;
