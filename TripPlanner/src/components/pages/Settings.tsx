import { useState } from 'react'
import { useAuth } from '../AuthProvider'
import styles from './Settings.module.css'
import Button from "../miniComponents/Button"
import Input from "../miniComponents/Input"
import ProfilePic from '../miniComponents/ProfilePic'
import Dropdown from '../miniComponents/Dropdown'

const Settings = () => {
    const { user, setUser, login, logout, token } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState(user ? user.profile : "img1")

    const logOutClicked = () => {
        logout();
    }

    const profilePics = [{name: "Yosemite Mountain", id: "img1"}, {name: "Sunset Mountain", id: "img2"}, {name: "Snowy Mountain", id: "img3"}, {name: "Flower Fields", id: "img4"}, {name: "Pink Art", id: "img5"}, {name: "Ocean", id: "img6"}];

    async function editUsername() {
        try{
            const response = await fetch("http://localhost:5000/changeUsername",{
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username})
                }
            )

            const data = await response.json();
            console.log(data);

            if(data.message == "changed user"){
                console.log("inside success statement")
                setUser(data.user);
                login(data.token);

                setUsername("");
            }
            else if(data.message == "user taken"){
                console.log("inside user taken statement")
                window.alert("Username already taken");
            }
            else{
                console.log("inside logout statement")
                logout();
            }
        }
        catch(error){
            console.error(error, "Error in chaning username");
        }
    }

    async function editPassword() {
        try{
            const response = await fetch("http://localhost:5000/changePassword",{
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password})
                }
            )

            const data = await response.json();
            console.log(data);

            if(data.message == "changed password"){
                console.log("inside success statement")
                setPassword("");
            }
            else{
                console.log("inside logout statement")
                logout();
            }
        }
        catch(error){
            console.error(error, "Error in chaning username");
        }
    }

    async function saveOnClicked(){
        try{
            const response = await fetch("http://localhost:5000/savePic", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({profilePic})
            })

            const data = await response.json();
            console.log(data);

            if(data.message == "changed user"){
                setUser(data.user);
                window.alert("Saved profile picture!");
            }
            else{
                logout();
            }
        }
        catch(error){
            console.error(error, "Failed to save new profile pic");
        }
    }

    async function deleteClicked() {
        const result = window.confirm("WARNING: Are you sure you want to delete your account?")

        if (result) {
            const response = await fetch("http://localhost:5000/deleting", {
                headers: {"Authorization": `Bearer ${token}`}
            });

            if (response.ok) {
                logout();
            }
            else {
                console.error("Error in deleting account");
            }
        }
    }

    return (
        <div className = {styles.settingsContainer}>
            <div className={styles.topHeader}>
                <h1 id = {styles["settingsHeader"]}>Settings</h1>
                <ProfilePic imgName={profilePic} size={50} />            
            </div>
            <div className={styles.credentialsContainer}>
                <div className = {styles.userCredentials}>
                    <div className={styles.title}>Credentials</div>
                    <div>Username: {user && user.username}</div>
                    <div>Email: {user && user.email}</div>
                </div>
                <div className={styles.changeCredentials}>
                    <div className={styles.title}>Edit Credentials</div>
                    <div className={styles.credentialsInputGrid}>
                        <Input type = "text" placeholder = "Change Username" value = {username} onChange = {setUsername}></Input>
                        <Button theme="medium" onClick={editUsername} >Submit</Button>
                        <Input type = "password" placeholder = "Change Password" value = {password} onChange = {setPassword}></Input>
                        <Button theme="medium" onClick={editPassword}>Submit</Button>
                    </div>
                </div>
            </div>
            <div className = {styles.editProfilePicContainer}>
                <div className ={styles.title}>Edit Profile Pic:</div>
                <Dropdown setter={setProfilePic} name="Pic Options" closes={false} options={profilePics} />
                <Button theme = "dark" onClick={saveOnClicked}>Save</Button>
            </div>
            <div className = {styles.buttonContainer}>
                <Button theme="light" onClick={logOutClicked}>Logout</Button>
                <Button theme="dark" onClick={deleteClicked}>Delete Account</Button>
            </div>
        </div>
    )
}

export default Settings;