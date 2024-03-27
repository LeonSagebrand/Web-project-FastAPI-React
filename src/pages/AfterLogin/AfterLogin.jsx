import React, { useState } from 'react';
import Menu from "../../components/Menu";
import Dashboard from "../../components/Dashboard";
import CreateGroup from '../../components/CreateGroup';
import ShowGroups from '../../components/ShowGroups'; // Import the new component
import Profile from '../../components/Profile';

const AfterLogin = () => {
    const [activeIndex, setActiveIndex] = useState(0);

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

export default AfterLogin;
