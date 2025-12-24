import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SpeakToFounderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId: string;
  serviceTitle: string;
  serviceType?: string;
}

export default function SpeakToFounderDialog({
  open,
  onOpenChange,
  serviceId,
  serviceTitle,
  serviceType,
}: SpeakToFounderDialogProps) {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      toast({
        title: "Missing details",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("founder_leads").insert({
      name,
      email,
      phone,
      service_id: serviceId,
      service_title: serviceTitle,
      service_type: serviceType ?? null,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Could not save your request",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request received",
      description: `We will contact you regarding ${serviceTitle}`,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-primary/30">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="text-primary" />
            </div>
          </div>

          <DialogTitle className="text-center text-2xl">
            Speak to the Founder
          </DialogTitle>

          <DialogDescription className="text-center">
            {serviceTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <Label>Phone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary text-black"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
