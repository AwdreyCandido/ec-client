import { CartItem } from "./cart-item";

export interface Cart {
  id: number;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}
