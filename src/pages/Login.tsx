import { Button, TextField, Typography } from "@mui/material";
import { useTextField } from "../hooks/useTextField";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../services/auth";
import { useAuthDispatch, useUserValue } from "../context/UserContextHooks";
import { Action } from "../context/UserContext";
import {  useState } from "react";

const LogIn = () => {
    const user = useUserValue() 
    const navigate = useNavigate();
    
    const username = useTextField();   
    const password = useTextField();
    const dispatch = useAuthDispatch() as React.Dispatch<Action>
    
    const [error, setError] = useState("");
    const mutation = useMutation({
        mutationFn: () => login({username: username.value, password: password.value}),
        onSuccess(data) {
            if (data) {
                dispatch({type: "LOG_IN", payload: data})
                window.localStorage.setItem("auth_token", data.token)
                username.reset()
                password.reset()
                navigate("/");
            }

        },
        onError(error, variables, context) {
            setError("Incorrect credentials")
            console.log(error, variables, context)
        },
    })

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=> {
        
        e.preventDefault()
        mutation.mutate()
        
    }
    if (user.isAuthenticated) {
        return <Navigate to={"/"} replace={true}/>
    }
    return (
        
        <div>
        <Typography>
        Log In
        </Typography>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <TextField onChange={username.onChange} value={username.value} id="standard-basic" label="Username" variant="standard" />
            <TextField type="password" onChange={password.onChange} value={password.value} id="standard-basic" label="Password" variant="standard" />
            <Button type="submit">Log In</Button>
        </form>
        <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
    </div> );
}
 
export default LogIn;