import { useQuery } from "react-query";
import { getOneBlog } from "../services/blogs";
import { useParams, useNavigate } from "react-router-dom";
import BlogCard from "../components/blog/BlogCard";
import CommentCard from "../components/comment/CommentCard";
import AddCommentForm from "../components/comment/AddCommentForm";
import { Grid, Typography } from "@mui/material";
import { useUserValue } from "../context/UserContextHooks";
import { Link } from "react-router-dom";

//TODO: REMOVE PASSWORD FROM GET BLOGS RESPONSE
const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate("/");
  }
  const query = useQuery(["blog", id], () => getOneBlog(id as string));
  const user = useUserValue()
  if (query.isLoading) {
    return <div>Loading....</div>;
  }
  if (query.data) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ minHeight: "100vh", marginTop: "45px" }}
      >
        <BlogCard blog={query.data} />
        {query.data.comments?.map((c) => <CommentCard comment={c} />)}
        {(!query.data.comments || query.data.comments.length == 0) && (
          <Typography variant="body2">No comments yet</Typography>
        )}
        {user.isAuthenticated ? (<AddCommentForm />) : (<Typography sx={{ margin: "15px" }}>
          Want to say something? <Link to={"/login"}>Log In</Link>
        </Typography>)}
      </Grid>
    );
  }
};

export default Blog;
