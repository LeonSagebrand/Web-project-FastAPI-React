import React from 'react';
import LoginForm from './components/Login';
import Navigation from './components/Navigation';
import Footer from './components/Footer'; // Import the Footer component
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
        <Navigation />
        <main>
          <LoginForm />
          {/* <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<LoginForm/>} />
          </Routes> */}
        </main>
        <Footer /> 
    </BrowserRouter>
  );
}


export default App;
