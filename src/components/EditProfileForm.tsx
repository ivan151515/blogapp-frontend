import { Button, TextField } from "@mui/material";
import { useTextField } from "../hooks/useTextField";
import { useMutation, useQueryClient } from "react-query";
import { useUserValue } from "../context/UserContextHooks";
import { updateUserProfile } from "../services/profile";
import { UpdateProfile } from "../types/profile";

interface Props {
  handleClose: () => void;
}

const EditProfileForm = ({ handleClose }: Props) => {
  const bio = useTextField();
  const age = useTextField();
  const occupation = useTextField();
  const queryClient = useQueryClient();
  const user = useUserValue();
  const mutation = useMutation(
    (data: UpdateProfile) => updateUserProfile(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile", String(user.id)]);
      },
    },
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: UpdateProfile = {
      id: user.id,
      token: user.token,
    };
    if (bio.value.trim().length > 0) {
      data.bio = bio.value;
      bio.reset();
    }
    if (age.value.trim().length > 0) {
      data.age = Number(age.value);
      age.reset();
    }
    if (occupation.value.trim().length > 0) {
      data.occupation = occupation.value;
      occupation.reset();
    }
    mutation.mutate(data);

    handleClose();
  };
  if (mutation.isLoading) {
    console.log(mutation.isLoading);
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        multiline
        minRows={3}
        onChange={bio.onChange}
        value={bio.value}
        id="standard-basic"
        label="Write something about yourself"
        variant="standard"
      />
      <TextField
        margin="normal"
        fullWidth
        onChange={age.onChange}
        value={age.value}
        id="standard-basic"
        label="How old are you?"
        variant="standard"
      />
      <TextField
        margin="normal"
        fullWidth
        onChange={occupation.onChange}
        value={occupation.value}
        id="standard-basic"
        label="What do you do for work?"
        variant="standard"
      />
      <Button disabled={mutation.isLoading} color="success" type="submit">
        Update
      </Button>
    </form>
  );
};

export default EditProfileForm;
