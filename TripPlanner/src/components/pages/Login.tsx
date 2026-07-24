import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import styles from './Login.module.css';


const Login = () => {
    const { setUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function onClickSubmit() {
        try{
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            const data = await response.json();
            console.log(data.user);

            if (data.found) {
                setUser(data.user);
                navigate('/home');
            }
            else {
                window.alert("Email or password was not found. Please try again")
            }
        }
        catch (error){
            console.error("Fetching user failed");
        }

    }

    return (
        <div className = {styles.pageWrapper}>
            <div className = {styles.loginContainer}>
                <h1 id = {styles["loginHeader"]}>Login</h1>
                <input type="text" className = {styles.loginInputs} id= "email" name="email" placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}}></input>
                <input type="password" className = {styles.loginInputs} id= "password" name="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}}></input>
                <button id = {styles["loginSubmitBtn"]} type="submit" onClick={onClickSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Login