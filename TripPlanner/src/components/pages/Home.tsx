import { useAuth } from "../AuthProvider";

const Home = () => {
    const { user } = useAuth();


    return (
        <div>Homepage hello {user && user.username}!</div>
    )
}

export default Home;