import axios from "axios";

import { API_PATH } from "../utils/constants";

const API_URL = axios.create({
  baseURL: API_PATH,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
    "Content-Type": "application/json",
  },
});

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface Cart {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  cart: Cart;
  name: string;
  email: string;
  address: string | null;
  role: string;
}

export interface ValidationErrorResponse {
  message: string | string[];
  statusCode: number;
  error?: string;
}

export async function loginUser(loginDto: LoginDto): Promise<any> {
  try {
    const { data } = await API_URL.post<User>(`/auth/login`, loginDto);

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

export async function registerUser(registerDto: RegisterDto): Promise<any> {
  try {
    const { data } = await API_URL.post<User>(`/auth/register`, registerDto);

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
