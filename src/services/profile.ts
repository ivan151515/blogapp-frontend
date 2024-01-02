import { Profile } from "../types/profile"
import axios from "axios"
export const getUserProfile = async (id: string) => {
    try {
        const response = await axios.get<Profile>("/users/"+ id)

        return response.data;
    } catch (error) {
        console.error(error)
    }
}