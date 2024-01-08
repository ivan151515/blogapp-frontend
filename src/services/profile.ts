import { UpdateProfile } from "../types/profile";
import axios from "axios";
import { User } from "../types/user";
export const getUserProfile = async (id: string) => {
  try {
    const response = await axios.get<User>("/users/" + id);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserProfile = async (data: UpdateProfile) => {
  try {
    const response = await axios.put("/users/" + data.id, data, {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
