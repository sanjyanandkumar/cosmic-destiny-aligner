import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  product_images?: {
    image_url: string;
    sort_order: number;
  }[];
};

const ProductListPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          description,
          category,
          price,
          product_images (
            image_url,
            sort_order
          )
        `)
        .order("name");

      if (error) {
        console.error("Failed to load products:", error);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <CosmicPage>
      <Navigation />

      <div className="container max-w-6xl mx-auto pt-24 pb-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Product Catalog
          </h1>

          <Link to="/admin/products/new">
            <Button
              className="
                font-bold
                px-6 py-2
                rounded-lg
                bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                text-black shadow-lg
                hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
                transition-all
              "
            >
              + Add Product
            </Button>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-white text-center">
            Loading products…
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-white text-center">
            No products found.
          </div>
        )}

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-card/30 border border-white/20 overflow-hidden"
            >
                {product.product_images &&
                product.product_images.length > 0 && (
                    <img
                    src={
                        product.product_images
                        .sort((a, b) => a.sort_order - b.sort_order)[0].image_url
                    }
                    alt={product.name}
                    className="h-[200px] w-full object-cover"
                    />
                )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-white mb-1">
                  {product.name}
                </h2>

                <p className="text-sm text-muted-foreground mb-2">
                  {product.category}
                </p>

                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>

                <div className="flex items-center gap-6 mt-3">
                <span className="text-lg font-bold text-white">
                    ₹{product.price}
                </span>

                <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="text-sm font-semibold text-[#FFD280] hover:underline"
                >
                    Edit
                </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </CosmicPage>
  );
};

export default ProductListPage;
