import { useState } from "react";

const fixedInputClass="rounded-md appearance-none relative block w-1/3 mx-auto px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  name,
  type,
  isRequired = false,
  placeholder,
  errorMessage,
  signupMessage, 
  customClass
}) {
  const [error, setError] = useState("");
  const id = name;

  // kolla email
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  // input change i fälten
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(e); 
    if (type === "email") {
      validateEmail(value); 
    }
  };

  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleInputChange} 
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500">{error}</p>} {/*  error message */}
    </div>
  );
}
