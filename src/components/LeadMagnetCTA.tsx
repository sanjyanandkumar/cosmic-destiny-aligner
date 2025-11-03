import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Enhanced email validation function
const isValidEmail = (email: string): boolean => {
  if (!email || email.trim() === "") return false;
  
  // More comprehensive email regex pattern
  // Matches RFC 5322 compliant email addresses
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Additional checks
  if (email.length > 255) return false;
  if (email.includes("..")) return false; // No consecutive dots
  if (email.startsWith(".") || email.endsWith(".")) return false; // No leading/trailing dots
  if (email.startsWith("@") || email.endsWith("@")) return false; // No leading/trailing @
  
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  if (parts[0].length > 64) return false; // Local part max 64 chars
  if (parts[1].length > 255) return false; // Domain part max 255 chars
  
  return emailRegex.test(email);
};

const LeadMagnetCTA = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    time: "",
    place: "",
    email: "",
  });
  const [emailError, setEmailError] = useState<string>("");
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): string => {
    if (!email || email.trim() === "") {
      return "Email is required";
    }
    if (!isValidEmail(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    
    // Show validation error if field has been touched
    if (touchedFields.email) {
      setEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setTouchedFields({ ...touchedFields, email: true });
    setEmailError(validateEmail(formData.email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouchedFields({
      name: true,
      email: true,
      dob: true,
      time: true,
      place: true,
    });
    
    // Basic validation
    if (!formData.name || !formData.dob || !formData.time || !formData.place || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailValidationError = validateEmail(formData.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      toast.error(emailValidationError);
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
    setEmailError("");
    setTouchedFields({});
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
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    className={`bg-background/50 border-cosmic-blue/30 ${
                      emailError ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                    aria-invalid={emailError ? "true" : "false"}
                    aria-describedby={emailError ? "email-error" : undefined}
                  />
                  {emailError && (
                    <p id="email-error" className="text-sm text-destructive mt-1">
                      {emailError}
                    </p>
                  )}
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
