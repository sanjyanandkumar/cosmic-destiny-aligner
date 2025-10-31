import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <section className="py-24 bg-cosmic-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
                Contact & Collaborate
              </h1>
              <p className="font-inter text-xl text-primary italic mb-6">
                "If you've felt the pull, it's already karmic."
              </p>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                BrahmaX collaborates with leaders, creators, investors, and seekers who wish to build ventures and experiences aligned with higher consciousness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card/30 backdrop-blur-sm border border-cosmic-blue/30 rounded-lg p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-foreground mb-3">
                  Headquarters
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  Bengaluru, India
                </p>
              </div>

              <div className="bg-card/30 backdrop-blur-sm border border-cosmic-blue/30 rounded-lg p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-foreground mb-3">
                  Email
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  connect@brahmax.in
                </p>
              </div>

              <div className="bg-card/30 backdrop-blur-sm border border-cosmic-blue/30 rounded-lg p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-foreground mb-3">
                  Consultations
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  Available by appointment only
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-cosmic-gold/10 border border-primary/30 rounded-lg p-8 text-center">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                The Invitation
              </h3>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                "If our vision resonates with your vibration, that's your sign from the cosmos. Let's build not just businesses — but blueprints for destiny."
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
