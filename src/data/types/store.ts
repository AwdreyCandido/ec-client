import { Product } from "./product";

export interface Store {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  email: string;
  phone: string;
  ratings: number;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}