import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from "react-router-dom";


const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = () => {
        const loginUrl = "http://127.0.0.1:8000/auth/login"; //endpoint URL
    
        const requestData = { //logindata
            email: loginState.email,
            password: loginState.password
        };
        
        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to login");
                }
                return response.json();
            })
            .then(data => {
                // Store the token in localStorage
                localStorage.setItem('token', data.access_token);
                
                // Redirect the user to the dashboard or perform other actions
                // For example, you can use React Router to navigate to another page
                // history.push('/dashboard');
            })
            .catch(error => {
                console.error("Error logging in:", error);
            });
    };
    
    return (

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errorMessage && <p className="text-red-500 font-bold">{errorMessage}</p>}

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

