import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  const onSubmit = async (data: CheckoutFormData) => {
    setProcessing(true);

    try {
      // Check if user is logged in
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        toast({
          title: "Authentication Required",
          description: "Please login to complete your purchase",
          variant: "destructive",
        });
        navigate(`/login?redirect=/checkout`);
        return;
      }

      // Calculate totals
      const subtotal = totalPrice;
      const tax = Math.round(subtotal * 0.18);
      const total = subtotal + tax;

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          buyer_name: data.name,
          buyer_email: data.email,
          buyer_phone: data.phone,
          total_amount: total,
          status: "pending",
          order_number: `ORD-${Date.now()}`,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      // TODO: Integrate with Razorpay payment here
      // For now, we'll mark as completed
      await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("id", orderData.id);

      toast({
        title: "Order Placed!",
        description: `Order ${orderData.order_number} has been placed successfully`,
      });

      clearCart();
      navigate("/orders");
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const subtotal = totalPrice;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <CosmicPage>
      <Navigation />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-4xl font-playfair font-bold text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Billing Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="bg-white/10 border-white/30 text-white mt-2"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="bg-white/10 border-white/30 text-white mt-2"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="10-digit mobile number"
                    className="bg-white/10 border-white/30 text-white mt-2"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <Textarea
                    id="address"
                    {...register("address")}
                    rows={3}
                    className="bg-white/10 border-white/30 text-white mt-2"
                  />
                  {errors.address && (
                    <p className="text-destructive text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
              </div>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={processing}>
              {processing ? "Processing..." : `Place Order - ₹${total.toLocaleString()}`}
            </Button>
          </form>

          {/* Order Summary */}
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 sticky top-24">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-white">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-4 space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </CosmicPage>
  );
};

export default CheckoutPage;
