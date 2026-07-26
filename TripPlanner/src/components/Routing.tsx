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

import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  token: String | null;
}

const ProtectedRoute = ({ token } : ProtectedRouteProps ) => {
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

const UnLoggedInRoute = ({ token } : ProtectedRouteProps ) => {
  if (token) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}

function Routing() {
    const { token } = useAuth();

  return (
    <>
        <Router>
            {token && (<div>
                <NavBar />
                </div>)
            }
            <Routes>
                <Route element={<UnLoggedInRoute token={token} />} >
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                </Route>
                
                <Route element={<ProtectedRoute token={token} />}>
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
