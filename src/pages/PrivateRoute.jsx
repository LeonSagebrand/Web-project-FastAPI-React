
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './authUtils';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner'; // loading spinner component

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate loading time for demonstration purposes
    const timer = setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(isAuthenticated());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <LoadingSpinner /> // Show loading spinner while checking authentication
        ) : isLoggedIn ? (
          <div>
            <p>Login successful!</p>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
