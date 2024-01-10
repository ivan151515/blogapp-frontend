import { Button, Grid, TextField, Typography } from "@mui/material";
import { useTextField } from "../hooks/useTextField";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { register } from "../services/auth";
import { useUserValue } from "../context/UserContextHooks";
import { useState } from "react";

const Register = () => {
  const username = useTextField();
  const name = useTextField();
  const password = useTextField();
  const navigate = useNavigate();
  const confirmPassword = useTextField();
  const user = useUserValue();
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: () =>
      register({
        username: username.value,
        password: password.value,
        name: name.value,
      }),
    onError(error) {
      setError("Something went wrong");
      console.log(error);
    },
    onSuccess(data) {
      if (data) {
        navigate("/login");
        username.reset();
        password.reset();
        name.reset();
        confirmPassword.reset();
        password.reset();
      }
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
      setError("Passwords must be equal");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    } else if (
      username.value.length < 4 ||
      name.value.length < 4 ||
      password.value.length < 8
    ) {
      setError(
        "Password must be minimum 8 characters long, name and username minimum 4 characters long",
      );
    } else {
      mutation.mutate();

      //TODO: CHECK IF CONFIRM PASSWORD AND PASSWORD ARE EQUAL
    }
  };
  if (user.isAuthenticated) {
    return <Navigate to={"/"} replace={true} />;
  }
  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          sx={{ minHeight: "100vh", marginTop: "45px" }}
        >
          <Typography variant="h4">Register</Typography>
          <TextField
            sx={{ width: "33%", margin: "10px", minWidth: "125px" }}
            onChange={username.onChange}
            value={username.value}
            id="username"
            label="Username"
            variant="standard"
          />
          <TextField
            sx={{ width: "33%", margin: "10px", minWidth: "125px" }}
            onChange={name.onChange}
            value={name.value}
            id="name"
            label="Name"
            variant="standard"
          />
          <TextField
            sx={{ width: "33%", margin: "10px", minWidth: "125px" }}
            onChange={password.onChange}
            type="password"
            value={password.value}
            id="password"
            label="Password"
            variant="standard"
          />
          <TextField
            sx={{ width: "33%", margin: "10px", minWidth: "125px" }}
            onChange={confirmPassword.onChange}
            type="password"
            value={confirmPassword.value}
            id="confirm-password"
            label="Confirm Password"
            variant="standard"
          />
          <Button type="submit">Register</Button>
          <Typography>
            Already have an account? <Link to={"/login"}>Log In</Link>
          </Typography>
        </Grid>
      </form>
    </div>
  );
};

export default Register;
