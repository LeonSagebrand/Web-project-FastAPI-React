import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoginForm from "../../components/Login";
import Navigation from "../../components/Navigation";

export default function Home() {
    return (
        <>
            <Header/>
            <div className="bg-gray-200 h-screen flex flex-col justify-center items-center"> {/* Set background color to grey and full height */}
                <Navigation />
                <div className="flex flex-col justify-center items-center flex-grow">
                    <LoginForm />
                </div>
            <Footer /> {/* Include the Footer component */}
      </div>
        
        
        </>
    )
}

