import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState('');

    const handleChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Fetch the currently logged-in user's username
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch('http://127.0.0.1:8000/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                const creatorName = data.username;

                // Send the POST request to create the group
                const createGroupResponse = await fetch('http://127.0.0.1:8000/crud/groups', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: groupName,
                        creator_name: creatorName,
                    }),
                });

                if (!createGroupResponse.ok) {
                    throw new Error('Failed to create group');
                }

                alert('Group created successfully!');
            } else {
                throw new Error('User is not logged in');
            }
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Failed to create group. Please try again later.');
        }
    };

    return (
        <form className="mt-8 space-y-6 ml-10" onSubmit={handleSubmit}>
            <div className="">
                <input
                    className='border-blue-500 border-2'
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={handleChange}
                />
                <button className="border p-2 rounded-lg bg-blue-900 text-white" type="submit">Create Group</button>
            </div>
        </form>
    );
};

export default CreateGroup;
