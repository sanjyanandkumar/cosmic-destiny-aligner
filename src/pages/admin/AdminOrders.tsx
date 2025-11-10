import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, FileDown, Printer } from "lucide-react";
import jsPDF from "jspdf";
import bg from "@/assets/cosmic-background.png";
import GalaxyBackground from "@/components/GalaxyBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Order = {
  id: string;
  order_number: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string | null;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  report_url: string | null;
};

function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });
}

export default function AdminOrders() {
  const { data, isLoading, refetch, isFetching } = useOrders();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return (data || []).filter((o) =>
      o.order_number.toLowerCase().includes(s) ||
      (o.buyer_email || "").toLowerCase().includes(s) ||
      (o.buyer_name || "").toLowerCase().includes(s) ||
      (o.status || "").toLowerCase().includes(s)
    );
  }, [data, search]);

  const invoicePDF = async (order: Order) => {
    const doc = new jsPDF();
    doc.text(`Invoice for ${order.order_number}`, 14, 20);
    doc.save(`invoice-${order.order_number}.pdf`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      <Navigation /> {/* ✅ HEADER */}

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${bg})` }} />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
      <GalaxyBackground className="absolute inset-0 opacity-60 pointer-events-none" />

      <main className="relative z-10 pt-32 pb-24 px-8"> 
        {/* Page Content */}
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1
              className="
                text-4xl font-bold 
                bg-clip-text text-transparent 
                bg-gradient-to-r from-[#F7E8A0] via-[#FFDFAF] to-[#E2B448]
                drop-shadow-[0_0_10px_rgba(255,215,140,0.6)]
                leading-normal
                pb-1
              "
              style={{
                WebkitTextStroke: "1px rgba(0,0,0,0.7)",
              }}
            >
              Order Management Console
            </h1>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => refetch()}
                disabled={isFetching}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Loader2 className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh
              </Button>

              <Button className="bg-gradient-to-r from-[#FFDC94] to-[#E2B448] text-black font-semibold shadow-[0_0_18px_rgba(255,220,148,0.7)] hover:scale-105 transition-all">
                <FileDown className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6">
            <Input
              placeholder="Search by order#, email, name, status…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/10 text-white placeholder-white/60 border-white/30"
            />
          </div>

          {/* Table Card */}
          <Card className="mt-8 bg-white/10 backdrop-blur-md border-white/20 shadow-[0_0_40px_rgba(255,215,0,0.15)] rounded-2xl text-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">All Orders</CardTitle>
            </CardHeader>

            <CardContent>
              <Table className="text-white/90">
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-[#FFDFAF] uppercase tracking-wider text-xs">Order #</TableHead>
                    <TableHead className="text-[#FFDFAF] uppercase tracking-wider text-xs">Buyer</TableHead>
                    <TableHead className="text-[#FFDFAF] uppercase tracking-wider text-xs">Email</TableHead>
                    <TableHead className="text-[#FFDFAF] uppercase tracking-wider text-xs">Status</TableHead>
                    <TableHead className="text-right text-[#FFDFAF] uppercase tracking-wider text-xs">Total</TableHead>
                    <TableHead className="text-right text-[#FFDFAF] uppercase tracking-wider text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <Loader2 className="inline h-6 w-6 animate-spin text-[#FFDFAF]" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((o) => (
                      <TableRow key={o.id} className="hover:bg-white/10 transition-all border-white/10">
                        <TableCell>{o.order_number}</TableCell>
                        <TableCell>{o.buyer_name}</TableCell>
                        <TableCell>{o.buyer_email}</TableCell>
                        <TableCell>{o.status}</TableCell>
                        <TableCell className="text-right">₹{Number(o.total_amount).toFixed(2)}</TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => invoicePDF(o)}
                            className="border border-white/30 text-white hover:bg-white/10"
                          >
                            <Printer className="h-4 w-4 mr-1" /> Invoice
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer /> {/* ✅ FOOTER */}
    </div>
  );
}
