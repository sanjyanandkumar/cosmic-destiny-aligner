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
                BrahmaX is a holistic karmic alignment enterprise that decodes the mystic architecture of karmic science and aligns each individual or business with the karmic blueprint that shapes everyone’s strategy, design, and destiny.<br></br>
Every creation, business, and relationship in this universe has a divine blueprint.<br></br>
Hence, it is pertinent and important that each individual across the globe, be it of any culture, religion, or country, is aware of how this pre-destined blueprint works and aligns his/her life to lead a harmonious one, by which they don’t travel their life-journey clueless and unaware of what is happening to them at all.<br></br>
In short, the universe doesn’t reward effort alone — it rewards alignment!<br></br>
And this is where BrahmaX steps in…
              </p>
            </div>

            {/* Essence */}
            <div className="space-y-8 text-center">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                  Our Essence
                </h3>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  BrahmaX stands at the intersection of spiritual intelligence and strategic enterprise. Founded under DarkShadow Ventures, it operates a plethora of karmic verticals — digital ecosystems to luxury wellness, from karmic real estate to cosmic branding to karmic media assets, et al <br></br>
Each one is built to realign vision to vibration, and vibration to value.<br></br>
                </p>
              </div>

              {/* Vision */}
              <div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                  Our Vision
                </h3>
                <p className="font-inter text-lg text-muted-foreground italic mb-4">
                  "To build karmically aligned individuals and global enterprises that balance growth, achievement, success, purpose, profit, and planetary evolution."
                </p>
                <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                  BrahmaX also envisions a new era of entrepreneurship — where destiny is not chased, but decoded. <br></br>
We believe true success is cosmic — when your actions, timing, and energy align with the universe. Our mission is to bridge spirituality and strategy, turning karmic blueprints into tangible empires that uplift both the individual and the collective.

                </p>
              </div>

              <div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                  Our Purpose
                </h3>
                <p className="font-inter text-lg text-muted-foreground mb-4">
                  To guide individuals, creators, leaders, and enterprises toward ventures that are cosmically timed and spiritually sustainable — also crafting businesses that generate wealth with meaning, legacy, and balance in the bargain.
                </p>
              </div>
              {/* Company Profile */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 mt-12">
                <h3 className="font-playfair text-2xl font-bold text-white mb-6">
                  Company profile snapshot
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
