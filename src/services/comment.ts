import axios from "axios";

export const addComment = async(content: string, blogId: number, token: string) => {
    try {
        const res = await axios.post("/api/blogs/"+blogId, {content}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteComment = async(blogId: number, token: string, commentId: number) => {
    try {
        await axios.delete("/api/blogs/"+ blogId + "/comments/" + commentId, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    } catch (error) {
        console.error(error)
    }
}