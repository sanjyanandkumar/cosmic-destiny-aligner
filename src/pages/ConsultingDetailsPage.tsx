import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";
import bg from "@/assets/cosmic-background.png";
import { supabase } from "@/integrations/supabase/client";
import GalaxyBackground from "@/components/GalaxyBackground";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const ConsultingDetailsPage = () => {
  const { experienceId } = useParams();
  const { addToCart } = useCart();
  const {
    dialogOpen,
    currentProduct,
    processing,
    startCheckout,
    handleConfirmCheckout,
    handleCloseDialog,
  } = useCheckout();

  const experiences = {
    "blueprint": {
      title: "Stage 1 — Illusion: Karmic Business Blueprint",
      price: 1000,
      goal: "Uncover the client’s core karmic blueprint and align it with real-world opportunities.",
      includes: [
        "Personal astro-business chart reading",
        "Discovery session",
        "Initial business direction suggestions",
        "High-level feasibility and personality-fit analysis",
      ],
      outcome:
        "Client gains clarity on their ideal karmic-aligned industries, roles, and business types.",
    },
    "brand-architecture": {
      title: "Stage 2 — Focuslab: Strategic Brand Architecture",
      price: 5000,
      goal:
        "To initiate the complete process and move forward for creating the complete business concept, model, and brand system from scratch.",
      includes: [
        "Deep-dive analysis via Inner Lab",
        "Business model & revenue plan",
        "Brand strategy & positioning",
        "Name/nomenclature ideas",
        "Logo + identity direction",
        "30-day roadmap & launch strategy",
      ],
      outcome:
        "Client receives a ready-to-launch business blueprint, brand concept, and clear roadmap.",
    },
    "communication": {
      title: "Stage 3 — Uplift: Communication & Positioning",
      price: 5000,
      goal: "Act as their growth partner to scale the business.",
      includes: [
        "Sales system setup + team training",
        "Client acquisition & lead generation strategy",
        "Investor deck + funding guidance",
        "Monthly karmic growth alignment sessions",
        "Advisory on partnerships & global expansion",
      ],
      outcome:
        "Client builds revenue traction, raises funds, and grows sustainably under your guidance.",
    },
    "karmic-colors": {
      title: "Stage 4 — Website Creation Using Karmic Colors",
      price: 5000,
      goal:
        "Initiating discussion on web architecture and design aligned with karmic colors.",
      includes: [
        "Website design focusing on UX, interface layout, visuals, and navigation flow",
        "Planning & content creation for structure and purpose",
        "Development using HTML, CSS, JS, frameworks",
        "Hosting & maintenance using reliable cloud services",
      ],
      outcome:
        "Client receives a full karmic-aligned website design blueprint ready for development.",
    },
  };

  const exp = experienceId
    ? experiences[experienceId as keyof typeof experiences]
    : null;

  if (!exp) return <Navigate to="/consulting" replace />;

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />

      {/* 🌌 Cosmic Background Layer */}
      <main
        className="relative pt-36 pb-16 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* 1️⃣ Dark translucent overlay (UNDER stars) */}
        <div className="absolute inset-0 bg-black/85"></div>

        {/* 2️⃣ Stars ABOVE overlay but BELOW content */}
        <GalaxyBackground className="absolute inset-0 z-[1] opacity-85" />

        {/* 3️⃣ Optional nebula glow for color richness */}
        <div className="absolute inset-0 z-[2] opacity-30 blur-3xl bg-[radial-gradient(circle_at_30%_40%,rgba(255,180,255,0.25),transparent_60%)]" />

        {/* 4️⃣ Content layer */}
        <div className="relative z-[5] container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className="relative h-[480px] overflow-hidden rounded-lg">
                <img
                  src={karmicConsultingImg}
                  alt={exp.title}
                  className="w-full h-full object-cover rounded-lg shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Right: Details */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-snug">
                  {exp.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {exp.goal}
                </p>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 mb-8 shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                  <h2 className="text-2xl font-bold text-white mb-4">Includes:</h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6 text-lg">
                    {exp.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h2 className="text-2xl font-bold text-white mb-4">Outcome:</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {exp.outcome}
                  </p>
                </div>

                <div className="text-3xl font-playfair font-bold bg-gradient-gold bg-clip-text text-transparent mb-6">
                  ₹{exp.price.toLocaleString()}
                </div>

                <Button
                  size="lg"
                  disabled={processing}
                  onClick={async () => {
                    const { data } = await supabase.auth.getUser();
                    if (!data?.user) {
                      window.location.href = `/login?redirect=/consulting/${experienceId}`;
                      return;
                    }

                    addToCart({
                      id: experienceId!,
                      name: exp.title,
                      price: exp.price,
                      quantity: 1,
                      image_url: karmicConsultingImg,
                      category: "Consulting Service",
                    });

                    // 🎉 Toast Confirmation
                    toast({
                      title: "Added to Cart!",
                      description: `${exp.title} has been added to your cart.`,
                    });

                    // Optional: Redirect to cart (you already have)
                    window.location.href = "/cart";
                  }}
                  className="w-full md:w-auto bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Add to Cart - ₹{exp.price.toLocaleString()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* 💳 Checkout Dialog */}
      <CheckoutDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        productName={currentProduct?.name || ""}
        price={currentProduct?.price || 0}
        onConfirm={handleConfirmCheckout}
        processing={processing}
      />
    </div>
  );
};

export default ConsultingDetailsPage;
