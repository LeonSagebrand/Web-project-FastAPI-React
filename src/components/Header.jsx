import React from 'react';
import { Link } from "react-router-dom";


export default function Header({setLoggedIn, loggedIn, username}) {
    return (
      <nav className="flex justify-between items-center bg-gray-800 text-white p-">
        <div>
          <Link to="/" className="text-xl font-bold">Home</Link>
          <Link to="/about" className="text-xl font-bold">About</Link>
          {loggedIn && <Link to="/dashboard" className="text-xl font-bold">Dashboard</Link> }
        </div>
        <div>
           
          {loggedIn ? 
              <>
                <p className="mr-4">Current user: {username}</p>
                <Link to="/logout" onClick={() =>   {localStorage.removeItem("token"); setLoggedIn(false);}
} className="mr-4">
                Logout
                </Link>
              </>
              :
              <div className="flex items-center">
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup">Sign up</Link>
            </div>              }
        </div>
      </nav>
    );
  }