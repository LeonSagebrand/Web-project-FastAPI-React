import React, { useState } from 'react';
import Menu from "../../components/Menu";
import Dashboard from "../../components/Dashboard";
import Groups from "../../components/Groups";
import CreateGroup from '../../components/CreateGroup';

const AfterLogin = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <Menu setActiveIndex={setActiveIndex} />
            {/* Show the components depending on which navlink is clicked and activeIndex */}
            {activeIndex === 0 && <Dashboard />}
            {activeIndex === 1 && <CreateGroup />}
            {/* Add other components here */}
        </>
    );
};

export default AfterLogin;
