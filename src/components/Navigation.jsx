import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <header>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link> 
            <Link to="/login">login</Link> 
        </nav>
    </header>
  );
};

export default Navigation;
