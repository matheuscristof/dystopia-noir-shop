// Product data for the e-commerce
import hoodie1 from "@/assets/products/hoodie-1.jpg";
import tshirt1 from "@/assets/products/tshirt-1.jpg";
import pants1 from "@/assets/products/pants-1.jpg";
import cap1 from "@/assets/products/cap-1.jpg";
import backpack1 from "@/assets/products/backpack-1.jpg";
import gloves1 from "@/assets/products/gloves-1.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productPants from "@/assets/product-pants.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  colors: string[];
  sizes: string[];
  category: 'streetwear' | 'drops' | 'accessories';
  isNew?: boolean;
  isLimited?: boolean;
  isBestseller?: boolean;
  description: string;
  stock: number;
}

export const products: Product[] = [
  // STREETWEAR
  {
    id: "str-001",
    name: "CYBER HOODIE GHOST",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 127,
    image: productHoodie,
    colors: ["Black", "Dark Purple", "Neon Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "streetwear",
    isNew: true,
    isBestseller: true,
    description: "Premium tech hoodie com detalhes neon e acabamento cyberpunk",
    stock: 45
  },
  {
    id: "str-002",
    name: "TECH HOODIE MATRIX",
    price: 279,
    rating: 4.7,
    reviews: 89,
    image: hoodie1,
    colors: ["Black", "Dark Gray", "Electric Purple"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "streetwear",
    description: "Hoodie essencial com tecnologia avançada e design futurista",
    stock: 32
  },
  {
    id: "str-003",
    name: "DYSTOPIA TEE CORE",
    price: 99,
    originalPrice: 129,
    rating: 4.6,
    reviews: 203,
    image: tshirt1,
    colors: ["Black", "Dark Purple", "Neon Green", "Electric Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "streetwear",
    isBestseller: true,
    description: "T-shirt básica com gráficos dystópicos exclusivos",
    stock: 78
  },
  {
    id: "str-004",
    name: "TECH PANTS NEON",
    price: 249,
    originalPrice: 329,
    rating: 4.9,
    reviews: 156,
    image: productPants,
    colors: ["Black", "Dark Gray", "Electric Blue"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    category: "streetwear",
    description: "Calça tech com elementos futuristas e cortes anatômicos",
    stock: 23
  },
  {
    id: "str-005",
    name: "CYBER PANTS MATRIX",
    price: 229,
    rating: 4.5,
    reviews: 92,
    image: pants1,
    colors: ["Black", "Dark Purple", "Neon Purple"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    category: "streetwear",
    description: "Calça urbana com listras neon e design cyberpunk",
    stock: 34
  },

  // LIMITED DROPS
  {
    id: "drop-001",
    name: "GHOST COLLECTION HOODIE",
    price: 399,
    originalPrice: 499,
    rating: 5.0,
    reviews: 43,
    image: productHoodie,
    colors: ["Phantom Black"],
    sizes: ["S", "M", "L", "XL"],
    category: "drops",
    isLimited: true,
    isNew: true,
    description: "Edição limitada da coleção Ghost - apenas 50 unidades",
    stock: 8
  },
  {
    id: "drop-002",
    name: "NEON SERIES COMPLETE",
    price: 649,
    originalPrice: 799,
    rating: 4.9,
    reviews: 27,
    image: hoodie1,
    colors: ["Neon Purple", "Electric Green"],
    sizes: ["M", "L", "XL"],
    category: "drops",
    isLimited: true,
    description: "Set completo da série neon - hoodie + pants",
    stock: 5
  },
  {
    id: "drop-003",
    name: "DYSTOPIA 2000 VINTAGE",
    price: 199,
    originalPrice: 249,
    rating: 4.8,
    reviews: 67,
    image: tshirt1,
    colors: ["Vintage Black", "Faded Purple"],
    sizes: ["S", "M", "L", "XL"],
    category: "drops",
    isLimited: true,
    description: "Remaster da coleção original de 2000",
    stock: 12
  },

  // ACCESSORIES
  {
    id: "acc-001",
    name: "CYBER CAP NEON",
    price: 89,
    originalPrice: 119,
    rating: 4.7,
    reviews: 134,
    image: cap1,
    colors: ["Black", "Dark Purple", "Neon Green"],
    sizes: ["One Size"],
    category: "accessories",
    isBestseller: true,
    description: "Boné cyberpunk com detalhes em neon",
    stock: 67
  },
  {
    id: "acc-002",
    name: "TECH BACKPACK MATRIX",
    price: 299,
    rating: 4.8,
    reviews: 89,
    image: backpack1,
    colors: ["Black", "Dark Purple"],
    sizes: ["One Size"],
    category: "accessories",
    isNew: true,
    description: "Mochila tech com compartimentos especiais e design futurista",
    stock: 28
  },
  {
    id: "acc-003",
    name: "DYSTOPIA GLOVES TECH",
    price: 129,
    rating: 4.6,
    reviews: 76,
    image: gloves1,
    colors: ["Black", "Neon Green", "Electric Purple"],
    sizes: ["S", "M", "L", "XL"],
    category: "accessories",
    description: "Luvas tech com detalhes cyberpunk e grip antiderrapante",
    stock: 45
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};