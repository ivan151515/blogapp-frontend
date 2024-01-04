import { Button, TextField } from "@mui/material";
import { useTextField } from "../hooks/useTextField";
import { useMutation, useQueryClient } from "react-query";
import { publishBlog } from "../services/blogs";
import { useUserValue } from "../context/UserContextHooks";
import { Blog } from "../types/blog";

interface Props {
    handleClose : () => void;
}

const BlogPostForm = ({handleClose}: Props) => {
    const content = useTextField()
    const queryClient = useQueryClient()
    const user = useUserValue()
    const mutation = useMutation({
        mutationFn: () => publishBlog({content: content.value, important: true}, user.token),
        onSuccess(data, variables, context) {
            const previousBlogs = queryClient.getQueryData<Blog[]>("blogs");

            if (data) {
                let newBlogs = [data];
                if (previousBlogs != undefined) {
                    newBlogs = newBlogs.concat(previousBlogs);
                }
                queryClient.setQueryData("blogs", newBlogs);
                console.log(data, variables, context)
            }
            
        },
        onError(error, variables, context) {
            console.log(error, variables, context)
        },
    })
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (content.value.trim().length > 0) {
            //TODO: CORRECT BELOW VALUES, PUT IN JUST TO STOP THE ERRORS
            mutation.mutate()
            
        }
        handleClose()
    }
    return ( <form onSubmit={handleSubmit}>
        <TextField fullWidth multiline minRows={5} onChange={content.onChange} value={content.value} id="standard-basic" label="What's on your mind?" variant="standard" />
        <Button color="success" type="submit">Publish</Button>
    </form> );
}
 
export default BlogPostForm;