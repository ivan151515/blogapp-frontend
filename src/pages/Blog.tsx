import { useQuery } from "react-query";
import { getOneBlog } from "../services/blogs";
import { useParams, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import CommentCard from "../components/CommentCard";
import AddCommentForm from "../components/AddCommentForm";
import { Grid } from "@mui/material";

//TODO: REMOVE PASSWORD FROM GET BLOGS RESPONSE
const Blog = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    if (!id) {
        navigate("/")
    }
    const query = useQuery(["blog", id], () => getOneBlog(id as string));
    
    if (query.isLoading) {
        return <div>Loading....</div>
    }
    if (query.data) {
        return ( <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            sx={{ minHeight: '100vh',
                marginTop: "45px"
            }}>
            <BlogCard blog={query.data}/>
            {query.data.comments?.map(c => <CommentCard comment={c}/>)}
            {(!query.data.comments || query.data.comments.length == 0) && <div>No comments yet</div>} 
            <AddCommentForm />

        </Grid> );
    }
    
}
 
export default Blog;