import { useState } from "react";
import { Sparkles } from "lucide-react";
import ConsultationPopup from "./ConsultationPopup";

const FloatingConsultationButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 top-1/2 translate-y-16 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-cosmic flex items-center justify-center transition-all hover:scale-110"
        aria-label="Book consultation with founder"
      >
        <Sparkles className="h-6 w-6" />
      </button>
      <ConsultationPopup isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

export default FloatingConsultationButton;
