import { useMemo, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Printer, UploadCloud, ExternalLink } from "lucide-react";
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
  report_path: string | null;
  report_signed_url: string | null;
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
      return (data || []).map(order => ({
        id: order.id,
        order_number: order.order_number,
        buyer_name: order.buyer_name,
        buyer_email: order.buyer_email,
        buyer_phone: order.buyer_phone,
        total_amount: order.total_amount,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at,
        report_path: (order as any).report_path || null,
        report_signed_url: (order as any).report_signed_url || null
      }));
    },
  });
}

export default function AdminOrders() {
  const { data, isLoading, refetch, isFetching } = useOrders();
  const [search, setSearch] = useState("");
  const fileInputs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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

  const uploadReport = async (order: Order, file: File) => {
    const fileName = `${order.order_number}-${Date.now()}.${file.name.split(".").pop()}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("order-reports")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Upload Failed", description: uploadError.message, variant: "destructive" });
      return;
    }

    const filePath = uploadData.path;

    const { data: signed, error: signedError } = await supabase.storage
      .from("order-reports")
      .createSignedUrl(filePath, 60 * 60 * 24 * 30 * 6); // 6 months

    if (signedError) {
      toast({ title: "Signed URL Error", description: signedError.message, variant: "destructive" });
      return;
    }

    const signedUrl = signed.signedUrl;

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        report_path: filePath,
        report_signed_url: signedUrl,
        status: "Report Ready"
      })
      .eq("id", order.id);

    if (updateError) {
      toast({ title: "Save Failed", description: updateError.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Report uploaded and signed URL saved." });
    refetch();
  };

  const triggerUpload = (orderId: string) => {
    fileInputs.current[orderId]?.click();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      <Navigation />

      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${bg})` }} />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
      <GalaxyBackground className="absolute inset-0 opacity-60 pointer-events-none" />

      <main className="relative z-10 pt-32 pb-24 px-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F7E8A0] via-[#FFDFAF] to-[#E2B448] drop-shadow-[0_0_10px_rgba(255,215,140,0.6)]">
              Order Management Console
            </h1>

            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Loader2 className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>

          <Input
            placeholder="Search by order#, email, name, status…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 text-white placeholder-white/60 border-white/30 mb-6"
          />

          <Card className="bg-white/10 backdrop-blur-md border-white/20 rounded-2xl text-white">
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
            </CardHeader>

            <CardContent>
              <Table className="text-white/90">
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-[#FFDFAF] text-xs">Order #</TableHead>
                    <TableHead className="text-[#FFDFAF] text-xs">Buyer</TableHead>
                    <TableHead className="text-[#FFDFAF] text-xs">Email</TableHead>
                    <TableHead className="text-[#FFDFAF] text-xs">Status</TableHead>
                    <TableHead className="text-right text-[#FFDFAF] text-xs">Total</TableHead>
                    <TableHead className="text-right text-[#FFDFAF] text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-[#FFDFAF]" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((o) => (
                      <TableRow key={o.id} className="hover:bg-white/10 transition-all border-white/10">
                        <TableCell>{o.order_number}</TableCell>
                        <TableCell>{o.buyer_name}</TableCell>
                        <TableCell>{o.buyer_email}</TableCell>
                        <TableCell>{o.status}</TableCell>
                        <TableCell className="text-right">₹{o.total_amount.toFixed(2)}</TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">

                            <Button size="sm" onClick={() => invoicePDF(o)} className="border border-white/30 text-white hover:bg-white/10">
                              <Printer className="h-4 w-4 mr-1" /> Invoice
                            </Button>

                            {o.report_signed_url && (
                              <Button
                                size="sm"
                                onClick={() => window.open(o.report_signed_url!, "_blank")}
                                className="border border-white/30 text-[#FFDFAF] hover:bg-white/10"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" /> View Report
                              </Button>
                            )}

                            <Button size="sm" onClick={() => triggerUpload(o.id)} className="bg-[#FFDFAF] text-black hover:bg-[#f7d596]">
                              <UploadCloud className="h-4 w-4 mr-1" /> Upload
                            </Button>

                            <input
                              type="file"
                              accept="application/pdf,image/*"
                              className="hidden"
                              ref={(el) => (fileInputs.current[o.id] = el)}
                              onChange={(e) => e.target.files?.[0] && uploadReport(o, e.target.files[0])}
                            />
                          </div>
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

      <Footer />
    </div>
  );
}
