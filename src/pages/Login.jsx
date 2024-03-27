import { useState } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const [signupMessage, setSignupMessage] = useState("");

    return (
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet?"
                linkName="Signup"
                linkUrl="/signup"
                errorMessage={errorMessage}
                signupMessage={signupMessage} 
            />
            <Login 
                setSignupMessage={setSignupMessage}
                setErrorMessage={setErrorMessage} 
            />
        </>
    );
}
