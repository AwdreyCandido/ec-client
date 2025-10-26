import { Order } from "./order";

export interface OrderGroupType {
  id: number;
  orders: Order[];
  totalAmount: string;
  totalShipping: string;
  createdAt: string;
}
