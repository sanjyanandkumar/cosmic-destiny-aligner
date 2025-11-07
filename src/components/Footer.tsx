import { Sparkles, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import bg from "@/assets/cosmic-background.png";

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
  };

  return (
	<footer
	  className="relative bg-cover bg-center bg-no-repeat border-t border-cosmic-blue/30"
	  style={{ backgroundImage: `url(${bg})` }}
	>
	<div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
		<div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                BrahmaX
              </span>
            </div>
            <p className="text-muted-foreground">
              Where Karma Builds Kingdoms. A spiritual architecture for wealth, destiny, and evolution.
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
            <h3 className="text-lg font-bold text-foreground mb-4">
              Verticals
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#verticals" className="hover:text-primary transition-colors">
                  BrahmaX Consulting
                </a>
              </li>
              <li>
                <a href="#verticals" className="hover:text-primary transition-colors">
                  BrahmaX Wardrobe
                </a>
              </li>
              <li>
                <a href="#verticals" className="hover:text-primary transition-colors">
                  EduSeam
                </a>
              </li>
              <li>
                <a href="#verticals" className="hover:text-primary transition-colors">
                  BrahmaX Leisure
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About BrahmaX
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-primary transition-colors">
                  Leadership
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact & Collaborate
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Contact
            </h3>
            <div className="space-y-2 text-muted-foreground mb-4">
              <p>Bengaluru, India</p>
              <p>connect@brahmax.in</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              "If you've felt the pull, it's already karmic."
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/brahmax.official" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/kettetalksbyabi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:connect@brahmax.in" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cosmic-blue/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 DarkShadow Ventures LLP. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Designed by the stars, executed by strategy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
