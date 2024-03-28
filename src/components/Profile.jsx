import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch('http://127.0.0.1:8000/auth/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch current user');
                }

                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        getProfile();
    }, []);

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            const userId = userData.id;

            console.log(userData)
            
            const response = await fetch(`http://127.0.0.1:8000/crud/users/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete account');
            }
    
            const responseData = await response.json();
            console.log(responseData);
            // Optionally, you can clear user data from state or redirect to a different page after deletion
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };
    
    

    return (
        <div className='mx-10 bg-white'>
            <h2 className='text-2xl font-mono'>Your profile</h2>
            {userData && (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>ID: {userData.id}</p>
                </div>
            )}
            <div>
                <button onClick={handleDeleteAccount}>Delete account</button>
            </div>
        </div>
    );
}

export default Profile;
