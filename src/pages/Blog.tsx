import { useQuery } from "react-query";
import { getOneBlog } from "../services/blogs";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";

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
        return ( <div>
            <BlogCard blog={query.data}/>
            <Link  to={"../../user/" + String(query.data?.user?.id)}>{query.data?.user?.username}</Link>
            {query.data.comments?.map(c => <div key={c.id}>{c.content}</div>)}
            {(!query.data.comments || query.data.comments.length == 0) && <div>No comments yet</div>} 
        </div> );
    }
    
}
 
export default Blog;