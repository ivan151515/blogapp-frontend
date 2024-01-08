import { Button, TextField } from "@mui/material";
import { useTextField } from "../hooks/useTextField";
import { useMutation, useQueryClient } from "react-query";
import { useUserValue } from "../context/UserContextHooks";
import { addComment } from "../services/comment";
import { useParams } from "react-router-dom";

interface Props {
    handleClose : () => void;
}

const CommentPostForm = ({handleClose}: Props) => {
    const content = useTextField()
    const queryClient = useQueryClient()
    const {id} = useParams()
    const user = useUserValue()


    const mutation = useMutation({
        mutationFn: () => addComment(content.value, Number(id), user.token ),
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({predicate: query =>
                (query.queryKey[0] == "blog")
          })
        },
        onError(error, variables, context) {
            console.log(error, variables, context)
        },
    })
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (content.value.trim().length > 0) {
            mutation.mutate()
            
        }
        handleClose()
    }
    return ( <form onSubmit={handleSubmit}>
        <TextField sx={{maxHeight: "120px"}} fullWidth multiline minRows={3} onChange={content.onChange} value={content.value} id="standard-basic" label="What do you think?" variant="standard" />
        <Button color="success" type="submit">Comment</Button>
    </form> );
}
 
export default CommentPostForm;