import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ groupName: '', creator_name: '' }); 

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
            const response = await fetch('http://127.0.0.1:8000/crud/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.groupName,
                    creator_name: formData.creator_name,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }

            alert('Group created successfully!');
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
                    name="groupName"
                    value={formData.groupName}
                    onChange={handleChange}
                />
                <button className="border p-2 rounded-lg bg-blue-900 text-white" type="submit">Create Group</button>
            </div>
        </form>
    );
};

export default CreateGroup;
