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
  <GalaxyBackground className="z-[1] opacity-70 scale-75" />
		<div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-4">
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
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.67C0 23.403.593 24 1.325 24h11.49v-9.293H9.692V11.16h3.123V8.41c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.1 2.795.144v3.24h-1.92c-1.51 0-1.803.718-1.803 1.77v2.385h3.606l-.47 3.547h-3.136V24h6.155C23.406 24 24 23.403 24 22.67V1.326C24 .593 23.407 0 22.675 0"></path>
                  </svg>
                </a>

                <a href="#" className="text-white/80 hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a2.99 2.99 0 0 0-2.105-2.115C19.565 3.5 12 3.5 12 3.5s-7.565 0-9.393.571a3.01 3.01 0 0 0-2.106 2.115C0 8.022 0 12.003 0 12.003s0 3.982.5 5.817c.293.983 1.128 1.759 2.105 2.015C4.436 20.5 12 20.5 12 20.5s7.565 0 9.393-.571a3.014 3.014 0 0 0 2.105-2.015c.5-1.835.5-5.817.5-5.817s0-3.98-.5-5.817zM9.545 15.568V8.431l6.273 3.569-6.273 3.568z"/>
                  </svg>
                </a>

                <a href="#" className="text-white/80 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>

                <a href="#" className="text-white/80 hover:text-primary transition-colors">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="h-5 w-5"
                  >
                    <path d="M18.244 2H21.5l-7.52 8.567L22 22h-6.187l-4.824-6.337L5.5 22H2l8.064-9.17L2 2h6.312l4.31 5.714L18.244 2Zm-1.09 18.221h1.858L7.01 3.68H5.03l12.124 16.54Z"/>
                  </svg>
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
                  BrahmaX Gurukul
                </a>
              </li>
              <li>
                <a href="/leisure" className="hover:text-primary transition-colors">
                  BrahmaX Welness
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
          <div className="space-y-4 text-white/80">

            {/* Phone */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-primary"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 .95-.26c1.04.26 2.16.4 3.31.4a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1A18 18 0 0 1 3 4a1 1 0 0 1 1-1h3.69a1 1 0 0 1 1 1c0 1.15.14 2.27.4 3.31a1 1 0 0 1-.26.95l-2.2 2.2Z"/>
              </svg>
              <a href="tel:+91991212123" className="hover:text-primary transition-colors">
                +91 89042 40444
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:askus@brahmax.in" className="hover:text-primary transition-colors">
                askus@brahmax.in
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Hq - Bengaluru, India</span>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-1 border-t border-cosmic-blue/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/80">
              © 2025 DarkShadow Ventures LLP. All rights reserved.
            </p>
            <p className="text-sm text-white/80 text-left">
              Designer: Sanjay Anandkumar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
