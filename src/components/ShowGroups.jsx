import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

export default function ShowGroups() {
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/crud/groups')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }
                return response.json();
            })
            .then(data => {
                setGroups(data);
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
            });
    }, []);

    const handleGroupClick = (groupId) => {
        setSelectedGroupId(groupId);
    };

    const handleJoinGroup = (groupId) => {
        const token = localStorage.getItem("token");
        if (token) {
            // Fetch current user
            fetch('http://127.0.0.1:8000/auth/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch current user.');
                }
                return response.json();
            })
            .then(data => {
                const userName = data.username;
    
                // Send the POST request to join the group
                fetch(`http://127.0.0.1:8000/crud/groups/join/${groupId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: groupId,
                        members: userName
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to join group.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Joined group successfully:', data);
                    // Handle successful response here
                })
                .catch(error => {
                    console.error('Error joining group:', error);
                    alert('Failed to join group. Please try again later.');
                });
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
                alert('Failed to fetch current user. Please try again later.');
            });
        }
    };
    

    return (
        <div>
            <div className="flex justify-between py-2 mx-10 font-bold underline text-blue-900">
                <h2>Group name</h2>
                <h2>Creator name</h2>
            </div>
            <ul>
                {groups.map(group => (
                    <li key={group.id}>
                        <div className={`flex mx-10 justify-between items-center py-2 ${selectedGroupId === group.id ? 'bg-blue-100' : ''}`} onClick={() => handleGroupClick(group.id)}>
                            <span className={`${selectedGroupId === group.id ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}`}>{group.name}</span>
                            <span>{group.creator_name}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleJoinGroup(selectedGroupId)} disabled={!selectedGroupId}>Join Group</button>
            </div>
        </div>
    );
}
