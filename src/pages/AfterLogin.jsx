import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add axios import
import { Navigate } from 'react-router-dom'; // Add Navigate import
import Menu from "../components/Menu";
import Dashboard from "../components/Dashboard";
import CreateGroup from '../components/CreateGroup';
import ShowGroups from '../components/ShowGroups'; // Import the new component
import Profile from '../components/Profile';

const AfterLoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Set initial state to true
    const [user, setUser] = useState(null); // Initialize user state
    const [activeIndex, setActiveIndex] = useState(0);

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
    }, []); // Add empty dependency array to run once on mount

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (!user) {
        return null;
    }

    return (
        <>
            <Menu setActiveIndex={setActiveIndex} />
            {/* Show the components depending on which navlink is clicked and activeIndex */}
            {activeIndex === 0 && <Dashboard />}
            {activeIndex === 1 && (
                <>
                    <div>
                        <div>
                            <CreateGroup />
                        </div>
                        <div className='mt-10 ml-10 border bg-white border-blue-700 rounded-lg font-semibold'>
                            <ShowGroups />
                        </div>
                    </div>
                </>
            )}
            {activeIndex === 3 && <Profile />}
            {/* Add other components here */}
        </>
    );
};

export default AfterLoginPage;
