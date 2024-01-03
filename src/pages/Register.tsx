import { Button, TextField } from "@mui/material";
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
    const [error, setError] = useState("")
    const mutation = useMutation({
        mutationFn: () => register({username: username.value, password: password.value, name: name.value}),
        onError(error) {
            setError("Something went wrong")
            console.log(error)
        },
        onSuccess(data) {
            if (data) {
                navigate("/login")
                username.reset()
                password.reset()
                name.reset()
                confirmPassword.reset()
                password.reset()
            }   
        },
    })
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        if (password.value !== confirmPassword.value) {
            setError("Passwords must be equal");
            setTimeout(() => {
                setError("");
            }, 1500)
            return
        } else if (username.value.length < 4 || name.value.length < 4 || password.value.length < 8) {
            setError("Password must be minimum 8 characters long, name and username minimum 4 characters long")
        }
         else  {
            mutation.mutate()
           
        //TODO: CHECK IF CONFIRM PASSWORD AND PASSWORD ARE EQUAL
        
    }
}
    if (user.isAuthenticated) {
        return <Navigate to={"/"} replace={true}/>
    }
    return ( <div>
        <h1>Register</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <TextField onChange={username.onChange} value={username.value} id="standard-basic" label="Username" variant="standard" />
            <TextField onChange={name.onChange} value={name.value} id="standard-basic" label="Name" variant="standard" />
            <TextField onChange={password.onChange} type="password" value={password.value} id="standard-basic" label="Password" variant="standard"/>
            <TextField onChange={confirmPassword.onChange} type="password" value={confirmPassword.value} id="standard-basic" label="Confirm Password" variant="standard" />
            <Button type="submit">Register</Button>
        </form>
        <p>Already have an account? <Link to={"/login"}>Log In</Link></p>
    </div> );
}
 
export default Register;