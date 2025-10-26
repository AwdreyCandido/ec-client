import { Product } from "./product";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  shipping: number;
  unitPrice: string;
  totalPrice: string;
}
