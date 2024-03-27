import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import ShowGroups from "./ShowGroups";

function ShowRecentGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/crud/groups/recent")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recent groups");
        }
        return response.json();
      })
      .then((data) => {
        setGroups(data);
      })
      .catch((error) => {
        console.error("Error fetching recent groups:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="mx-10 font-bold underline text-red-600">Recently added Groups</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id} className="mx-10 py-2">
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex flex-col space-y-6 py-12 px-14 bg-white">
      <h2 className="text-2xl font-mono">Dashboard</h2>

      <div className="flex space-x-8">
        <div className="w-2/5 border border-gray-500 rounded flex flex-col justify-center p-4 bg-blue-950 text-red-600">
          <span className="text-gray-500"></span>
          <ShowRecentGroups />
        </div>
        <div className="w-2/5 border border-gray-500 rounded flex flex-col justify-center p-4 text-gray-600">
          <span>Hello</span>
          <span className="text-gray-500">There</span>
        </div>
      </div>
      <div className="flex space-x-8">
        <h2>Chart</h2>
        <Chart />
      </div>
      <div className="flex space-x-8">
        <div className="w-2/5 h-[150px] border border-gray-500 rounded flex flex-col justify-center p-4 text-gray-600">
          <span>Your activity</span>
          <li className="mt-4">You sent...</li>
        </div>
        <div className="w-2/5 h-[150px] border border-gray-500 rounded flex flex-col justify-center p-4 text-gray-600">
          <span>Hello</span>
          <li className="mt-4">There</li>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
