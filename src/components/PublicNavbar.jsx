import React from "react";
import { Link } from "react-router-dom";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
import AfterLoginPage from "../pages/AfterLogin";


function PublicNavbar() {
    return (
      <nav className="flex justify-between items-center bg-gray-800 text-white p-">
        <div>
          <Link to="/" className="text-xl font-bold">Home</Link>
          <Link to="/about" className="text-xl font-bold">About</Link>
        </div>
        <div>
          <div className="flex items-center">
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </nav>
    );
  }

  export default PublicNavbar;
