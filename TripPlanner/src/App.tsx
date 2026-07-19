// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar"
import Home from "./components/pages/Home"
import CreateTrip from "./components/pages/CreateTrip";
import ExploreTrips from "./components/pages/ExploreTrips";
import Settings from "./components/pages/Settings";
import Profile from "./components/pages/Profile";

import './App.css'

function App() {

  return (
    <>
      <Router>
        <div>
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createtrip" element= {<CreateTrip />} />
          <Route path="/profile" element = {<Profile />} />
          <Route path="/explore" element = {<ExploreTrips />} />
          <Route path="/settings" element = {<Settings />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
