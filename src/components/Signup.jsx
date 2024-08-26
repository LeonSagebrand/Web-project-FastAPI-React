import { useState } from "react";
import { signupFields } from "../constants/formFields";
import { useNavigate } from "react-router-dom";
import FormAction from "./FormAction";
import Input from "./Input";



const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.name] = ""));

export default function Signup({ setErrorMessage, setSignupMessage }) {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setSignupState((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};


const handleSubmit = (e) => {
  e.preventDefault();
  console.log(signupState);

  if (signupState.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
  }
  if (signupState.password.length > 30) {
      setErrorMessage("Password cannot be more than 30 tokens long");
      return;
  }
  if (signupState.username.length > 20) {
      setErrorMessage("Username must be 20 characters or less");
      return;
  }
  if (signupState.password !== signupState["confirm-password"]) {
    setErrorMessage("Passwords do not match");
    return;
  }

  createAccount();
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
        setSignupMessage("Account created successfully");
        navigate("/login"); // flytta sida
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        setErrorMessage("Failed to create account. Please try again.");
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
         name={field.name === "confirmPassword" ? "confirm-password" : field.name} 
         type={field.type}
         isRequired={field.isRequired}
         placeholder={field.placeholder}
       />
       
        ))}
        <FormAction handleSubmit={handleSubmit} text="Sign up" />
      </div>
    </form>
  );
}
