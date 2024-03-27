import { useState } from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const [signupMessage, setSignupMessage] = useState("");


    return (
        <>
            <Header
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/login"
                errorMessage={errorMessage}
                signupMessage={signupMessage} 
            />
            <Signup 
            setErrorMessage={setErrorMessage} 
            setSignupMessage={setSignupMessage} 
            />
            {errorMessage && (
                <div className="text-red-500 text-sm mt-2">
                </div>
            )}
        </>
    );
}
