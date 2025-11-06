import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-transparent font-inter">
      <Navigation />
      <section className="py-24 bg-background/60 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
                Contact & Collaborate
              </h1>
              <p className="font-inter text-xl text-primary italic mb-6">
                “If you’ve felt the pull, it’s already karmic.”
              </p>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                BrahmaX collaborates with leaders, creators, investors, and seekers who wish to build ventures and experiences aligned with higher consciousness. Whether you wish to consult, co-create, or partner, our doors are open to those who resonate with the BrahmaX frequency.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-cosmic-blue/30 rounded-lg p-8 mb-12">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-6 text-center">Connect With Us</h3>
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <p className="font-inter text-foreground"><span className="text-muted-foreground">Headquarters:</span> Bengaluru, India</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <p className="font-inter text-foreground"><span className="text-muted-foreground">Website:</span> www.brahmax.in (placeholder)</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <p className="font-inter text-foreground"><span className="text-muted-foreground">Email:</span> connect@brahmax.in</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <p className="font-inter text-foreground"><span className="text-muted-foreground">Collaborations & Consultations:</span> Available by appointment only</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <p className="font-inter text-foreground"><span className="text-muted-foreground">Follow the Journey:</span> @BrahmaX.official (Instagram) | @KetteTalksByAbi (LinkedIn)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-cosmic-gold/10 border border-primary/30 rounded-lg p-8 text-center">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
                The Invitation
              </h3>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                “If our vision resonates with your vibration, that’s your sign from the cosmos. Let’s build not just businesses — but blueprints for destiny.”
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
