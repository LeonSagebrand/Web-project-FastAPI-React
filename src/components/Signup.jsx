import { useState } from "react";
import { signupFields } from "../constants/formFields";
import { useNavigate } from "react-router-dom";

import FormAction from "./FormAction";
import Input from "./Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.name] = "")); 

export default function Signup() {
  const redirect = useNavigate()
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate(); // Initialize useNavigate hook here

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);
    setSignupState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
    redirect("/")
  };

  const createAccount = () => {
    const signupUrl = "http://127.0.0.1:8000/auth/";

    const requestData = {
      username: signupState.username,
      email: signupState.email,
      password: signupState.password,
    };

    console.log("Request data:", requestData);

    fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create account");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Account created successfully:", data);
        navigate("/afterlogin"); // Use navigate here
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.name} 
            handleChange={handleChange}
            value={signupState[field.name]} 
            labelText={field.labelText}
            labelFor={field.labelFor}
            name={field.name} 
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
