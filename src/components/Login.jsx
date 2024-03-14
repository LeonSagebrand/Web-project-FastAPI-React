import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";



const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log('Input changed:', id, value);
        setLoginState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
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


//icke fungerande input control
//const handleSubmit = (e) => {
//    e.preventDefault();
//    if (!loginState.email || !loginState.password) {
//        console.error("Email and password are required.");
//        return;
//    }
//    authenticateUser();
//}
//
// Inside authenticateUser function
//const requestData = {
//    email: loginState.email.trim(),
//    password: loginState.password.trim()
//};