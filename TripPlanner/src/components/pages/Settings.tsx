import { useAuth } from '../AuthProvider'
import styles from './Settings.module.css'

const Settings = () => {
    const { user, logout } = useAuth();

    const logOutClicked = () => {
        logout();
    }

    return (
        <div className = {styles.settingsContainer}>
            <h1 id = {styles["settingsHeader"]}>Settings</h1>
            <div className = {styles.userCredentials}>
                <div>Username: {user && user.username}</div>
                <div>Email: {user && user.email}</div>
            </div>
        
            <button id = {styles["settingsLogOut"]} onClick={logOutClicked}>Log Out</button>
        </div>
    )
}

export default Settings;