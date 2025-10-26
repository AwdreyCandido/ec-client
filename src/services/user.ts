import { ValidationErrorResponse } from "../data/types/error-response";
import { User } from "../data/types/user";
import { API_URL } from "../utils/constants";

export interface UpdateUserDto {
  name: string;
  email: string;
  address: string;
}

export async function updateUser(
  id: number,
  updateUserDto: UpdateUserDto
): Promise<any> {
  try {
    const { data } = await API_URL.patch<User>(`/users/${id}`, updateUserDto);

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
