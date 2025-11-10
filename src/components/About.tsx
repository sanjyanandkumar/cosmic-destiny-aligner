import CosmicPage from "@/components/CosmicPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <CosmicPage>
      <Navigation />

      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                The Science of Karma.{" "}
                <span className="bg-gradient-gold bg-clip-text text-transparent">
                  The Architecture of Destiny.
                </span>
              </h2>

              <p className="font-inter text-xl text-muted-foreground leading-relaxed">
                BrahmaX is a karmic innovation company born from the belief that
                every creation, business, and relationship has a divine blueprint.
                We decode this unseen architecture and align it with strategy,
                design, and destiny.
              </p>
            </div>

            {/* Essence */}
            <div className="space-y-8 text-center">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                  Our Essence
                </h3>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  BrahmaX stands at the intersection of spiritual intelligence and
                  strategic enterprise. Operating as a house of karmic verticals —
                  each built to realign industries with higher consciousness.
                </p>
              </div>

              {/* Vision */}
              <div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                  Our Vision
                </h3>
                <p className="font-inter text-lg text-muted-foreground italic mb-4">
                  "To build karmically aligned global enterprises that balance profit,
                  purpose, and planetary evolution."
                </p>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  We believe true success is cosmic — when your actions, timing, and
                  energy align with the universe itself.
                </p>
              </div>

              {/* Company Profile */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 mt-12">
                <h3 className="font-playfair text-2xl font-bold text-white mb-6">
                  Company Profile
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <p className="text-sm text-primary mb-1">Registered Entity</p>
                    <p className="text-white">DarkShadow Ventures LLP</p>
                  </div>

                  <div>
                    <p className="text-sm text-primary mb-1">Flagship Brand</p>
                    <p className="text-white">BrahmaX</p>
                  </div>

                  <div>
                    <p className="text-sm text-primary mb-1">Headquarters</p>
                    <p className="text-white">Bengaluru, India</p>
                  </div>

                  <div>
                    <p className="text-sm text-primary mb-1">Nature of Business</p>
                    <p className="text-white">Spiritual-Strategic Holding Company</p>
                  </div>
                </div>
              </div>

              {/* Founder Quote */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mt-8 text-center">
                <p className="font-inter text-lg italic text-white leading-relaxed">
                  "BrahmaX was born not from ambition, but from awareness.
                  Every brand, every soul, every idea carries its own karmic rhythm —
                  I simply listen to it and build in alignment."
                </p>
                <p className="font-playfair text-primary mt-4 font-semibold">
                  — Abishek Selvaraj, Founder
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </CosmicPage>
  );
};

export default About;
