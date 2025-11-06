import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

function useProducts(search: string) {
  return useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      let q = supabase.from("products").select("*").order("updated_at", { ascending: false });
      const { data, error } = await q;
      if (error) throw error;
      const filtered = (data || []).filter(p =>
        (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(search.toLowerCase())
      );
      return filtered as Product[];
    }
  });
}

export default function AdminProducts() {
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
        quantity_available: Number(payload.quantity_available ?? 0)
      };
      if (payload.id) {
        const { error } = await supabase
          .from("products")
          .update({ ...base, updated_at: new Date().toISOString() })
          .eq("id", payload.id);
        if (error) throw error;
        return "updated";
      } else {
        const { error } = await supabase
          .from("products")
          .insert([{ ...base }]);
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsert.mutate(form);
  };

  const rows = useMemo(() => data || [], [data]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={() => { setEditing(null); setOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <Input placeholder="Search by name or category…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={6}>Loading…</TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={6}>No products.</TableCell></TableRow>
            ) : rows.map(p => (
              <TableRow key={p.id}>
                <TableCell className="w-[72px]">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="h-12 w-12 rounded object-cover border" />
                  ) : (
                    <div className="h-12 w-12 rounded grid place-items-center border">
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.category ?? "-"}</TableCell>
                <TableCell className="text-right">₹{Number(p.price).toFixed(2)}</TableCell>
                <TableCell className="text-right">{p.quantity_available}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label>Category</Label>
                <Input value={form.category || ""} onChange={e => setForm({ ...form, category: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Input value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <Label>Price (₹)</Label>
                <Input type="number" step="0.01" value={form.price as any} onChange={e => setForm({ ...form, price: Number(e.target.value) })} required />
              </div>
              <div>
                <Label>Quantity</Label>
                <Input type="number" value={form.quantity_available as any} onChange={e => setForm({ ...form, quantity_available: Number(e.target.value) })} required />
              </div>
              <div className="md:col-span-2">
                <Label>Image path (in <code>/src/assets</code>)</Label>
                <Input
                  placeholder="/src/assets/shirt-01.jpg"
                  value={form.image_url || ""}
                  onChange={e => setForm({ ...form, image_url: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Put the file in <code>src/assets</code> and reference it with the relative path. This UI only stores the path.
                </p>
                {form.image_url ? (
                  <img src={form.image_url} alt="preview" className="mt-2 h-24 w-24 object-cover rounded border" />
                ) : null}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={upsert.isPending}>
                {editing ? "Save Changes" : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}