import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";
import CosmicPage from "@/components/CosmicPage";

const ContactPage = () => {
  return (
    <CosmicPage>
      <Navigation />

      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-16">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
                Contact & Collaborate
              </h1>

              <p className="font-inter text-xl text-primary italic mb-6">
                “If you’ve felt the pull, it’s already karmic.”
              </p>

              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                BrahmaX collaborates with leaders, creators, investors, and seekers who
                wish to build aligned ventures. If this resonates with your frequency,
                consider this your cosmic invitation.
              </p>
            </div>

            {/* Contact Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 mb-12">
              <h3 className="font-playfair text-2xl font-bold text-white mb-6 text-center">
                Connect With Us
              </h3>

              <div className="space-y-4 max-w-2xl mx-auto">

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <p className="text-white">
                    <span className="text-muted-foreground">Headquarters:</span> Bengaluru, India
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <p className="text-white">
                    <span className="text-muted-foreground">Website:</span> www.brahmax.in (coming soon)
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <p className="text-white">
                    <span className="text-muted-foreground">Email:</span> connect@brahmax.in
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <p className="text-white">
                    <span className="text-muted-foreground">Consultations:</span> By appointment only
                  </p>
                </div>

                {/* Social Media Row */}
                <div className="flex items-center justify-center gap-6 pt-4">
                  <a
                    href="https://instagram.com/BrahmaX.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition"
                  >
                    <Instagram className="h-7 w-7" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abishek-kadambi-267692267/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition"
                  >
                    <Linkedin className="h-7 w-7" />
                  </a>
                </div>

              </div>
            </div>

            {/* Closing Block */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 text-center">
              <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                The Invitation
              </h3>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                “If this message resonates, that resonance is your alignment.
                Let us build not just ventures — but karmic blueprints.”
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
};

export default ContactPage;
