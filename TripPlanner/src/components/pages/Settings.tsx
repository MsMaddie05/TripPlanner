import { useAuth } from '../AuthProvider'
import styles from './Settings.module.css'
import Button from "../miniComponents/Button"

const Settings = () => {
    const { user, logout, token } = useAuth();

    const logOutClicked = () => {
        logout();
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
            <h1 id = {styles["settingsHeader"]}>Settings</h1>
            <div className={styles.credentialsContainer}>
                <div className = {styles.userCredentials}>
                    <div className={styles.title}>Credentials</div>
                    <div>Username: {user && user.username}</div>
                    <div>Email: {user && user.email}</div>
                </div>
            <div className={styles.changeCredentials}>
                <div className={styles.title}>Edit Credentials</div>
                <div className={styles.credentialsInputGrid}>
                    <input type="text" id="changeUsername" className={styles.changeInput} placeholder="Change Username"></input>
                    <Button theme="medium" onClick={()=>{}} >Submit</Button>
                    <input type="text" id="changeEmail" className={styles.changeInput} placeholder='Change Password'></input>
                    <Button theme="medium" onClick={()=>{}} >Submit</Button>
                </div>
            </div>
            </div>
            <div className = {styles.buttonContainer}>
                <Button theme="light" onClick={logOutClicked}>Logout</Button>
                <Button theme="dark" onClick={deleteClicked}>Delete Account</Button>
            </div>
        </div>
    )
}

export default Settings;