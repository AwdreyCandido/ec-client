import { ShoppingCart } from "./shopping-cart";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string | null;
  role: "client" | "admin" | "owner";
  cart: ShoppingCart;
}
