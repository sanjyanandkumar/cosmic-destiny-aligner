import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return resolve();
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });
}

export function useRazorpay() {
  const [processing, setProcessing] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const buyNow = useCallback(async ({ amountInPaise, name, description, buyerDetails }: { amountInPaise: number; name: string; description?: string; buyerDetails?: { name: string; email: string; phone: string; address: string; }; }) => {
    try {
      setProcessing(true);
      await loadRazorpayScript();

      const { data, error } = await supabase.functions.invoke("razorpay-payment", {
        body: {
          action: "create-order",
          amount: amountInPaise,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          notes: { name, description },
        },
      });

      if (error || !data) {
        console.error("Create order error:", error);
        toast({ title: "Payment Error", description: "Could not start payment. Please try again." });
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name,
        description,
        order_id: data.order.id,
        prefill: buyerDetails ? {
          name: buyerDetails.name,
          email: buyerDetails.email,
          contact: buyerDetails.phone,
        } : undefined,
        handler: async (response: any) => {
          const verify = await supabase.functions.invoke("razorpay-payment", {
            body: { action: "verify", ...response },
          });
          if (verify.error || !verify.data) {
            toast({ title: "Verification Failed", description: "Unable to verify payment." });
            return;
          }
          if (verify.data.ok) {
            toast({ title: "Payment Successful", description: "Thank you for your purchase!" });
          } else {
            toast({ title: "Verification Failed", description: "Signature mismatch." });
          }
        },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      toast({ title: "Payment Error", description: "Something went wrong. Please try again." });
    } finally {
      if (mounted.current) setProcessing(false);
    }
  }, []);

  return { processing, buyNow };
}
