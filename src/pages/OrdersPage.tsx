import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Calendar, Mail, Phone } from "lucide-react";
import bg from "@/assets/cosmic-background.png";
import GalaxyBackground from "@/components/GalaxyBackground";

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
  report_url?: string | null;
}

const OrdersPage = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

	useEffect(() => {
	  const checkAuth = async () => {
		const { data } = await supabase.auth.getSession();
		if (!data.session) {
		  // No user logged in → Redirect to login
		  window.location.href = "/login";
		}
	  };

	  checkAuth();
	}, []);

  const searchOrders = async () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from("orders")
        .select("*")
        .eq("buyer_email", email.trim().toLowerCase())
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError("Could not fetch orders. Please try again.");
        console.error(fetchError);
        return;
      }

      setOrders(data || []);
      if (!data || data.length === 0) {
        setError("No orders found for this email address.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchOrders();
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Pending", variant: "secondary" },
      completed: { label: "Completed", variant: "default" },
      cancelled: { label: "Cancelled", variant: "destructive" },
      failed: { label: "Failed", variant: "destructive" },
    };

    const statusInfo = statusMap[status.toLowerCase()] || { label: status, variant: "outline" as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: number) => {
    return `₹${(amount / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-transparent font-inter">
      <Navigation />
		<section
		  className="py-24 relative bg-cover bg-center bg-no-repeat"
		  style={{ backgroundImage: `url(${bg})` }}
		>
		  {/* Dark overlay for clarity */}
		  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

		  {/* Page Content */}
		  <div className="relative z-10 container mx-auto px-4">
      <GalaxyBackground className="z-[1]" />
		<div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
                Order Status
              </h1>
              <p className="font-inter text-xl text-muted-foreground">
                Track your orders using your email address
              </p>
            </div>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-cosmic-blue/30 mb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="font-inter text-foreground">
                    Email Address
                  </Label>
                  <div className="flex gap-4 mt-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50 border-cosmic-blue/30"
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {loading ? "Searching..." : "Search Orders"}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>

            {error && (
              <div className="mb-8 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-destructive text-center">{error}</p>
              </div>
            )}

            {orders.length > 0 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-bold text-foreground">
                  Your Orders ({orders.length})
                </h2>
                {orders.map((order) => (
                  <Card
                    key={order.id}
                    className="p-6 bg-card/50 backdrop-blur-sm border-cosmic-blue/30"
                  >
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Package className="h-5 w-5 text-primary" />
                            <h3 className="font-playfair text-xl font-bold text-foreground">
                              {order.order_number}
                            </h3>
                          </div>
                          <p className="font-inter text-sm text-muted-foreground">
                            Order Date: {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(order.status)}
                          <p className="font-inter text-2xl font-bold text-primary">
                            {formatAmount(order.total_amount)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-cosmic-blue/30">
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 text-primary mt-1" />
                          <div>
                            <p className="font-inter text-xs text-muted-foreground">Email</p>
                            <p className="font-inter text-sm text-foreground">{order.buyer_email}</p>
                          </div>
                        </div>
                        {order.buyer_phone && (
                          <div className="flex items-start gap-2">
                            <Phone className="h-4 w-4 text-primary mt-1" />
                            <div>
                              <p className="font-inter text-xs text-muted-foreground">Phone</p>
                              <p className="font-inter text-sm text-foreground">{order.buyer_phone}</p>
                            </div>
                          </div>
                        )}
                        {order.razorpay_payment_id && (
                          <div className="flex items-start gap-2">
                            <Package className="h-4 w-4 text-primary mt-1" />
                            <div>
                              <p className="font-inter text-xs text-muted-foreground">Payment ID</p>
                              <p className="font-inter text-sm text-foreground font-mono">
                                {order.razorpay_payment_id}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {order.report_url && (
                      <div className="pt-4 border-t border-cosmic-blue/30 flex justify-end">
                        <a
                          href={order.report_url}
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
            )}
          </div>
        </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OrdersPage;

