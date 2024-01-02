import { useQuery } from "react-query";
import { getOneBlog } from "../services/blogs";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//TODO: REMOVE PASSWORD FROM GET BLOGS RESPONSE
const Blog = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    if (!id) {
        navigate("/")
    }
    const query = useQuery("blog", () => getOneBlog(id as string));
    
    if (query.isLoading) {
        return <div>Loading....</div>
    }
    return ( <div>
        <Link  to={"../../user/" + String(query.data?.user?.id)}>{query.data?.user?.username}</Link>
        {JSON.stringify(query.data)}
        
    </div> );
}
 
export default Blog;