import { useState } from 'react'
import { useAuth } from '../AuthProvider'
import styles from './Settings.module.css'
import Button from "../miniComponents/Button"
import Input from "../miniComponents/Input"
import ProfilePic from '../miniComponents/ProfilePic'
import clsx from 'clsx';

const Settings = () => {
    const { user, setUser, login, logout, token } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState(user ? user.profile : "img1")
    const [showList, setShowList] = useState(false);

    const logOutClicked = () => {
        logout();
    }

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

    const onClickViewOptions = () => {
        setShowList(!showList);
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
                <div className = {styles.dropDownContainer}>
                    <div id = {styles.viewOptionsContainer} onClick = {onClickViewOptions}>View Options</div>
                    <div className = {clsx(styles.listContainer, {[styles.hidden]: showList})} onClick = {()=> {}}>
                        <li className = {styles.listItem} onClick = {() => setProfilePic("img1")}>Yosemite Moutain</li>
                        <li className = {styles.listItem} onClick = {() => setProfilePic("img2")}>Sunset Mountain</li>
                        <li className = {styles.listItem} onClick = {() => setProfilePic("img3")}>Snowy Mountain</li>
                        <li className = {styles.listItem} onClick = {() => setProfilePic("img4")}>Flower Fields</li>
                        <li className = {styles.listItem} onClick = {() => setProfilePic("img5")}>Pink Art</li>
                        <li className = {styles.listItem} onClick = {() => setProfilePic("img6")}>Ocean</li>
                    </div>
                </div>
                <Button theme = "dark" onClick={()=>{}}>Save</Button>
            </div>
            <div className = {styles.buttonContainer}>
                <Button theme="light" onClick={logOutClicked}>Logout</Button>
                <Button theme="dark" onClick={deleteClicked}>Delete Account</Button>
            </div>
        </div>
    )
}

export default Settings;