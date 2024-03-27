import React, { useEffect, useState } from 'react';

function Profile() {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch current user');
                }

                const userData = await response.json();
                setUserName(userData.username);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className='mx-10 bg-white'>
            <h2 className='text-2xl font-mono'>Your profile</h2>
            {userName && <p>Welcome, {userName}!</p>}
        </div>
    );
}

export default Profile;
