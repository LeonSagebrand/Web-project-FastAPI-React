import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import NavbarAfterLogin from "../components/NavbarAfterLogin"; 

function AfterLoginPage() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
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
    //<><NavbarAfterLogin isLoggedIn={true} username={user.username} />
  
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex justify-center">
        <h2 className="font-bold justify-center">Page for logged in</h2>
        <p className="text-sm mt-4">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
    //</>

  );
}

export default AfterLoginPage;
