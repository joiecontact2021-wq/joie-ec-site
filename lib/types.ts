export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_price: number | null;
  description: string | null;
  image_url: string | null;
  category: string | null;
  stock: number | null;
  is_active: boolean;
  sort_order: number | null;
};

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  quantity: number;
};
