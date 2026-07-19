import {useState} from "react";

interface LoginProps {
    setIsAuthenticated: Function;
}

const Login = ({ setIsAuthenticated } : LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1>Login</h1>
            <input type="text" id="email" name="email" placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}}></input>
            <input type="password" id="password" name="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}}></input>
            <button type="submit">Submit</button>
        </div>
    )
}

export default Login