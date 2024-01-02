import axios from "axios";
import { Blog } from "../types/blog";

export const getBlogs = async () => {
    try {
        const response = await axios.get<Blog[]>("/blogs")

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getOneBlog = async (id: string) => {
    try {
        const response = await axios.get<Blog>("/blogs/"+id)

        return response.data;
    } catch (error) {
        console.error(error)
    }
}