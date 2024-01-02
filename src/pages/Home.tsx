import { useQuery } from "react-query";
import { getBlogs } from "../services/blogs";
import BlogCard from "../components/BlogCard";

const Home = () => {


    const query = useQuery("blogs", getBlogs);

    if (query.isLoading) {
        return <h1>Loading...</h1>
    }

    return ( <div>
        {query.data?.map(b => <BlogCard key={b.id} blog={b}/>)}
    </div> );
}
 
export default Home;