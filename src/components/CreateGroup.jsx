import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ groupName: '', username: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.groupName,
                    username: formData.username,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }

            alert('Group created successfully!');
            navigate('/groups'); // Navigate to desired route after successful group creation
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Failed to create group. Please try again later.');
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                <input
                    className='border-blue-500 border-2'
                    type="text"
                    placeholder="Group Name"
                    name="groupName"
                    value={formData.groupName}
                    onChange={handleChange}
                />
                <input
                    className='border-blue-500 border-2'
                    type="text"
                    placeholder="Your Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <button type="submit">Create Group</button>
            </div>
        </form>
    );
};

export default CreateGroup;
