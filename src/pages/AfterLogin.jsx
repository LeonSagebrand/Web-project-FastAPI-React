//import "./AfterLogin.css"; 
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LogOut from "../components/LogOut"; 
import axios from "axios";

function NavbarAfterLogin({ username }) {
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white">
      <div>
      </div>
    
        <div className="flex items-center">
        <div className="flex items-center">
          <p className="mr-4">Welcome, {username}!</p>
          <Link to="/logout/" className="mr-4">Logout</Link>
        </div>
      </div>
    </nav>
  );
}
function AfterLogin() {
  const [user, setUser] = useState(null);
  console.log("AfterLogin component rendered");
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  
//https://swagger.io/docs/specification/authentication/bearer-authentication/
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://127.0.0.1:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data); 
      })
      .catch(error => {
        console.error("Error fetching user information:", error);
        setIsLoggedIn(false);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }  
  if (!user) {
    return null; 
  }
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAfterLogin username={user.username} /> 
      <Routes>
        <Route path="/logout/" element={<LogOut />} /> 
      </Routes>
      <div className="flex-grow flex justify-center">
        <h2 className="font-bold">Page for logged in</h2>
        <p className="text-sm mt-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}

export default AfterLogin;
