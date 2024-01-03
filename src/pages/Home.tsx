import { useQuery } from "react-query";
import { getBlogs } from "../services/blogs";
import BlogCard from "../components/BlogCard";
import { useUserValue } from "../context/UserContextHooks";
import { Link } from "react-router-dom";
import {  Stack } from "@mui/material";

const Home = () => {
    const user = useUserValue();

    const query = useQuery("blogs", getBlogs);

    if (query.isLoading) {
        return <h1>Loading...</h1>
    }

    return ( <div>
        {JSON.stringify(user)}
        <div>
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Log In</Link>
        </div>
        <Stack spacing={3} alignItems={"center"}>
            {query.data?.map(b => <BlogCard key={b.id} blog={b}/>)}
        </Stack>
    </div> );
}
 
export default Home;