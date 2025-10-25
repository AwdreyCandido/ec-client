import axios from "axios";

export const API_PATH = "http://127.0.0.1:3000";

export const API_URL = axios.create({
  baseURL: API_PATH,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
    "Content-Type": "application/json",
  },
});
