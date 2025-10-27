import { ValidationErrorResponse } from "../data/types/error-response";
import { API_URL } from "../utils/constants";

interface StripeResponse {
  clientSecret: string;
}

export async function createPaymentIntent(value: {
  amount: number;
}): Promise<any> {
  try {
    const { data } = await API_URL.post<StripeResponse>(
      `/stripe/create-payment-intent`,
      value
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
