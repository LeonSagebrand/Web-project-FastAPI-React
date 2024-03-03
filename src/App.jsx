import React from 'react';
import LoginForm from './components/Login';
import Navigation from './components/Navigation';
import Footer from './components/Footer'; // Import the Footer component
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
      <div className="bg-gray-200 h-screen flex flex-col justify-center items-center"> {/* Set background color to grey and full height */}
        <Navigation />
        <div className="flex flex-col justify-center items-center flex-grow">
          <LoginForm />
        </div>
        <Footer /> {/* Include the Footer component */}
      </div>
    </BrowserRouter>
  );
}

export default App;
