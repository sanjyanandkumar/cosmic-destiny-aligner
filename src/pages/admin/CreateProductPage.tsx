import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { useNavigate } from "react-router-dom";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    details: "",
    price: "",
    quantity_available: "",
    category: "Wardrobe",
  });

const [imageUrls, setImageUrls] = useState<string[]>([""]);
const [features, setFeatures] = useState<string[]>([""]);

const handleSubmit = async () => {
  // 1️⃣ Insert product
  const { data: product, error } = await supabase
    .from("products")
    .insert([
      {
        ...form,
        price: Number(form.price),
        quantity_available: Number(form.quantity_available),
      },
    ])
    .select()
    .single();

  if (error || !product) {
    alert(error?.message || "Failed to create product");
    return;
  }

  // 2️⃣ Insert images
  const imagesToInsert = imageUrls
    .filter((url) => url.trim() !== "")
    .map((url, index) => ({
      product_id: product.id,
      image_url: url,
      sort_order: index,
    }));

  if (imagesToInsert.length > 0) {
    const { error: imageError } = await supabase
      .from("product_images")
      .insert(imagesToInsert);

    if (imageError) {
      alert("Product created, but image upload failed");
      return;
    }
  }

  // 3️⃣ Insert features
  const featuresToInsert = features
    .filter((f) => f.trim() !== "")
    .map((feature, index) => ({
      product_id: product.id,
      feature,
      sort_order: index,
    }));

  if (featuresToInsert.length > 0) {
    const { error: featureError } = await supabase
      .from("product_features")
      .insert(featuresToInsert);

    if (featureError) {
      alert("Product created, but feature save failed");
      return;
    }
  }
  alert("Product created successfully");
  navigate("/admin/products");
};

  const inputClass =
    "w-full mb-3 p-2 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <CosmicPage>
      <Navigation />

      <div className="container max-w-2xl mx-auto pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Add New Product
        </h1>

        <div className="flex items-center gap-4 mb-3">
          <label className="w-24 text-white font-medium">
            Name
          </label>

          <input
            className={`${inputClass} mb-0 flex-1`}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-4 mb-3">
          <label className="w-24 text-white font-medium">
            Description
          </label>
          <textarea
            className={inputClass}
            placeholder="Short description"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="flex items-start gap-4 mb-3">
          <label className="w-24 text-white font-medium pt-2">
            Details
          </label>
          <textarea
            className={inputClass}
            rows={4}
            placeholder="Detailed product description"
            onChange={(e) =>
              setForm({ ...form, details: e.target.value })
            }
          />
        </div>

        <div className="flex items-center gap-4 mb-3">
          <label className="w-24 text-white font-medium">
            Category
          </label>
          <input
            className={inputClass}
            placeholder="Category"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />
        </div>

        {/* Image URLs */}
        <div className="mb-4">
          <label className="text-white font-medium block mb-2">
            Product Images
          </label>

          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-3 mb-2">
              <input
                className="flex-1 p-3 rounded-md border border-gray-300 bg-white text-black"
                placeholder={`Image URL ${index + 1}`}
                value={url}
                onChange={(e) => {
                  const updated = [...imageUrls];
                  updated[index] = e.target.value;
                  setImageUrls(updated);
                }}
              />

              <Button
                type="button"
                onClick={() =>
                  setImageUrls(imageUrls.filter((_, i) => i !== index))
                }
                className="px-3"
                variant="destructive"
              >
                ✕
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => setImageUrls([...imageUrls, ""])}
            className="mt-2"
          >
            + Add Image url
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

        <div className="flex items-center gap-4 mb-3">
          <label className="w-24 text-white font-medium">
            Price
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-4 mb-3">
          <label className="w-24 text-white font-medium">
            Quantity
          </label>
          <input
            type="number"
            min={0}
            className={inputClass}
            placeholder="Available quantity"
            onChange={(e) =>
              setForm({ ...form, quantity_available: e.target.value })
            }
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleSubmit}
            className="
              inline-block font-bold
              px-8 py-3
              rounded-lg
              bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
              text-black shadow-lg
              hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
              transition-all
              disabled:opacity-60 disabled:cursor-not-allowed mt-4">
            Save Product
          </Button>
        </div>
      </div>

      <Footer />
    </CosmicPage>
  );
};

export default CreateProductPage;
