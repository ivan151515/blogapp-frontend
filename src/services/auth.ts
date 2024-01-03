import axios from "axios";
interface AuthData  {
    username: string,
    password: string
}

interface LoginResponse {
    token: string,
    id: number,
    username: string
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
        const response = await axios.post<LoginResponse>("/auth", data)

        return response.data
    } catch (error) {
        console.error(error)
    }
}