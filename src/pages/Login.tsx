import { Button, Grid, TextField, Typography } from "@mui/material";
import { useTextField } from "../hooks/useTextField";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../services/auth";
import { useAuthDispatch, useUserValue } from "../context/UserContextHooks";
import { Action } from "../context/UserContext";
import { useState } from "react";

const LogIn = () => {
  const user = useUserValue();
  const navigate = useNavigate();

  const username = useTextField();
  const password = useTextField();
  const dispatch = useAuthDispatch() as React.Dispatch<Action>;

  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: () =>
      login({ username: username.value, password: password.value }),
    onSuccess(data) {
      if (data) {
        dispatch({ type: "LOG_IN", payload: data });
        window.localStorage.setItem("auth_token", data.token);
        username.reset();
        password.reset();
        navigate("/");
      }
    },
    onError(error, variables, context) {
      setError("Incorrect credentials");
      setTimeout(() => {
        setError("")
      }, 2000)
      console.log(error, "error", variables, context);
    },
    
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };
  if (user.isAuthenticated) {
    return <Navigate to={"/"} replace={true} />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          sx={{ minHeight: "100vh", marginTop: "45px" }}
        >
          {error && <Typography color={"red"} variant="body2">{error}</Typography>}
          <Typography variant="h4">Log In</Typography>
          <TextField
            sx={{ width: "33%", margin: "10px", minWidth: "125px" }}
            onChange={username.onChange}
            value={username.value}
            id="standard-basic"
            label="Username"
            variant="standard"
          />
          <TextField
            sx={{ width: "33%", margin: "10px", minWidth: "125px" }}
            type="password"
            onChange={password.onChange}
            value={password.value}
            id="standard-basic"
            label="Password"
            variant="standard"
          />
          <Button id="login-button" type="submit">Log In</Button>
          <Typography sx={{ marginTop: "15px" }}>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </Typography>
        </Grid>
      </form>
    </div>
  );
};

export default LogIn;
