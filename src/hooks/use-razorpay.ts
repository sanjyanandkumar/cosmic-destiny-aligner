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

  const buyNow = useCallback(async ({ amountInPaise, name, description, buyerDetails, productId }: { amountInPaise: number; name: string; description?: string; buyerDetails?: { name: string; email: string; phone: string; address: string; }; productId?: string; }) => {
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

      const razorpayOrderId = data.order.id;

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name,
        description,
        order_id: razorpayOrderId,
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
            // Save order to database after successful payment verification
            try {
              // Generate order number
              const { data: orderNumberData } = await supabase.rpc("generate_order_number");
              const orderNumber = orderNumberData || `ORD-${Date.now()}`;

              // Create order record
              const { data: orderData, error: orderError } = await supabase
                .from("orders")
                .insert({
                  order_number: orderNumber,
                  buyer_name: buyerDetails?.name || "",
                  buyer_email: buyerDetails?.email || "",
                  buyer_phone: buyerDetails?.phone || null,
                  total_amount: amountInPaise,
                  status: "completed",
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  payment_id: response.razorpay_payment_id,
                })
                .select()
                .single();

              if (orderError) {
                console.error("Error saving order:", orderError);
                toast({ 
                  title: "Payment Successful", 
                  description: "Payment verified but order could not be saved. Please contact support with payment ID: " + response.razorpay_payment_id,
                  variant: "destructive"
                });
                return;
              }

              // If productId is provided, create order_item
              if (productId && orderData) {
                const { error: itemError } = await supabase
                  .from("order_items")
                  .insert({
                    order_id: orderData.id,
                    product_id: productId,
                    quantity: 1,
                    price_at_purchase: amountInPaise,
                  });

                if (itemError) {
                  console.error("Error saving order item:", itemError);
                }

                // Update product quantity if productId exists
                const { data: productData } = await supabase
                  .from("products")
                  .select("quantity_available")
                  .eq("id", productId)
                  .single();

                if (productData && productData.quantity_available > 0) {
                  const { error: updateError } = await supabase
                    .from("products")
                    .update({ quantity_available: productData.quantity_available - 1 })
                    .eq("id", productId);

                  if (updateError) {
                    console.error("Error updating product quantity:", updateError);
                  }
                }
              }

              toast({ 
                title: "Payment Successful", 
                description: `Thank you for your purchase! Order Number: ${orderNumber}` 
              });
            } catch (saveError) {
              console.error("Error saving order to database:", saveError);
              toast({ 
                title: "Payment Successful", 
                description: "Payment verified but order could not be saved. Please contact support.",
                variant: "destructive"
              });
            }
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
