import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const isTokenExpired = isExpired(decodedToken.exp);
            return !isTokenExpired;
        } catch (error) {
            console.error('Error decoding token:', error);
            return false;
        }
    } else {
        return false;
    }
};

const isExpired = (exp) => {
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
};
