import { createContext, useContext, useMemo } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
// import api from '../../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();

    const login = async ({ email, password }) => {
        try {
            const response = await fetch("http://127.0.0.1:6608/login", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, hashed_password: password }),
            });
        
            if (response.ok) {
                // Login successful, do something
                const result = await response.json();
                console.log('Login successful', result);
                setCookies('token', result.access_token); // your token
                setCookies('email', email)
                navigate('/home');
            } else {
                // Login failed, handle the error
                console.log('Login failed');
                return false;
            }
        } catch (error) {
          console.error('Error occurred during login:', error);
          return false;
        }        
    };

    const signup = async ({ name, email, password }) => {
        try {
            const response = await fetch("http://127.0.0.1:6608/register", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, hashed_password: password }),
            });
        
            if (response.ok) {
                // Login successful, do something
                const result = await response.json();
                console.log('Signup successful', result);
                setCookies('token', result.access_token); // your token
                setCookies('email', email)
                navigate('/home');
            } else {
                // Login failed, handle the error
                console.log('Login failed');
                return false;
            }
        } catch (error) {
          console.error('Error occurred during signup:', error);
          return false;
        }        
    };

    const logout = () => {
        ['token', 'name'].forEach(obj => removeCookie(obj)); // remove data save in cookies
        navigate('/login');
    };

    const loggedInUser = () => {
        return Cookies.get("email");
    }

    const value = useMemo(
        () => ({
            cookies,
            login,
            signup,
            logout,
            loggedInUser
        }),
        [cookies]
    );    

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(UserContext)
};