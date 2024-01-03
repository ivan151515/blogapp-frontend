import { Button, TextField } from "@mui/material";
import { useTextField } from "../hooks/useTextField";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "react-query";
import { register } from "../services/auth";
import { useUserValue } from "../context/UserContextHooks";

const Register = () => {
    const username = useTextField();   
    const password = useTextField();
    const confirmPassword = useTextField();
    const user = useUserValue();
    const mutation = useMutation({
        mutationFn: () => register({username: username.value, password: password.value}),
        onError(error, variables, context) {
            console.log(error, variables, context)
        },
        onSuccess(data, variables, context) {
            console.log(data, variables, context)
        },
    })
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        //TODO: CHECK IF CONFIRM PASSWORD AND PASSWORD ARE EQUAL
        mutation.mutate()
        username.reset()
        password.reset()
        confirmPassword.reset()
        console.log("SUBMIT")
    }
    if (user.isAuthenticated) {
        return <Navigate to={"/"} replace={true}/>
    }
    return ( <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <TextField onChange={username.onChange} value={username.value} id="standard-basic" label="Username" variant="standard" />
            <TextField onChange={password.onChange} value={password.value} id="standard-basic" label="Password" variant="standard" />
            <TextField onChange={confirmPassword.onChange} value={confirmPassword.value} id="standard-basic" label="Confirm Password" variant="standard" />
            <Button type="submit">Register</Button>
        </form>
        <p>Already have an account? <Link to={"/login"}>Log In</Link></p>
    </div> );
}
 
export default Register;