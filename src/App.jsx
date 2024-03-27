import "./App.css"; 
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import About from "./pages/About";
import LogOut from "./components/LogOut";
import PublicNavbar from "./components/PublicNavbar";
import NavbarAfterLogin from "./components/NavbarAfterLogin";
import axios from 'axios';
import AfterLoginPage from "./pages/AfterLogin";



function CenterText() {
  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <p className="text-lg mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p className="text-base mt-4">
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="text-sm mt-4">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </p>
      <div className="flex justify-center my-48">
        <img
          src="https://cdn-icons-png.freepik.com/512/5655/5655906.png"
          width="150"
          height="400"
          alt="Welcome"
        />
      </div>
    </div>
  );
}

function Footer() {
  return <footer>&copy; 2024 Nackademin</footer>;
}

function Page({ children }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 my-28">
      {children}
    </div>
  );
}

const NotFound = () => {
  return (
    <><div className="text-center mt-8">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p></div>
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
  };


  useEffect(() => {
    const token = localStorage.getItem("token"); //hämta token i storage
    setIsLoggedIn(!!token); 
    setIsLoggedIn(!!token);

    if (isLoggedIn && token) {
      axios.get("http://127.0.0.1:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUsername(response.data.username); 
      })
      .catch(error => {
        console.error("Error fetching user information:", error);
      });
    }
  }, [isLoggedIn]); 

  return (
    
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
      {isLoggedIn ? (
  <NavbarAfterLogin isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
) : (
  <PublicNavbar />
)}         
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Page><CenterText /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/login" element={<Page><LoginPage handleLogin={handleLogin} /></Page>} />
            <Route path="/signup" element={<Page><SignupPage /></Page>} />
            <Route path="/afterlogin" element={<Page><AfterLoginPage /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
            <Route path="/logout" element={<Page><LogOut /></Page>} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
