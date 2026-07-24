import styles from "./SignUp.module.css"
import { useState } from 'react';


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className = {styles.pageWrapper}>
            <div className = {styles.signUpContainer}>
                <h1 id = {styles["signUpHeader"]}>Sign Up</h1>
                <input type="text" className = {styles.signUpInputs} id= "email" name="email" placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}}></input>
                <input type="text" className = {styles.signUpInputs} id= "username" name="username" placeholder="Username" onChange={(e)=> {setUsername(e.target.value)}}></input>
                <input type="password" className = {styles.signUpInputs} id= "password" name="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}}></input>
                <button id = {styles["signUpSubmitBtn"]}type="submit">Submit</button>
            </div>
        </div>
    )
}

export default SignUp;