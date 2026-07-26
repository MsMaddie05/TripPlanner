import { useAuth } from '../AuthProvider'

const Settings = () => {
    const { logout } = useAuth();

    const logOutClicked = () => {
        logout();
    }

    return (
        <div>
            <h1>Settings~</h1>
            <button onClick={logOutClicked}>Log Out</button>
        </div>
    )
}

export default Settings;