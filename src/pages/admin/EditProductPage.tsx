import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Button } from "@/components/ui/button";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    details: "",
    category: "",
    price: "",
    quantity_available: "",
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([""]);

  useEffect(() => {
    const loadProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          name,
          description,
          details,
          category,
          price,
          quantity_available,
          product_images (
            image_url,
            sort_order
          ),
          product_features (
              feature,
              sort_order
          )
        `)
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Product not found");
        navigate("/admin/products");
        return;
      }

      setForm({
        name: data.name,
        description: data.description || "",
        details: data.details || "",
        category: data.category || "",
        price: String(data.price),
        quantity_available: String(data.quantity_available ?? ""),
      });

      const images =
        data.product_images
          ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
          .map((img: any) => img.image_url) || [];

        const loadedFeatures =
        data.product_features
            ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
            .map((f: any) => f.feature) || [];

        setFeatures(loadedFeatures.length > 0 ? loadedFeatures : [""]);
      setImageUrls(images.length > 0 ? images : [""]);
      setLoading(false);
    };

    loadProduct();
  }, [id, navigate]);

    const handleUpdate = async () => {
    /* 1️⃣ Update product */
    const { error: productError } = await supabase
        .from("products")
        .update({
        name: form.name,
        description: form.description,
        details: form.details,
        category: form.category,
        price: Number(form.price),
        quantity_available: Number(form.quantity_available),
        })
        .eq("id", id);

    if (productError) {
        alert(productError.message);
        return;
    }

    /* 2️⃣ Replace images */
    await supabase
        .from("product_images")
        .delete()
        .eq("product_id", id);

    const imagesToInsert = imageUrls
        .filter((url) => url.trim() !== "")
        .map((url, index) => ({
        product_id: id,
        image_url: url,
        sort_order: index,
        }));

    if (imagesToInsert.length > 0) {
        const { error } = await supabase
        .from("product_images")
        .insert(imagesToInsert);

        if (error) {
        alert("Image update failed");
        return;
        }
    }

    /* 3️⃣ Replace features */
    const { data, error } = await supabase
        .from("product_features")
        .delete()
        .eq("product_id", id)
        .select();

    if (error) {
        console.error("Delete failed:", error.message);
        alert("Failed to delete features");
        return;
    }

    if (!data || data.length === 0) {
        console.warn("No features deleted (possibly none existed)");
    } else {
        console.log(`Deleted ${data.length} features`);
    }

    const featuresToInsert = features
        .filter((f) => f.trim() !== "")
        .map((feature, index) => ({
        product_id: id,
        feature,
        sort_order: index,
        }));

    if (featuresToInsert.length > 0) {
        const { error } = await supabase
        .from("product_features")
        .insert(featuresToInsert);

        if (error) {
        alert("Feature update failed");
        return;
        }
    }

    alert("Product updated successfully");
    navigate("/admin/products");
    };

  const inputClass =
    "w-full p-3 rounded-md border border-gray-300 bg-white text-black";

  if (loading) {
    return (
      <CosmicPage>
        <Navigation />
        <div className="pt-24 text-center text-white">
          Loading product…
        </div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage>
      <Navigation />

      <div className="container max-w-2xl mx-auto pt-24 pb-16">
        <h1 className="text-3xl font-bold text-white mb-6">
          Edit Product
        </h1>

        {/* Name */}
        <div className="flex items-center gap-4 mb-3">
          <label className="w-28 text-white">Name</label>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* Short Description */}
        <div className="flex items-start gap-4 mb-3">
          <label className="w-28 text-white pt-2">Description</label>
          <textarea
            className={inputClass}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* Details */}
        <div className="flex items-start gap-4 mb-3">
          <label className="w-28 text-white pt-2">Details</label>
          <textarea
            className={inputClass}
            rows={4}
            value={form.details}
            onChange={(e) =>
              setForm({ ...form, details: e.target.value })
            }
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-4 mb-3">
          <label className="w-28 text-white">Category</label>
          <input
            className={inputClass}
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-3">
          <label className="w-28 text-white">Quantity</label>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={form.quantity_available}
            onChange={(e) =>
              setForm({
                ...form,
                quantity_available: e.target.value,
              })
            }
          />
        </div>

        {/* Product Images */}
        <div className="mb-6">
          <label className="block text-white mb-2">
            Product Images
          </label>

          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-3 mb-2">
              <input
                className={inputClass}
                value={url}
                placeholder={`Image URL ${index + 1}`}
                onChange={(e) => {
                  const updated = [...imageUrls];
                  updated[index] = e.target.value;
                  setImageUrls(updated);
                }}
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() =>
                  setImageUrls(
                    imageUrls.filter((_, i) => i !== index)
                  )
                }
              >
                ✕
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => setImageUrls([...imageUrls, ""])}
          >
            + Add Image
          </Button>
        </div>

        {/* Product Features */}
        <div className="mb-6">
          <label className="text-white font-medium block mb-2">
            Product Features
          </label>

          {features.map((feature, index) => (
            <div key={index} className="flex gap-3 mb-2">
              <input
                className="flex-1 p-3 rounded-md border border-gray-300 bg-white text-black"
                placeholder={`Feature ${index + 1}`}
                value={feature}
                onChange={(e) => {
                  const updated = [...features];
                  updated[index] = e.target.value;
                  setFeatures(updated);
                }}
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() =>
                  setFeatures(features.filter((_, i) => i !== index))
                }
              >
                ✕
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => setFeatures([...features, ""])}
          >
            + Add Feature
          </Button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4 mb-6">
          <label className="w-28 text-white">Price</label>
          <input
            type="number"
            className={inputClass}
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleUpdate}
            className="
              font-bold
              px-8 py-3
              rounded-lg
              bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
              text-black shadow-lg
              hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
              transition-all
            "
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Footer />
    </CosmicPage>
  );
};

export default EditProductPage;
