import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

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
        <div>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleCreateTripClick}>Create Trip</button>
            <button onClick={handleExploreClick}>Explore</button>
            <button onClick={handleProfileClick}>Profile</button>
            <button onClick={handleSettingsClick}>Settings</button>
        </div>
    )
}

export default NavBar;