import React from 'react';

const Navigation = () => {
  return (
    <header>
        <nav>
            <ul className="flex justify-end space-x-5">
              <li><a href="#">Home</a></li>
              <li><a href="#">Login</a></li>
              <li><a href="#">About</a></li>
            </ul>
        </nav>
    </header>
  );
};

export default Navigation;
