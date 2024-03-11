import { useState } from "react";
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  const createAccount = () => {
    const signupUrl = "http://127.0.0.1:8000/auth/";

    const requestData = {
        username: signupState.username,
        email: signupState.email,
        password: signupState.password
    };

    fetch(signupUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to create account");
        }
        return response.json(); // Parse response JSON
    })
    .then(data => {
        console.log("Account created successfully:", data);
        // Redirect the user to the login page or perform other actions
        // For example, you can use React Router to navigate to another page
        // history.push('/login');
    })
    .catch(error => {
        console.error("Error creating account:", error);
    });
};

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}