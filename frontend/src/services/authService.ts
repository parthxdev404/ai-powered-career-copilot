import api from "./api";
import type { LoginData, RegisterData } from "../types/auth.types";

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};
export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
export const getUser = async () => {
  const response = await api.get("/auth/user");

  return response.data;
};

export const googleLogin = async (
  token: string
) => {
  const response = await api.post(
    "/auth/google",
    {
      token,
    }
  );

  return response.data;
};
