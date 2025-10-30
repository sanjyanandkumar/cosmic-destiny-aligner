import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const LeadMagnetCTA = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    time: "",
    place: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.dob || !formData.time || !formData.place || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    console.log("Lead magnet form submitted:", formData);
    toast.success("Success! Check your email for your free snapshot.");
    
    // Reset form
    setFormData({
      name: "",
      dob: "",
      time: "",
      place: "",
      email: "",
    });
  };

  return (
    <section className="py-24 bg-gradient-solar relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-primary animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get Your Free{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                3-Point Karmic Outfit Snapshot
              </span>
            </h2>
            <p className="font-inter text-xl text-muted-foreground">
              Discover your power color, signature silhouette, and daily ritual — aligned with your birth chart
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-cosmic-blue/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-inter text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-cosmic-blue/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-inter text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50 border-cosmic-blue/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dob" className="font-inter text-foreground">
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="bg-background/50 border-cosmic-blue/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="font-inter text-foreground">
                    Time of Birth
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="bg-background/50 border-cosmic-blue/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="place" className="font-inter text-foreground">
                    Place of Birth
                  </Label>
                  <Input
                    id="place"
                    type="text"
                    placeholder="City, Country"
                    value={formData.place}
                    onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    className="bg-background/50 border-cosmic-blue/30"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold text-lg py-6 shadow-cosmic"
              >
                Get My Free Snapshot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center font-inter text-sm text-muted-foreground">
                Instant delivery. No credit card required. 100% free.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetCTA;
