import React from 'react';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Left link */}
          <a href="#" className="text-white mr-4">Home</a>
        </div>
        <div className="flex items-center">
          {/* Right links */}
          <a href="#" className="text-white mr-10">Login</a>
          <a href="#" className="text-white">About</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
