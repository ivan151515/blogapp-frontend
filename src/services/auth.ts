import axios from "axios";
interface AuthData  {
    username: string,
    password: string
}

export const register = async(data : AuthData) => {
    try {
        const response = await axios.post("/users", data);

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const login = async(data: AuthData) => {
    try {
        const response = await axios.post("/auth", data)

        return response.data
    } catch (error) {
        console.error(error)
    }
}