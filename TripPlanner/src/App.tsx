// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import NavBar from "./components/NavBar"
import Home from "./components/pages/Home"
import CreateTrip from "./components/pages/CreateTrip";
import ExploreTrips from "./components/pages/ExploreTrips";
import Settings from "./components/pages/Settings";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";

import './App.css'

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ isAuthenticated } : ProtectedRouteProps ) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <Router>
        {isAuthenticated && (<div>
          <NavBar />
        </div>)
        }
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
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

export default App
