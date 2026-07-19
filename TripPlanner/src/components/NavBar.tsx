import { useNavigate, useLocation } from "react-router-dom";
import styles from './NavBar.module.css';
import clsx from "clsx";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleHomeClick = () => {
        navigate("/home");
    }

    const handleSettingsClick = () => {
        navigate("/settings");
    }

    const handleCreateTripClick = () => {
        navigate("/createtrip");
    }
    const handleExploreClick = () => {
        navigate("/explore");
    }
    const handleProfileClick = () => {
        navigate("/profile");
    }

    return (
        <div className = {styles.buttonContainer}>
            <button className = {clsx(styles.button, {[styles.active]: location.pathname === "/home"})} onClick={handleHomeClick}>Home</button>
            <button className = {clsx(styles.button, {[styles.active]: location.pathname === "/createtrip"})} onClick={handleCreateTripClick}>Create Trip</button>
            <button className = {clsx(styles.button, {[styles.active]: location.pathname === "/explore"})} onClick={handleExploreClick}>Explore</button>
            <button className = {clsx(styles.button, styles.rightFloat, {[styles.active]: location.pathname === "/profile"})} onClick={handleProfileClick}>Profile</button>
            <button className = {clsx(styles.button, {[styles.active]: location.pathname === "/settings"})} onClick={handleSettingsClick}>Settings</button>
        </div>
    )
}

export default NavBar;