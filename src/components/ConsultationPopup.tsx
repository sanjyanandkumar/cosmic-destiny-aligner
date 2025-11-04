import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRazorpay } from "@/hooks/use-razorpay";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

interface ConsultationPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationPopup = ({ isOpen, onOpenChange }: ConsultationPopupProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { buyNow, processing } = useRazorpay();
  const { toast } = useToast();

  const handleBookConsultation = async () => {
    if (!name || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await buyNow({
        amountInPaise: 100000, // 1000 Rs = 100000 paise
        name: "Founder Consultation - 20 mins",
        description: "One-on-one consultation with the founder",
        buyerDetails: {
          name,
          email,
          phone,
          address: "N/A",
        },
      });

      toast({
        title: "Consultation Booked!",
        description: "You will receive confirmation details shortly.",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-primary/30">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center text-foreground">
            Consultation with the Founder
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Book a personalized 20-minute session
            <div className="mt-2 text-primary font-semibold text-lg">₹1,000</div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-background border-primary/20"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-primary/30 hover:bg-primary/10"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleBookConsultation}
              disabled={processing}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {processing ? "Processing..." : "Book Now"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationPopup;
