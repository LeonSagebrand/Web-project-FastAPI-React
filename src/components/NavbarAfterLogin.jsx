import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AfterLoginPage from "../pages/AfterLogin";
import LogOut from "../components/LogOut";

function NavbarAfterLogin({ isLoggedIn, username, onLogout }) {


  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-5">
      <div>
      </div>
      <div className="flex items-center">
        <p className="mr-4">Current user: {username}</p>
        <Link to="/logout" onClick={onLogout} className="mr-4">
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default NavbarAfterLogin;