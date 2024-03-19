import "./AfterLogin.css";
import React from 'react';
import { Link } from "react-router-dom";



function NavbarAfterLogin({ children }) {
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-">
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
    <div className="min-h-screen flex flex-col">
        <NavbarAfterLogin />
        <div className="flex-grow flex justify-center">
         
        </div>
        <Footer />
      
       </div>
  );
};

export default AfterLogin;
