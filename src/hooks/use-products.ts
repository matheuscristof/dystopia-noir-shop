import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  rating: number;
  reviews: number;
  image: string;
  colors: string[];
  sizes: string[];
  category: 'streetwear' | 'drops' | 'accessories';
  is_new?: boolean;
  is_limited?: boolean;
  is_bestseller?: boolean;
  description: string;
  stock: number;
}

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data as Product[];
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data as Product;
    },
    enabled: !!id,
  });
};
