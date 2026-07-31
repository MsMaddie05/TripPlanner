import {useState} from "react";
import { useAuth } from "../AuthProvider";
import Button from "../miniComponents/Button";
import Input from "../miniComponents/Input"
import styles from './Login.module.css';

const Login = () => {
    const { setUser, login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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
                login(data.token);
            }
            else {
                window.alert("Email or password was not found. Please try again")
            }
        }
        catch (error){
            console.error(error, "Fetching user failed");
        }

    }

    return (
        <div className = {styles.pageWrapper}>
            <div className = {styles.loginContainer}>
                <h1 id = {styles["loginHeader"]}>Login</h1>
                <div className={styles.inputContainer}>
                    <Input type = "text" placeholder = {"Email"} value = {email} onChange = {setEmail}></Input>
                    <Input type = "password" placeholder = {"Password"} value = {password} onChange = {setPassword}></Input>
                    <Button theme="medium" onClick={onClickSubmit}>Submit</Button>
                </div>
                <a className={styles.link} href={"/signup"}>No account? Sign up</a>
            </div>
        </div>
    )
}

export default Login