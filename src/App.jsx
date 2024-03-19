import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import AboutPage from "./pages/About";
import AfterLoginPage from "./pages/AfterLogin/AfterLogin";
import PrivateRoute from "./components/PrivateRoute"; 

function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-">
      <div>
        <Link to="/" className="text-xl font-bold">
          Home
        </Link>
        <Link to="/about" className="text-xl font-bold">
          About
        </Link>
      </div>
      <div>
        <div className="flex items-center">
          <Link to="/login" className="mr-4">
            Login
          </Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
}

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
        <img src="https://www.svgrepo.com/show/148016/finances-stats-bars-graphic-with-up-arrow.svg"
          width="150" height="400"/>
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


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow flex justify-center">
          <Routes>
            <Route
              path="/"
              element={
                <Page>
                  <CenterText />
                </Page>
              }
            />
            <Route path="/about" element={<Page><AboutPage /></Page>} />
            <Route path="/login" element={<Page><LoginPage /></Page>} />
            <Route path="/signup" element={<Page><SignupPage /></Page>} />
            <Route path="/afterlogin" element={<AfterLoginPage />} />
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
