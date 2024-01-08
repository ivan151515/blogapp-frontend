import axios from "axios";
import { User } from "../types/user";
interface AuthData {
  username: string;
  password: string;
  name?: string;
}

interface LoginResponse {
  token: string;
  id: number;
  username: string;
}
interface TokenVerifyData {
  id: number;
  username: string;
}
export const register = async (data: AuthData) => {
  console.log(data);
  try {
    const response = await axios.post<User>("/users", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (data: AuthData) => {
  try {
    const response = await axios.post<LoginResponse>("/auth", data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const verifyToken = async (token: string) => {
  try {
    const response = await axios.get<TokenVerifyData>("/auth", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
