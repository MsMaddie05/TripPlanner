import {useState} from "react";
import styles from './Login.module.css';

interface LoginProps {
    setIsAuthenticated: Function;
}

const Login = ({ setIsAuthenticated } : LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className = {styles.pageWrapper}>
            <div className = {styles.loginContainer}>
                <h1 id = {styles["loginHeader"]}>Login</h1>
                <input type="text" className = {styles.loginInputs} id= "email" name="email" placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}}></input>
                <input type="password" className = {styles.loginInputs} id= "password" name="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}}></input>
                <button id = {styles["loginSubmitBtn"]}type="submit">Submit</button>
            </div>
        </div>
    )
}

export default Login