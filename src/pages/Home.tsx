import { useQuery } from "react-query";
import { getBlogs } from "../services/blogs";
import BlogCard from "../components/BlogCard";
import { useUserValue } from "../context/UserContextHooks";
import {  Stack } from "@mui/material";
import AddBlogPostForm from "../components/AddBlogPostForm";
import { Link } from "react-router-dom";

const Home = () => {
    const user = useUserValue();

    const query = useQuery("blogs", getBlogs);

    if (query.isLoading) {
        return <h1>Loading...</h1>
    }

    return ( <div>
        {user.isAuthenticated ? <AddBlogPostForm /> : <><p>Want to publish a post?</p><Link to={"/login"}>Log In</Link></>}
        <Stack spacing={3} alignItems={"center"}>
            {query.data?.map(b => <BlogCard key={b.id} blog={b}/>)}
        </Stack>
    </div> );
}
 
export default Home;