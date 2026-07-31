import styles from "./SignUp.module.css"
import { useState } from 'react';
import { useAuth } from '../AuthProvider';
import Button from "../miniComponents/Button";
import Input from "../miniComponents/Input"

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser, login } = useAuth();

    async function onSubmit() {
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, username, password})
            })

            const data = await response.json();

            console.log(data)

            if (data.success == true) {
                setUser(data.user);
                login(data.token);
            }
            else {
                window.alert("This username or email is taken, please try again.");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className = {styles.pageWrapper}>
            <div className = {styles.signUpContainer}>
                <h1 id = {styles["signUpHeader"]}>Sign Up</h1>
                <div className = {styles.inputContainer}>
                    <Input type = "text" placeholder = "Email" value = {email} onChange = {setEmail}></Input>
                    <Input type = "text" placeholder = "Username" value = {username} onChange = {setUsername}></Input>
                    <Input type = "password" placeholder = "Password" value = {password} onChange = {setPassword}></Input>
                    <Button theme="medium" onClick={onSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;