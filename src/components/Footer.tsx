import { Sparkles, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
  };

  return (
    <footer className="bg-cosmic-black border-t border-cosmic-blue/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="font-playfair text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                BrahmaX
              </span>
            </div>
            <p className="font-inter text-muted-foreground">
              Cosmic intelligence for your style, business, education and journeys.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Verticals */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-foreground mb-4">
              Verticals
            </h3>
            <ul className="space-y-2 font-inter text-muted-foreground">
              <li>
                <a href="#wardrobe" className="hover:text-primary transition-colors">
                  BrahmaX Wardrobe
                </a>
              </li>
              <li>
                <a href="#business" className="hover:text-primary transition-colors">
                  Business Dharma
                </a>
              </li>
              <li>
                <a href="#stream" className="hover:text-primary transition-colors">
                  Stream Code
                </a>
              </li>
              <li>
                <a href="#journeys" className="hover:text-primary transition-colors">
                  Journeys
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-2 font-inter text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#founder" className="hover:text-primary transition-colors">
                  Founder Story
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-primary transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-foreground mb-4">
              Cosmic Updates
            </h3>
            <p className="font-inter text-muted-foreground mb-4">
              Subscribe for celestial insights and exclusive offers
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-background/50 border-cosmic-blue/30"
                required
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cosmic-blue/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-inter text-sm text-muted-foreground">
              © 2025 DarkShadow Ventures LLP. All rights reserved.
            </p>
            <p className="font-inter text-sm text-muted-foreground">
              Designed by the stars, executed by strategy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
