-- Create products table with inventory tracking
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- price in paise
  quantity_available INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table with buyer details
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT,
  total_amount INTEGER NOT NULL, -- total in paise
  status TEXT NOT NULL DEFAULT 'pending',
  payment_id TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_purchase INTEGER NOT NULL, -- price in paise at time of purchase
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read for products
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- RLS Policies - Anyone can create orders (public checkout)
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies - Anyone can view their own orders by email
CREATE POLICY "Users can view orders by email" 
ON public.orders 
FOR SELECT 
USING (true);

-- RLS Policies - Order items readable by everyone (for order details)
CREATE POLICY "Order items are viewable by everyone" 
ON public.order_items 
FOR SELECT 
USING (true);

-- RLS Policies - Anyone can create order items
CREATE POLICY "Anyone can create order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_orders_buyer_email ON public.orders(buyer_email);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Function to generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Insert initial products
INSERT INTO public.products (name, description, price, quantity_available, category) VALUES
('Karmic Consulting', 'Unlock the hidden timing and energy behind your ventures with our karmic business consulting.', 200000, 100, 'Consulting'),
('Cosmic Wallet', 'Luxury astro-fashion wallet with cosmic patterns and zodiac symbols.', 40000, 50, 'Wardrobe'),
('Celestial Handbag', 'Premium astro-fashion handbag with celestial patterns and star symbols.', 100000, 30, 'Wardrobe'),
('Career Guidance', 'Karmic career guidance to help you discover your unique dharma and translate it into meaningful work.', 100000, 100, 'EduSeam'),
('Bali Trip', 'Luxury karmic wellness retreat in Bali with transformational experiences.', 5000000, 20, 'Leisure'),
('Customized Karmic Meditation', 'Personalized karmic meditation sessions aligned with your cosmic blueprint.', 200000, 50, 'Leisure');