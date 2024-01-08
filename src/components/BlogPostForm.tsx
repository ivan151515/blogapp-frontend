import { Button, TextField } from "@mui/material";
import { useTextField } from "../hooks/useTextField";
import { useMutation, useQueryClient } from "react-query";
import { publishBlog } from "../services/blogs";
import { useUserValue } from "../context/UserContextHooks";

interface Props {
  handleClose: () => void;
}

const BlogPostForm = ({ handleClose }: Props) => {
  const content = useTextField();
  const queryClient = useQueryClient();
  const user = useUserValue();
  const mutation = useMutation({
    mutationFn: () =>
      publishBlog({ content: content.value, important: true }, user.token),
    onSuccess: () =>
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey === "blogs" ||
          (query.queryKey[0] == "profile" &&
            query.queryKey[1] === String(user.id)),
      }),
    onError(error, variables, context) {
      console.log(error, variables, context);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.value.trim().length > 0) {
      mutation.mutate();
    }
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        multiline
        minRows={5}
        onChange={content.onChange}
        value={content.value}
        id="standard-basic"
        label="What's on your mind?"
        variant="standard"
      />
      <Button color="success" type="submit">
        Publish
      </Button>
    </form>
  );
};

export default BlogPostForm;
