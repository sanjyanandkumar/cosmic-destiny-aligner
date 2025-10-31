const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-cosmic relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Science of Karma.{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                The Architecture of Destiny.
              </span>
            </h2>
            <p className="font-inter text-xl text-muted-foreground leading-relaxed">
              BrahmaX is a karmic innovation company born from the belief that every creation, business, and relationship has a divine blueprint. We decode this unseen architecture and align it with strategy, design, and destiny.
            </p>
          </div>

          <div className="space-y-8 text-center">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                Our Essence
              </h3>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                BrahmaX stands at the intersection of spiritual intelligence and strategic enterprise. Founded under DarkShadow Ventures LLP, it operates as a house of karmic verticals — each one built to realign industries with higher consciousness. From digital ecosystems to luxury wellness, from karmic real estate to cosmic branding — BrahmaX transforms vision into vibration, and vibration into value.
              </p>
            </div>

            <div>
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                Our Vision
              </h3>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-4">
                "To build karmically aligned global enterprises that balance profit, purpose, and planetary evolution."
              </p>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                BrahmaX envisions a new era of entrepreneurship — one where destiny is not chased, but decoded. We believe true success is cosmic — when your actions, timing, and energy align with the universe itself.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-cosmic-blue/30 rounded-lg p-8 mt-12">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-6">
                Company Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <p className="font-inter text-sm text-primary mb-1">Registered Entity</p>
                  <p className="font-inter text-foreground">DarkShadow Ventures LLP</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-primary mb-1">Flagship Brand</p>
                  <p className="font-inter text-foreground">BrahmaX</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-primary mb-1">Headquarters</p>
                  <p className="font-inter text-foreground">Bengaluru, India</p>
                </div>
                <div>
                  <p className="font-inter text-sm text-primary mb-1">Nature of Business</p>
                  <p className="font-inter text-foreground">Spiritual-Strategic Holding Company</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mt-8">
              <p className="font-inter text-lg italic text-foreground leading-relaxed">
                "BrahmaX was born not from ambition, but from awareness. Every brand, every soul, every idea carries its own karmic rhythm — I simply listen to it and build in alignment. My journey has taught me that real success is not random — it's a sacred synchronization between energy, action, and time."
              </p>
              <p className="font-playfair text-primary mt-4 font-semibold">
                — Abishek Selvaraj, Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
