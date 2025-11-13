import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import CosmicPage from "@/components/CosmicPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Mail, Phone } from "lucide-react";
import bg from "@/assets/cosmic-background.png";

interface Order {
  id: string;
  order_number: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string | null;
  total_amount: number;
  status: string;
  razorpay_payment_id: string | null;
  created_at: string;
  report_path: string | null;
  report_signed_url: string | null;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user?.email) {
        window.location.href = "/login";
        return;
      }

      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("buyer_email", user.email.toLowerCase())
        .order("created_at", { ascending: false });

      setOrders((data || []).map(order => ({
        id: order.id,
        order_number: order.order_number,
        buyer_name: order.buyer_name,
        buyer_email: order.buyer_email,
        buyer_phone: order.buyer_phone,
        total_amount: order.total_amount,
        status: order.status,
        razorpay_payment_id: order.razorpay_payment_id,
        created_at: order.created_at,
        report_path: (order as any).report_path || null,
        report_signed_url: (order as any).report_signed_url || null
      })));
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatAmount = (amount: number) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  return (
    <CosmicPage>
      <Navigation />

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl text-white">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-10">
            Your Orders
          </h1>

          {loading && (
            <p className="text-center text-lg opacity-80">Loading...</p>
          )}

          {!loading && orders.length === 0 && (
            <p className="text-center text-lg opacity-80">
              No orders found.
            </p>
          )}

          <div className="space-y-6">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="p-6 bg-white/10 backdrop-blur-md border-white/20 text-white rounded-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="h-5 w-5 text-primary" />
                      <h3 className="font-playfair text-xl font-bold">
                        {order.order_number}
                      </h3>
                    </div>
                    <p className="text-sm opacity-80">{formatDate(order.created_at)}</p>
                  </div>

                  <Badge className="bg-primary/20 text-primary border border-primary/40">
                    {order.status}
                  </Badge>
                </div>

                <p className="text-2xl font-bold text-primary mb-4">
                  {formatAmount(order.total_amount)}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-white/20 pt-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{order.buyer_email}</span>
                  </div>

                  {order.buyer_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{order.buyer_phone}</span>
                    </div>
                  )}
                </div>

                {order.report_signed_url && (
                  <div className="pt-4 border-t border-white/20 text-right">
                    <a
                      href={order.report_signed_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary/20 text-primary border border-primary/40 rounded hover:bg-primary hover:text-primary-foreground transition-all text-sm font-semibold"
                    >
                      Download Report
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
}
