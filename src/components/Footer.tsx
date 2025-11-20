import { Sparkles, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import bg from "@/assets/cosmic-background.png";
import { Link } from "react-router-dom";
import GalaxyBackground from "@/components/GalaxyBackground";
import brahmaXLogo from "@/assets/brahmax-logo.png";
import { MapPin } from "lucide-react";

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
  };

  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat border-t border-cosmic-blue/30 text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
  	<div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
  <GalaxyBackground className="z-[1]" />
		<div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={brahmaXLogo}
                alt="BrahmaX Logo"
                className="h-14 w-auto animate-pulse-glow"
              />
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Verticals */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Verticals
            </h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="/consulting" className="hover:text-primary transition-colors">
                  BrahmaX Consulting
                </a>
              </li>
              <li>
                <a href="/wardrobe" className="hover:text-primary transition-colors">
                  BrahmaX Wardrobe
                </a>
              </li>
              <li>
                <a href="/eduseam" className="hover:text-primary transition-colors">
                  EduSeam
                </a>
              </li>
              <li>
                <a href="/leisure" className="hover:text-primary transition-colors">
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
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="/about" className="hover:text-primary transition-colors">
                  About BrahmaX
                </a>
              </li>
              <li>
                <a href="/leadership" className="hover:text-primary transition-colors">
                  Founder's note
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors">
                  Media assets
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-white/80 mb-4">
              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Bengaluru, India</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:connect@brahmax.in" className="hover:text-primary transition-colors">
                  connect@brahmax.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-0 border-t border-cosmic-blue/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/80">
              © 2025 DarkShadow Ventures LLP. All rights reserved.
            </p>
            <p className="text-sm text-white/80">
              Designer: Sanjay Anandkumar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
