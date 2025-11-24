import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { toast } from "@/hooks/use-toast";
import { Pencil, Plus, Trash2, Image as ImageIcon, RefreshCw } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  price: number;
  quantity_available: number;
  created_at: string;
  updated_at: string;
};

const PRODUCT_CATEGORIES = [
  "Wardrobe",
  "Consulting",
  "Leisure",
  "EduSeam",
];

function useProducts(search: string) {
  return useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      let q = supabase.from("products").select("*").order("updated_at", { ascending: false });
      const { data, error } = await q;
      if (error) throw error;

      return (data || []).filter(
        (p: any) =>
          (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
          (p.category || "").toLowerCase().includes(search.toLowerCase())
      ) as Product[];
    }
  });
}

export default function AddProductsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const { data, isLoading, refetch, isFetching } = useProducts(search);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    description: "",
    category: "",
    image_url: "",
    price: 0,
    quantity_available: 0
  });

  useEffect(() => {
    if (editing) setForm(editing);
    else
      setForm({
        name: "",
        description: "",
        category: "",
        image_url: "",
        price: 0,
        quantity_available: 0
      });
  }, [editing, open]);

  const upsert = useMutation({
    mutationFn: async (payload: Partial<Product>) => {
      const base = {
        name: payload.name,
        description: payload.description ?? null,
        category: payload.category ?? null,
        image_url: payload.image_url ?? null,
        price: Number(payload.price ?? 0),
        quantity_available: Number(payload.quantity_available ?? 0),
      };

      if (payload.id) {
        const { error } = await supabase.from("products").update(base).eq("id", payload.id);
        if (error) throw error;
        return "updated";
      } else {
        const { error } = await supabase.from("products").insert([base]);
        if (error) throw error;
        return "created";
      }
    },
    onSuccess: (mode) => {
      toast({ title: `Product ${mode}`, description: `Product successfully ${mode}.` });
      qc.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
      setEditing(null);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" })
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Deleted", description: "Product removed." });
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" })
  });

  const rows = useMemo(() => data || [], [data]);

  return (
    <CosmicPage>
      <Navigation />

      <div className="container mx-auto px-6 pt-32 py-20 space-y-8 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-playfair font-bold">Manage Products</h1>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch()} disabled={isFetching} className="border-white/40 text-white">
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button onClick={() => { setEditing(null); setOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>

        <Input
          placeholder="Search by name or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/10 border-white/30 text-white placeholder-white/60 max-w-md"
        />

        <div className="border border-white/30 rounded-xl backdrop-blur bg-black/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Image</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-right text-white">Price</TableHead>
                <TableHead className="text-right text-white">Qty</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-6 text-white/70">Loading…</TableCell></TableRow>
              ) : rows.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-6 text-white/70">No products found.</TableCell></TableRow>
              ) : rows.map(p => (
                <TableRow key={p.id} className="text-white">
                  <TableCell>
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="h-12 w-12 rounded object-cover border border-white/30" />
                    ) : (
                      <div className="h-12 w-12 rounded grid place-items-center border border-white/30">
                        <ImageIcon className="h-5 w-5 text-white/50" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category ?? "-"}</TableCell>
                  <TableCell className="text-right">₹{Number(p.price).toLocaleString()}</TableCell>
                  <TableCell className="text-right">{p.quantity_available}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => { setEditing(p); setOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => del.mutate(p.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Footer />

      {/* FORM DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              upsert.mutate(form);
            }}
            className="space-y-4"
          >
            <Label>Name</Label>
            <Input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

            <Label>Category</Label>
            <select
              value={form.category || ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-white/10 border border-white/30 rounded-lg p-2 text-white"
              required
            >
              <option value="">Select Category</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="text-black">
                  {cat}
                </option>
              ))}
            </select>

            <Label>Description</Label>
            <Input value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />

            <Label>Price</Label>
            <Input type="number" value={form.price || 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />

            <Label>Quantity</Label>
            <Input type="number" value={form.quantity_available || 0} onChange={(e) => setForm({ ...form, quantity_available: Number(e.target.value) })} required />

            <Label>Image URL (optional)</Label>
            <Input value={form.image_url || ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">{editing ? "Save Changes" : "Add Product"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </CosmicPage>
  );
}
