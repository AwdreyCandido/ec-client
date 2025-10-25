import { Product } from "./product";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}
