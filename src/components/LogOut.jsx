import React from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  localStorage.removeItem("token");


  return (
    <div className="flex-grow flex justify-center">
      <div className="text-center mt-8">
        <p className="text-lg mt-4">You have been successfully logged out!</p>
        <p className="text-base mt-4">Thank you for visiting. We hope to see you again soon.</p>
        <p className="text-sm mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <div className="flex justify-center my-48">
        <img src="https://www.svgrepo.com/show/526038/money-bag.svg" width="150" height="200"/>
</div>
      </div>
    </div>
  );
}

export default LogOut;
