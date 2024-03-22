import "./AfterLogin.css";
import React from 'react';
import { Link } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import Menu from "../../components/Menu";



function NavbarAfterLogin({ children }) {
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white">
      <div>
          Home
        
      </div>
      <div>
        <div className="flex items-center">
          
          Signout
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return <footer>&copy; 2024 Nackademin</footer>;
}


const AfterLogin = () => {
  return (
    <>
    <div>
        
        </div>
          <Menu />
          <Dashboard />

       </>
  );
};

export default AfterLogin;
