import { useQuery } from "react-query";
import { getBlogs } from "../services/blogs";
import BlogCard from "../components/BlogCard";
import { useUserValue } from "../context/UserContextHooks";
import { Stack, Typography } from "@mui/material";
import AddBlogPostForm from "../components/AddBlogPostForm";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useUserValue();

  const query = useQuery("blogs", getBlogs);

  if (query.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Stack margin={2} spacing={2} alignItems={"center"}>
      {user.isAuthenticated ? (
        <AddBlogPostForm />
      ) : (
        <Typography sx={{ margin: "300px" }}>
          Want to publish a post? <Link to={"/login"}>Log In</Link>
        </Typography>
      )}
      {query.data?.map((b) => <BlogCard key={b.id} blog={b} />)}
    </Stack>
  );
};

export default Home;
