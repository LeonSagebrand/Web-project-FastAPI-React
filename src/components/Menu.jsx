import React, { useState } from 'react';
import { LayoutDashboard, Group, Activity, User } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Groups",
        icon: Group,
    },
    {
        name: "Stocks",
        icon: Activity,
    },
    {
        name: "Profile",
        icon: User,
    }
];

const variants = {
    expanded: { width: "20%"},
    nonExpanded: { width: "5%"}
}

function Menu({ setActiveIndex }) {
    const [activeNavIndex, setActiveNavIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
  
    const handleNavClick = (index) => {
        setActiveNavIndex(index);
        setActiveIndex(index);
    }

    return (
        <motion.div 
            animate={isExpanded ? "expanded" : "nonExpanded"}
            variants={variants}
            className={`px-10 py-12 flex-col border-r-1 w-${isExpanded ? "1/5" : "5"} h-screen bg-white relative`}
        >
            <div className='flex space-x-3 items-center'>
                <span className={isExpanded ? "block" : "hidden"}>Menu</span>
            </div>

            <div onClick={() => setIsExpanded(!isExpanded)} className="w-5 h-5 bg-blue-700 rounded-full absolute -right-5 top-12 flex items-center justify-center"></div>
        
            <div className='mt-9 flex-col space-y-8'>
                {navLinks.map((item, index) => (
                    <div 
                        key={index} 
                        className={`flex space-x-3 p-2 rounded ${activeNavIndex === index ? "bg-blue-500 text-white font-semibold" : ""}`}
                        onClick={() => handleNavClick(index)}
                    >
                        <item.icon />
                        <span className={isExpanded ? "block" : "hidden"}>{item?.name}</span>  
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default Menu;
