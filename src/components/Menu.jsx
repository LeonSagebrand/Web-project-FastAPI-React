import React from 'react';
import { useState } from 'react';
import {
    LayoutDashboard,
    Group,
    Activity,
    ArrowLeftRight
} from "lucide-react"

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
    }
];

function Menu() {
    const [activeNavIndex, setActiveNavIndex] = useState(0)
  return (
    <div className='px-10 py-12 flex-col border-r-1 w-1/5 h-screen bg-white'>
        <div className='flex space-x-3 items-center'>
            <span>Menu</span>
        </div>
        
        <div className='mt-9 flex-col space-y-8'>
            {navLinks.map((item, index) => (
            <div 
                key = {index} 
                className={
                'flex space-x-3' + 
            (activeNavIndex === index 
                ? " bg-blue-500 text-white font-semibold"
                : " ")
            }
            onClick={() => setActiveNavIndex(index)}
            >
            
                <item.icon />
              <span>{item?.name}</span>  
            </div>
            ))}
        </div>
    </div>
  );
}

export default Menu;