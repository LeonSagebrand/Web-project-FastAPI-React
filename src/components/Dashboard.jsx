import React from "react";
import Chart from "./Chart"
import CreateGroup from "./CreateGroup";

function Dashboard() {
    return (
        <div className="flex flex-col space-y-6 py-12 px-14 bg-white">
            <h2>Dashboard</h2>

            <div className="flex space-x-8">
                <div className="w-2/5 h-[150px] border border-gray-500 rounded flex flex-col justify-center p-4 text-gray-600">
                    <span>Hello</span>
                    <span className="text-gray-500">There</span>
                </div>
                <div className="w-2/5 h-[150px] border border-gray-500 rounded flex flex-col justify-center p-4 text-gray-600">
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
            <div>
            <CreateGroup />
            </div>
        </div>
    );
}

export default Dashboard;