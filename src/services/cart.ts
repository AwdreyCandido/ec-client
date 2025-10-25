import { Cart } from "../data/types/cart";
import { ValidationErrorResponse } from "../data/types/error-response";
import { API_URL } from "../utils/constants";

interface AddItemDto {
  cartId: number;
  productId: number;
  quantity?: number;
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
