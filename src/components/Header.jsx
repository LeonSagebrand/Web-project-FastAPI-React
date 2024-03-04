import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="top-0">
            <nav className="flex justify-end space-x-5 p-6">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link> 
            </nav>
        </header>
    )
}