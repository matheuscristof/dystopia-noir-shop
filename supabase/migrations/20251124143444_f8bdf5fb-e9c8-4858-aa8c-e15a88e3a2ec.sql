-- Create products table
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  rating DECIMAL(3,2) NOT NULL,
  reviews INTEGER NOT NULL DEFAULT 0,
  image TEXT NOT NULL,
  colors TEXT[] NOT NULL,
  sizes TEXT[] NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('streetwear', 'drops', 'accessories')),
  is_new BOOLEAN DEFAULT false,
  is_limited BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read products
CREATE POLICY "Anyone can view products"
ON public.products
FOR SELECT
TO public
USING (true);

-- Create index for category filtering
CREATE INDEX idx_products_category ON public.products(category);

-- Create index for featured products
CREATE INDEX idx_products_featured ON public.products(is_new, is_limited, is_bestseller);

-- Insert existing products data
INSERT INTO public.products (id, name, price, original_price, rating, reviews, image, colors, sizes, category, is_new, is_limited, is_bestseller, description, stock) VALUES
('str-001', 'CYBER HOODIE GHOST', 299, 399, 4.8, 127, '/src/assets/product-hoodie.jpg', ARRAY['Black', 'Dark Purple', 'Neon Green'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'streetwear', true, false, true, 'Premium tech hoodie com detalhes neon e acabamento cyberpunk', 45),
('str-002', 'TECH HOODIE MATRIX', 279, NULL, 4.7, 89, '/src/assets/products/hoodie-1.jpg', ARRAY['Black', 'Dark Gray', 'Electric Purple'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'streetwear', false, false, false, 'Hoodie essencial com tecnologia avançada e design futurista', 32),
('str-003', 'DYSTOPIA TEE CORE', 99, 129, 4.6, 203, '/src/assets/products/tshirt-1.jpg', ARRAY['Black', 'Dark Purple', 'Neon Green', 'Electric Blue'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'streetwear', false, false, true, 'T-shirt básica com gráficos dystópicos exclusivos', 78),
('str-004', 'TECH PANTS NEON', 249, 329, 4.9, 156, '/src/assets/product-pants.jpg', ARRAY['Black', 'Dark Gray', 'Electric Blue'], ARRAY['28', '30', '32', '34', '36', '38'], 'streetwear', false, false, false, 'Calça tech com elementos futuristas e cortes anatômicos', 23),
('str-005', 'CYBER PANTS MATRIX', 229, NULL, 4.5, 92, '/src/assets/products/pants-1.jpg', ARRAY['Black', 'Dark Purple', 'Neon Purple'], ARRAY['28', '30', '32', '34', '36', '38'], 'streetwear', false, false, false, 'Calça urbana com listras neon e design cyberpunk', 34),
('drop-001', 'GHOST COLLECTION HOODIE', 399, 499, 5.0, 43, '/src/assets/product-hoodie.jpg', ARRAY['Phantom Black'], ARRAY['S', 'M', 'L', 'XL'], 'drops', true, true, false, 'Edição limitada da coleção Ghost - apenas 50 unidades', 8),
('drop-002', 'NEON SERIES COMPLETE', 649, 799, 4.9, 27, '/src/assets/products/hoodie-1.jpg', ARRAY['Neon Purple', 'Electric Green'], ARRAY['M', 'L', 'XL'], 'drops', false, true, false, 'Set completo da série neon - hoodie + pants', 5),
('drop-003', 'DYSTOPIA 2000 VINTAGE', 199, 249, 4.8, 67, '/src/assets/products/tshirt-1.jpg', ARRAY['Vintage Black', 'Faded Purple'], ARRAY['S', 'M', 'L', 'XL'], 'drops', false, true, false, 'Remaster da coleção original de 2000', 12),
('acc-001', 'CYBER CAP NEON', 89, 119, 4.7, 134, '/src/assets/products/cap-1.jpg', ARRAY['Black', 'Dark Purple', 'Neon Green'], ARRAY['One Size'], 'accessories', false, false, true, 'Boné cyberpunk com detalhes em neon', 67),
('acc-002', 'TECH BACKPACK MATRIX', 299, NULL, 4.8, 89, '/src/assets/products/backpack-1.jpg', ARRAY['Black', 'Dark Purple'], ARRAY['One Size'], 'accessories', true, false, false, 'Mochila tech com compartimentos especiais e design futurista', 28),
('acc-003', 'DYSTOPIA GLOVES TECH', 129, NULL, 4.6, 76, '/src/assets/products/gloves-1.jpg', ARRAY['Black', 'Neon Green', 'Electric Purple'], ARRAY['S', 'M', 'L', 'XL'], 'accessories', false, false, false, 'Luvas tech com detalhes cyberpunk e grip antiderrapante', 45);