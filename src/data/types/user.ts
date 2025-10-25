import { ShoppingCart } from "./shopping-cart";

export interface User {
  id: number;
  name: string;
  email: string;
  address: string | null;
  role: "client" | "admin" | "owner";
  cart: ShoppingCart;
}
