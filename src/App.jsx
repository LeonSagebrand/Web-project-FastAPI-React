import React from 'react';
import Home from './pages/Home/Home';
import LoginForm from './components/Login';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer'; // Import the Footer component
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<LoginForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
