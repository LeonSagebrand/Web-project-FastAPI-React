
import React, { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../authUtils"; 
//import { Spinner } from "flowbite-react";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(isAuthenticated());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      element={
        loading ? (
          <Spinner /> 
        ) : isLoggedIn ? (
          <Element />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default PrivateRoute;
