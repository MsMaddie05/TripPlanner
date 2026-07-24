import { useAuth, type User } from "./AuthProvider";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from 'react-router-dom';

import NavBar from "./NavBar"
import Home from "./pages/Home"
import CreateTrip from "./pages/CreateTrip";
import ExploreTrips from "./pages/ExploreTrips";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

interface ProtectedRouteProps {
  isUser: User | null;
}

const ProtectedRoute = ({ isUser } : ProtectedRouteProps ) => {
  if (!isUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

function Routing() {
  const { user }= useAuth();

  return (
    <>
        <Router>
            {user && (<div>
                <NavBar />
                </div>)
            }
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route element={<ProtectedRoute isUser={user} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/createtrip" element= {<CreateTrip />} />
                    <Route path="/profile" element = {<Profile />} />
                    <Route path="/explore" element = {<ExploreTrips />} />
                    <Route path="/settings" element = {<Settings />} />
                </Route>
            </Routes>
        </Router>
    </>
  )
}

export default Routing
