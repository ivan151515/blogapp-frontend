import { Blog } from "../types/blog";
import { Link } from "react-router-dom";
interface props {
    blog: Blog;
}

const BlogCard = ({blog}: props) => {
    return ( <div>
        <Link to={"user/"+ blog.userId}>
            {blog.user?.username}
        </Link>
        <Link to={"blog/"+ blog.id}>
            {blog.content}
        </Link>
    </div> );
}
 
export default BlogCard;