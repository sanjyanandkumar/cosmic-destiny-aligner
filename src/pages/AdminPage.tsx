import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import CosmicPage from "@/components/CosmicPage";
import bg from "@/assets/cosmic-background.png";

interface Order {
  id: string;
  order_number: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string | null;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({ title: "Unauthorized", description: "Please log in.", variant: "destructive" });
      navigate("/login");
      return;
    }

    const { data: isAdmin, error } = await supabase.rpc("has_role", {
      _role: "admin",
      _user_id: user.id,
    });

    if (error || isAdmin !== true) {
      toast({ title: "Access Denied", description: "Admin access required.", variant: "destructive" });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    fetchOrders();
  };

  const fetchOrders = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast({ title: "Error", description: "Could not update status", variant: "destructive" });
      return;
    }

    toast({ title: "Updated", description: "Order status updated" });
    fetchOrders();
  };

  const getStatusBadge = (s: string) => {
    const map: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      processing: "secondary",
      completed: "default",
      cancelled: "destructive",
    };
    return <Badge variant={map[s] || "outline"}>{s}</Badge>;
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-IN");

  const formatAmount = (amt: number) =>
    `₹${(amt / 100).toFixed(2)}`;

  if (!isAdmin) return null;

  return (
    <CosmicPage bgSrc={bg}>
      <Navigation />

      <div className="container mx-auto px-4 py-24 max-w-6xl">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-playfair">Order Management</CardTitle>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p className="text-center py-6">Loading orders...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Update</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>{o.order_number}</TableCell>
                      <TableCell>{o.buyer_name}</TableCell>
                      <TableCell>{o.buyer_email}</TableCell>
                      <TableCell>{o.buyer_phone || "—"}</TableCell>
                      <TableCell>{formatAmount(o.total_amount)}</TableCell>
                      <TableCell>{getStatusBadge(o.status)}</TableCell>
                      <TableCell>{formatDate(o.created_at)}</TableCell>
                      <TableCell>
                        <Select value={o.status} onValueChange={(v) => updateOrderStatus(o.id, v)}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </CosmicPage>
  );
}
