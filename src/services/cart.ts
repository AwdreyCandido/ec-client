import { Cart } from "../data/types/cart";
import { ValidationErrorResponse } from "../data/types/error-response";
import { API_URL } from "../utils/constants";

interface AddItemDto {
  cartId: number;
  productId: number;
  quantity?: number;
}

interface CreateOrderDto {
  userId: number;
  productId: number;
  quantity: number;
  price: number;
  shipping: number;
  totalAmount: number;
}

interface Order {
  id: number;
  product: {
    id: number;
  };
  quantity: number;
  price: string;
  shipping: string;
  totalAmount: string;
  createdAt: string;
  status: string;
}

interface OrderGroup {
  id: number;
  totalAmount: string;
  totalShipping: string;
}

export interface OrderResponse {
  orderGroup: OrderGroup;
  orders: Order[];
}

export async function addItemToCart(addItemDto: AddItemDto): Promise<any> {
  try {
    const { data } = await API_URL.post<Cart>(`/carts`, addItemDto);

    return data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data as ValidationErrorResponse;
    }
    return {
      message: "Network error",
      statusCode: 500,
      error: "Internal Server Error",
    };
  }
}

export async function removeCartItem(itemId: number): Promise<any> {
  try {
    const { data } = await API_URL.delete<Cart>(`/carts/${itemId}`);

    return data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data as ValidationErrorResponse;
    }
    return {
      message: "Network error",
      statusCode: 500,
      error: "Internal Server Error",
    };
  }
}

export async function createOrder(
  userId: number,
  createOrderDto: CreateOrderDto[]
): Promise<any> {
  try {
    const { data } = await API_URL.post<OrderResponse>(
      `/orders/${userId}`,
      createOrderDto
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data as ValidationErrorResponse;
    }
    return {
      message: "Network error",
      statusCode: 500,
      error: "Internal Server Error",
    };
  }
}

export function transformCartToOrders(
  cart: Cart,
  userId: number
): CreateOrderDto[] {
  return cart.items.map((item) => {
    const price = Number(item.unitPrice) || 0;
    const totalAmount = (Number(item.totalPrice) || 0) * item.quantity;
    const shipping = Number(item.shipping);

    return {
      userId,
      productId: item.product.id,
      quantity: item.quantity,
      price,
      shipping: shipping || 0.0,
      totalAmount,
    };
  });
}
