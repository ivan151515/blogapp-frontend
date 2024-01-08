import axios from "axios";
import { Blog } from "../types/blog";

export const getBlogs = async () => {
  try {
    const response = await axios.get<Blog[]>("/blogs");

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOneBlog = async (id: string) => {
  try {
    const response = await axios.get<Blog>("/blogs/" + id);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const publishBlog = async (data: Blog, token: string) => {
  try {
    const res = await axios.post<Blog>("/blogs", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.error();
  }
};

export const deleteBlog = async (id: number, token: string) => {
  try {
    await axios.delete("/blogs/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
