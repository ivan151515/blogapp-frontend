import { Button, TextField, Typography } from "@mui/material";
import { useTextField } from "../hooks/useTextField";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../services/auth";

const LogIn = () => {
    const username = useTextField();   
    const password = useTextField();

    const mutation = useMutation({
        mutationFn: () => login({username: username.value, password: password.value}),
        onSuccess(data, variables, context) {
            console.log(data,variables, context)
        },
        onError(error, variables, context) {
            console.log(error, variables, context)
        },
    })

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=> {
        
        e.preventDefault()
        mutation.mutate()
        username.reset()
        password.reset()
        console.log("SUBMIT")
    }
    return ( <div>
        <Typography>
        Log In
        </Typography>
        <form onSubmit={handleSubmit}>
            <TextField onChange={username.onChange} value={username.value} id="standard-basic" label="Username" variant="standard" />
            <TextField onChange={password.onChange} value={password.value} id="standard-basic" label="Password" variant="standard" />
            <Button type="submit">Log In</Button>
        </form>
        <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
    </div> );
}
 
export default LogIn;