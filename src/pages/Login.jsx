import { useState } from "react";
import Heading from "../components/Heading";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function LoginPage({setLoggedIn}) {
    const [errorMessage, setErrorMessage] = useState("");
    const [signupMessage, setSignupMessage] = useState("");

    return (
        <>
            <Heading
                heading="Login to your account"
                paragraph="Don't have an account yet?"
                linkName="Sign up"
                linkUrl="/signup"
                errorMessage={errorMessage}
                signupMessage={signupMessage} 
            />
            <Login 
                setSignupMessage={setSignupMessage}
                setErrorMessage={setErrorMessage} 
                setLoggedIn={setLoggedIn}
            />
        </>
    );
}
