import { Product } from "./product";

export interface Order {
  id: number;
  product: Product;
  quantity: number;
  price: string;
  shipping: string;
  totalAmount: string;
  createdAt: string;
  status: string;
}
