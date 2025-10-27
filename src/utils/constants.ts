import axios from "axios";

export const API_PATH = "https://ec-api-production.up.railway.app";
// export const API_PATH = "http://localhost:3000";

export const API_URL = axios.create({
  baseURL: API_PATH,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
    "Content-Type": "application/json",
  },
});
