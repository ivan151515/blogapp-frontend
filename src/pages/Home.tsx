import { useQuery } from "react-query";
import { getBlogs } from "../services/blogs";
import BlogCard from "../components/BlogCard";
import { useUserValue } from "../context/UserContextHooks";
import { Link } from "react-router-dom";

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
        {query.data?.map(b => <BlogCard key={b.id} blog={b}/>)}
    </div> );
}
 
export default Home;