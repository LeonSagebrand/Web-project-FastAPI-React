import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from "react-router-dom";


const fields = loginFields;

const Login = () => {
    const [loginState, setLoginState] = useState({ email: "", password: "" });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginUrl = "http://127.0.0.1:8000/auth/login";
            const requestData = {
                email: loginState.email,
                password: loginState.password
            };

            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error("Failed to login");
            }

            const data = await response.json();
            console.log("Login successful. Token:", data.access_token);
            localStorage.setItem("token", data.access_token);
            console.log("Navigating to /afterlogin");
            navigate("/afterlogin"); // ny sida
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
    
    return (

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
            </div>
            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    )
}

export default Login;
